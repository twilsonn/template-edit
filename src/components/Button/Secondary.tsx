import React, { PropsWithChildren } from "react";

interface ISecondaryButton
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const SecondaryButton: React.FC<PropsWithChildren<ISecondaryButton>> = ({
  children,
  className,
  type,
}) => {
  return (
    <button
      type={type}
      className={`h-12 rounded-md  flex items-center justify-center transition-colors hover:bg-neutral-600 bg-neutral-500 ${
        children ? "px-3" : "w-12"
      } ${className}`}
    >
      <p>{children}</p>
    </button>
  );
};

export { SecondaryButton };
