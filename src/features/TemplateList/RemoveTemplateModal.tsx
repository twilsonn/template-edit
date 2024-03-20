import { atom, useAtom } from "jotai";
import useTemplateStore from "@/store/templateStore";

import Button from "@/components/Button";
import Modal from "@/components/Modal";

interface IRemoveTemplateState {
  open: boolean;
  id?: string;
}

export const removeTemplateModalOpen = atom<IRemoveTemplateState>({
  open: false,
});

const RemoveTemplate = () => {
  const { removeTemplate } = useTemplateStore();
  const [modal, setModal] = useAtom(removeTemplateModalOpen);

  const setOpen = (open: boolean) => {
    setModal({
      open,
      id: modal.id,
    });
  };

  const handleOnFormSubmit: React.FormEventHandler<HTMLFormElement> = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();

    removeTemplate(modal.id!);

    return setModal({
      open: false,
      id: modal.id,
    });
  };

  const handleOnFormReset = () => {
    setModal({
      open: false,
    });
  };

  return (
    <Modal open={modal.open} setOpen={setOpen}>
      <h3 className="text-lg font-semibold pb-2">Are you sure you want to remove this template?</h3>

      <form onSubmit={handleOnFormSubmit} onReset={handleOnFormReset}>
        <p>The template will be permanently removed.</p>

        <div className="flex space-x-6 mt-2">
          <Button.Secondary type="reset" className="w-full mt-4">
            Cancel
          </Button.Secondary>
          <Button.Warning type="submit" className="w-full mt-4">
            Confirm
          </Button.Warning>
        </div>
      </form>
    </Modal>
  );
};

export default RemoveTemplate;
