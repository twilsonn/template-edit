import React, { PropsWithChildren } from "react";

interface IPrimaryButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const PrimaryButton: React.FC<PropsWithChildren<IPrimaryButton>> = ({
  children,
  className,
  type,
}) => {
  return (
    <button
      type={type}
      className={`h-12 rounded-md  flex items-center justify-center transition-colors hover:bg-blue-600 bg-blue-500 ${
        children ? "px-3" : "w-12"
      } ${className}`}
    >
      <p>{children}</p>
    </button>
  );
};

export { PrimaryButton };
