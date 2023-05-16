import { atomWithLocalStorage } from "../../../utils/AtomWithLocalStorage";
import { uniqueId } from "../../../utils/generateId";

const getNewTime = () => new Date(Date.now()).getTime();

export type TemplateType = "twig" | "handlebars" | "svelte";
export interface ITemplate {
  name: string;
  type: TemplateType;
  content: string;
  data: object;
  lastUpdated: number;
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
        '<!DOCTYPE html>\r\n<html>\r\n\t<head>\r\n\t<title>My Webpage</title>\r\n\t</head>\r\n\t<body>\r\n\t<ul id="navigation">\r\n\t{% for item in navigation %}\r\n\t<li><a href="{{ item.href }}">{{ item.caption }}</a></li>\r\n\t{% endfor %}\r\n\t</ul>\r\n\r\n\t<h1>My Webpage</h1>\r\n\t{{ a_variable }}\r\n\t</body>\r\n</html>\r\n',
      data: {},
      lastUpdated: getNewTime(),
    },
  },
});

export { templatesAtom };
