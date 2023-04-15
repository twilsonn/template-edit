import { useEffect, useMemo, useRef } from "react";
import { useAtom, useAtomValue } from "jotai";
import { twig } from "twig";
import { encode } from "js-base64";
import { decrypt } from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";

import { templatesAtom } from "@/features/EditorWindow/state";
import { editorSizeAtom } from "@/features/EditorWindow/state";
import { filesAtom } from "@/features/FileUpload";

const defaultHead = `
  <title>Editor</title>
`;

const RendererWindow = () => {
  const [{ activeTemplate, templates }] = useAtom(templatesAtom);
  const { window, editor } = useAtomValue(editorSizeAtom);
  const contentRef = useRef<HTMLIFrameElement>(null);
  const files = useAtomValue(filesAtom);

  const twigTemplate = useMemo(
    () =>
      twig({
        data: templates[activeTemplate].content,
      }),
    [templates, activeTemplate]
  );

  const getFileElement = useMemo(
    () =>
      (name: string): HTMLElement => {
        const encodedName = encode(name);
        const file = files[encodedName];

        if (!file) throw new Error("file not found");

        const element = document.createElement(file.type);
        element.innerHTML = decrypt(file.content, "test").toString(Utf8);
        return element;
      },
    [files]
  );

  useEffect(() => {
    const html = twigTemplate.render(templates[activeTemplate].data);

    const fragment = document.createRange().createContextualFragment(html);

    if (contentRef.current) {
      if (contentRef.current.contentWindow) {
        const window = contentRef.current.contentWindow;
        const body = window.document.body;
        const head = window.document.head;
        body.innerHTML = "";
        head.innerHTML = defaultHead;
        Array.from(body.attributes).forEach((attr) =>
          body.removeAttributeNode(attr)
        );

        const headElements = fragment.querySelectorAll("link,script,style");

        if (headElements) {
          headElements.forEach((node) => {
            node.remove();

            const src = node.getAttribute("src");
            const href = node.getAttribute("href");

            const fileLocation = src || href;

            if (fileLocation && fileLocation.startsWith("files/")) {
              try {
                const name = fileLocation.split("/")[1];
                const element = getFileElement(name);
                body.appendChild(element);
              } catch (error) {}
            } else {
              body.appendChild(node);
            }
          });
        }

        window.document.body.appendChild(fragment);
      }
    }
  }, [activeTemplate, getFileElement, templates, twigTemplate]);

  return (
    <iframe
      name="Editor"
      style={{
        width: window.width - editor.width,
        height: window.height,
      }}
      ref={contentRef}
    />
  );
};

export default RendererWindow;
