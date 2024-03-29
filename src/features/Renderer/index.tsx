import { useAtomValue } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import { editorSizeAtom } from "../EditorWindow/state";
import { encode } from "js-base64";
import { decrypt } from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";
import { filesAtom } from "../FileUpload";

import Fallback from "./Fallback";
import Render from "./Renderers";
import { useEffectOnce } from "usehooks-ts";
import { BarLoader } from "react-spinners";

interface IRendererProps {
  type: Template["type"];
  content: string;
  data: string;
}

const Renderer: React.FC<IRendererProps> = ({ content, data, type }) => {
  const contentRef = useRef<HTMLIFrameElement>(null);
  const files = useAtomValue(filesAtom);
  const { window, editor } = useAtomValue(editorSizeAtom);
  const [html, setHtml] = useState<string | undefined>(undefined);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);

  const getElementFromFileName = (name: string): HTMLElement => {
    const encodedName = encode(name);
    const file = files[encodedName];

    if (!file) throw new Error("file not found");
    console.log("using files");

    const element = document.createElement(file.type);
    const elementHTML = decrypt(file.content, "test").toString(Utf8);
    element.innerHTML = elementHTML;
    return element;
  };

  const splitHeadComponentsFromFragment = (fragment: DocumentFragment) => {
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
  };

  const renderTemplate = ({ content, data, type }: IRendererProps) => {
    try {
      const json = JSON.parse(data);

      const html = Render[type]({
        content,
        data: json,
      });

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

      setHtml(html || " ");
      setError(undefined);
    } catch (error) {
      setHtml(undefined);
      return setError(error as Error);
    }
  };

  useEffectOnce(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  });

  useEffect(() => {
    renderTemplate({ content, data, type });
  }, [content, data, type]);

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
