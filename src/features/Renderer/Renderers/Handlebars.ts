import * as Handlebars from "handlebars/dist/cjs/handlebars";
import { RenderFunction } from "./types";

const render: RenderFunction = ({ content, data }) => {
  const handlebarsTemplate = Handlebars.compile(content);

  return handlebarsTemplate(data);
};

export default render;
