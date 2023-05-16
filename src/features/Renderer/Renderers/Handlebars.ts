import * as Handlebars from "handlebars/dist/cjs/handlebars";
import { RenderFunction } from "./types";

const render: RenderFunction = ({ content, data }) => {
  const handlebarsTemplate = Handlebars.compile(content);

  try {
    const html = handlebarsTemplate(data);
    return { html };
  } catch (error) {
    return { html: "", error: error as Error };
  }
};

export default render;
