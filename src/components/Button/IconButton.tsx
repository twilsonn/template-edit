import React, { PropsWithChildren } from "react";

interface IIconButton
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  Icon: React.FC<{ className?: string }>;
  className?: string;
  iconClassName?: string;
}

const IconButton: React.FC<PropsWithChildren<IIconButton>> = ({
  Icon,
  children,
  className,
  iconClassName,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`h-12 rounded-md bg-neutral-800 flex items-center justify-center transition-colors hover:bg-neutral-900 ${
        children ? "space-x-2 px-3" : "w-12"
      } ${className}`}
    >
      <p>{children}</p>
      <Icon className={`w-4 h-4 text-neutral-200 ${iconClassName}`} />
    </button>
  );
};

export { IconButton };
