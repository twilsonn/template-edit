import { twig } from "twig";
import { RenderFunction } from "./types";

const render: RenderFunction = ({ content, data }) => {
  const twigRenderer = twig({
    data: content,
  });

  return twigRenderer.render(data);
};

export default render;
