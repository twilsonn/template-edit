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
      className={`py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 ${
        children ? "px-3" : "w-12"
      } ${className}`}
    >
      <p>{children}</p>
    </button>
  );
};

export { PrimaryButton };
