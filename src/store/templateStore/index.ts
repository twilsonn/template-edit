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
            '<!DOCTYPE html>\n<html>\n\t<head>\n\t\t<title>{{ title }}</title>\n\t\t<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">\n\t\t<script src="files/index.js"></script>\n\t</head>\n\t<body>\n\t\t<main class="container max-w-sm mt-5">\n\t\t\t<h1>{{ title }}</h1>\n\n\t\t\t<p>Demonstration using <span><a href="https://getbootstrap.com/">Bootstrap</a></span> 😀</p>\n\n\t\t\t<div class="list-group mt-4">\n\t\t\t\t{% for item in navigation %}\n\t\t\t\t<a href="{{ item.href }}" class="list-group-item list-group-item-action" aria-current="true">\n\t\t\t\t\t{{ item.caption }}\n\t\t\t\t</a>\n\t\t\t\t{% endfor %}\n\t\t\t</div>\n\n\t\t\t<div class="mt-5">\n\t\t\t\t<h3 id="current-time"></h3>\n\t\t\t\t<p>Current time is updated using the index.js file which is imported by line 6:</p>\n\t\t\t\t<pre>&lt;script src=&quot;files/index.js&quot;&gt;&lt;/script&gt;</pre>\n\t\t\t</div>\n\t\t</main>\n\t</body>\n</html>\n',
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
