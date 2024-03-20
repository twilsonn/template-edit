import { CopyIcon } from "@/assets/icons";
import { ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from "react";
import toast from "react-hot-toast";

interface ICopyTextProps {
  text: string;
  message?: string;
}

const CopyText: React.FC<
  PropsWithChildren<ICopyTextProps & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>>
> = ({ children, text, className, message }) => {
  const handleOnCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success(message || "Successfully copied!");
  };

  return children ? (
    <div onClick={() => handleOnCopy(text)}>{children}</div>
  ) : (
    <button
      type="button"
      className={`h-10 w-10 rounded-md bg-gray-100 px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200 ${className}`}
      onClick={() => handleOnCopy(text)}
    >
      <CopyIcon className="w-5 h-5 text-gray-500" />
      <span className="sr-only">copy text</span>
    </button>
  );
};

export default CopyText;
