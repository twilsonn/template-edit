import { twig } from "twig";
import { RenderFunction } from "./types";

const render: RenderFunction = ({ content, data }) => {
  const twigRenderer = twig({
    data: content,
  });

  try {
    const html = twigRenderer.render(data);
    return { html };
  } catch (error) {
    return { html: "", error: error as Error };
  }
};

export default render;
