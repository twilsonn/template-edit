import { useState } from "react";
import { atom, useAtom } from "jotai";
import { Plus } from "../../../../assets/icons";
import { templatesAtom } from "../../../EditorWindow/state";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import Select from "../../../../components/Select";
import Modal from "../../../../components/Modal";
import { useMap } from "usehooks-ts";
import { uniqueId } from "../../../../utils/generateId";

export const createTemplateModalOpen = atom(false);

const CreateTemplate = () => {
  const [{ templates }, setTemplates] = useAtom(templatesAtom);

  const [open, setOpen] = useAtom(createTemplateModalOpen);
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const handleOnFormSubmit: React.FormEventHandler<HTMLFormElement> = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();

    const template = {
      id: uniqueId(),
      content: "",
      lastUpdated: new Date(Date.now()).getTime(),
      name: name,
    };

    setTemplates({
      activeTemplate: template.id,
      templates: [...Array.from(templates), [template.id, template]],
    });

    return setOpen(false);
  };

  const handleOnFormReset = () => {
    setOpen(false);
  };

  return (
    <>
      <Button.Icon
        Icon={Plus}
        className="border border-neutral-800"
        onClick={() => setOpen(true)}
      >
        New Template
      </Button.Icon>

      <Modal open={open} setOpen={setOpen}>
        <h3 className="text-lg font-semibold text-neutral-300 pb-2">
          Create New Template
        </h3>

        <form onSubmit={handleOnFormSubmit} onReset={handleOnFormReset}>
          <Input
            name="name"
            value={name}
            setValue={setName}
            placeholder="Template #1"
          />

          <Select
            name="type"
            value={type}
            setValue={setType}
            options={["twig", "svelte"]}
          />

          <div className="flex space-x-6 mt-2">
            <Button.Secondary type="reset" className="w-full mt-4">
              Cancel
            </Button.Secondary>
            <Button.Primary type="submit" className="w-full mt-4">
              Create
            </Button.Primary>
          </div>
        </form>
      </Modal>
    </>
  );
};

export { CreateTemplate };
