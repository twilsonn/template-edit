import { useState } from "react";
import { atom, useAtom } from "jotai";
import { TemplateType } from "@/features/EditorWindow/state/templateState";
import useTemplateStore from "@/store/templateStore";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { Plus } from "@/assets/icons";

export const createTemplateModalOpen = atom(false);

const CreateTemplate = () => {
  const { createTemplate } = useTemplateStore();

  const [open, setOpen] = useAtom(createTemplateModalOpen);
  const [name, setName] = useState("");
  const [type, setType] = useState("twig");

  const handleOnFormSubmit: React.FormEventHandler<HTMLFormElement> = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();

    createTemplate({
      type: type as TemplateType,
      name: name,
      content: "placeholder",
      data: "{}",
    });

    return setOpen(false);
  };

  const handleOnFormReset = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <h3 className="text-lg font-semibold pb-2">Create New Template</h3>

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
          options={["twig", "svelte", "handlebars"]}
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
  );
};

export { CreateTemplate };
