import { useAtom } from "jotai";
import { twig } from "twig";
import { templatesAtom } from "@/features/EditorWindow/state";
import { editorSizeAtom } from "@/features/EditorWindow/state";
import { useEffect, useMemo, useRef } from "react";

const defaultHead = `
  <title>Editor</title>
`;

const RendererWindow = () => {
  const [{ activeTemplate, templates }] = useAtom(templatesAtom);
  const contentRef = useRef<HTMLIFrameElement>(null);
  const [{ window, editor }, setSize] = useAtom(editorSizeAtom);

  const twigTemplate = useMemo(
    () =>
      twig({
        data: templates[activeTemplate].content,
      }),
    [templates, activeTemplate]
  );

  useEffect(() => {
    const html = twigTemplate.render(templates[activeTemplate].data);

    const fragment = document.createRange().createContextualFragment(html);

    if (contentRef.current) {
      if (contentRef.current.contentWindow) {
        const window = contentRef.current.contentWindow;

        window.document.body.innerHTML = "";
        window.document.head.innerHTML = defaultHead;

        const headElements = fragment.querySelectorAll("link,script,style");

        if (headElements) {
          headElements.forEach((node) => {
            node.remove();
            window.document.head.appendChild(node);
          });
        }

        window.document.body.appendChild(fragment);
      }
    }
  }, [activeTemplate, templates, twigTemplate]);

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
