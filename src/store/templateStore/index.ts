import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import {
  CloseTemplate,
  createTemplate,
  getContent,
  openTemplate,
  removeTemplate,
  setActive,
  setContent,
  setData,
} from "./actions";

const timeNow = new Date(Date.now()).getTime();

const useTemplateStore = create<TemplateState & TemplateActions>()(
  persist(
    (set, get) => ({
      active: "1",
      open: ["1"],
      templates: {
        ["1"]: {
          id: "1",
          content:
            '<!DOCTYPE html>\r\n<html>\r\n\t<head>\r\n\t\t<title>{{ title }}</title>\r\n\t\t<script src="files/index.js"></script>\r\n\t</head>\r\n\t<body>\r\n\t\t<h1>{{ title }}</h1>\r\n\r\n\t\t<ul id="navigation">\r\n\t\t\t{% for item in navigation %}\r\n\t\t\t<li><a href="{{ item.href }}">{{ item.caption }}</a></li>\r\n\t\t\t{% endfor %}\r\n\t\t</ul>\r\n\t</body>\r\n</html>\r\n',
          data: '{"title":"Default page","navigation":[{"href":"#","caption":"Home"},{"href":"#","caption":"About"},{"href":"https://github.com/twilsonn/template-edit","caption":"Github"}]}',
          name: "test",
          type: "twig",
          createdAt: timeNow,
          updatedAt: timeNow,
        },
      },
      createTemplate: createTemplate(set, get),
      getContent: getContent(set, get),
      removeTemplate: removeTemplate(set, get),
      setContent: setContent(set, get),
      setActive: setActive(set, get),
      setData: setData(set, get),
      openTemplate: openTemplate(set, get),
      closeTemplate: CloseTemplate(set, get),
    }),
    {
      name: "templates",
    }
  )
);

export default useTemplateStore;
