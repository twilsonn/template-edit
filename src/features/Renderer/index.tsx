import { useAtomValue } from "jotai";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { editorSizeAtom } from "../EditorWindow/state";
import { encode } from "js-base64";
import { decrypt } from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";
import { filesAtom } from "../FileUpload";

import Fallback from "./Fallback";
import Render from "./Renderers";
import { TemplateType } from "../EditorWindow/state/templateState";
import { useEffectOnce } from "usehooks-ts";
import { BarLoader } from "react-spinners";

interface IRendererProps {
  type: TemplateType;
  content: string;
  data: object;
}

const defaultHead = `<head></head>`;

const Renderer: React.FC<IRendererProps> = ({ content, data, type }) => {
  const contentRef = useRef<HTMLIFrameElement>(null);
  const files = useAtomValue(filesAtom);
  const { window, editor } = useAtomValue(editorSizeAtom);
  const [html, setHtml] = useState("");
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);

  const getElementFromFileName = useMemo(
    () =>
      (name: string): HTMLElement => {
        const encodedName = encode(name);
        const file = files[encodedName];

        if (!file) throw new Error("file not found");

        const element = document.createElement(file.type);
        const elementHTML = decrypt(file.content, "test").toString(Utf8);
        element.innerHTML = elementHTML;
        return element;
      },
    [files]
  );

  const splitHeadComponentsFromFragment = useMemo(
    () => (fragment: DocumentFragment) => {
      const headElements = fragment.querySelectorAll(
        "link,script,style,title,meta,base"
      );

      const head: Node[] = [];

      if (headElements) {
        headElements.forEach((node) => {
          node.remove();

          const src = node.getAttribute("src");
          const href = node.getAttribute("href");

          const fileLocation = src || href;

          if (fileLocation && fileLocation.startsWith("files/")) {
            try {
              const name = fileLocation.split("/")[1];
              const element = getElementFromFileName(name);
              head.push(element);
            } catch (error) {
              console.log(error);
            }
          } else {
            head.push(node);
          }
        });
      }

      return {
        fragment,
        head,
      };
    },
    [getElementFromFileName]
  );

  const renderTemplate = ({ content, data, type }: IRendererProps) => {
    const renderOutput = Render[type]({
      content,
      data,
    });

    setError(renderOutput.error);
    setHtml(renderOutput.html);
  };

  useEffectOnce(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  });

  useEffect(() => {
    if (data && content) {
      renderTemplate({ content, data, type });
    }
  }, [content, data, type]);

  const fragment = document.createRange().createContextualFragment(html);

  if (contentRef.current && contentRef.current.contentWindow) {
    const window = contentRef.current.contentWindow;

    window.document.body.innerHTML = "";
    // window.document.head.innerHTML = defaultHead;

    Array.from(window.document.body.attributes).forEach((attr) =>
      window.document.body.removeAttributeNode(attr)
    );

    const { head, fragment: updatedFragment } =
      splitHeadComponentsFromFragment(fragment);

    window.document.body.appendChild(updatedFragment);
    window.document.head.replaceChildren(...head);
  }

  return loading ? (
    <div className="absolute z-50 top-0 left-0 flex w-full h-full items-center justify-center">
      <BarLoader color="#3b82f6" />
    </div>
  ) : html ? (
    <iframe
      style={{
        width: window.width - editor.width,
        height: window.height,
      }}
      ref={contentRef}
      onLoad={() => renderTemplate({ content, data, type })}
    />
  ) : (
    <Fallback error={error} />
  );
};

export default Renderer;
