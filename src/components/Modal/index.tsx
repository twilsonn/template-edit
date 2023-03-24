import React, { PropsWithChildren, useRef } from "react";
import { Portal } from "react-portal";
import { useOnClickOutside } from "usehooks-ts";

interface IModal {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Modal: React.FC<PropsWithChildren<IModal>> = ({
  children,
  open,
  setOpen,
}) => {
  const ModalRef = useRef(null);
  useOnClickOutside(ModalRef, () => setOpen(false));

  return (
    <Portal>
      <div className={`modal-wrapper ${open ? "open" : ""}`}>
        <div className="modal-container">{children}</div>
      </div>
    </Portal>
  );
};

export default Modal;
