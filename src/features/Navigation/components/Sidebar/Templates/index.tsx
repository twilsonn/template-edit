import { useAtom } from "jotai";
import { templatesAtom } from "../../../../EditorWindow/state";
import TemplateItem from "./TemplateItem";
import { CreateTemplate } from "./CreateTemplate";

const Templates = () => {
  const [{ templates }] = useAtom(templatesAtom);

  return (
    <div className="pt-4 overflow-hidden min-h-[24rem]">
      <div className="h-8 flex items-center px-4 justify-between">
        <h3 className="font-semibold text-xl">Templates</h3>
        <CreateTemplate />
      </div>
      <ul className="sidebar--template-list">
        {Object.entries(templates).map(([id, template]) => {
          const { name, lastUpdated } = template;
          return (
            <TemplateItem
              key={id}
              id={id}
              name={name}
              lastUpdate={lastUpdated}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Templates;
