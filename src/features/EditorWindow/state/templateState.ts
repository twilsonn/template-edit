import { atomWithLocalStorage } from "../../../utils/AtomWithLocalStorage";
import { uniqueId } from "../../../utils/generateId";

const getNewTime = () => new Date(Date.now()).getTime();

export type TemplateType = "twig" | "handlebars" | "svelte";
export interface ITemplate {
  name: string;
  type: TemplateType;
  content: string;
  data: object;
  updatedAt: number;
  createdAt: number;
}

export interface ITemplates {
  activeTemplate: string;
  templates: {
    [key: string]: ITemplate;
  };
}

const defaultId = uniqueId();

const templatesAtom = atomWithLocalStorage<ITemplates>("editor.templates", {
  activeTemplate: defaultId,
  templates: {
    [defaultId]: {
      name: "Default Template",
      type: "twig",
      content:
        '<!DOCTYPE html>\r\n<html>\r\n\t<head>\r\n\t\t<title>{{ title }}</title>\r\n\t\t<script src="files/index.js"></script>\r\n\t</head>\r\n\t<body>\r\n\t\t<h1>{{ title }}</h1>\r\n\r\n\t\t<ul id="navigation">\r\n\t\t\t{% for item in navigation %}\r\n\t\t\t<li><a href="{{ item.href }}">{{ item.caption }}</a></li>\r\n\t\t\t{% endfor %}\r\n\t\t</ul>\r\n\t</body>\r\n</html>\r\n',
      data: {
        title: "Default page",
        navigation: [
          {
            href: "#",
            caption: "Home",
          },
          {
            href: "#",
            caption: "About",
          },
          {
            href: "https://github.com/twilsonn/template-edit",
            caption: "Github",
          },
        ],
      },
      updatedAt: getNewTime(),
      createdAt: getNewTime(),
    },
  },
});

export { templatesAtom };
