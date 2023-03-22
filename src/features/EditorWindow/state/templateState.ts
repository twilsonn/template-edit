import { MapOrEntries } from "usehooks-ts";
import { atomWithLocalStorage } from "../../../utils/AtomWithLocalStorage";

const templatesAtom = atomWithLocalStorage<MapOrEntries<string, string>>(
  "templates",
  [
    [
      "default",
      '<!DOCTYPE html>\r\n<html>\r\n\t<head>\r\n\t<title>My Webpage</title>\r\n\t</head>\r\n\t<body>\r\n\t<ul id="navigation">\r\n\t{% for item in navigation %}\r\n\t<li><a href="{{ item.href }}">{{ item.caption }}</a></li>\r\n\t{% endfor %}\r\n\t</ul>\r\n\r\n\t<h1>My Webpage</h1>\r\n\t{{ a_variable }}\r\n\t</body>\r\n</html>\r\n',
    ],
  ]
);

export { templatesAtom };
