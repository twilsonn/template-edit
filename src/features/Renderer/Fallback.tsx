import { BugIcon } from "@/assets/icons";

const Fallback: React.FC<any> = ({ error }) => {
  return (
    <div
      role="alert"
      className="w-full h-full flex items-center justify-center flex-col space-y-6"
    >
      <div className="flex items-center justify-center flex-col">
        <BugIcon className="w-64 h-auto md:w-full text-neutral-200 mb-6 " />
        <h3 className="text-4xl font-semibold">Error</h3>
        <p>Something went wrong!</p>
      </div>
      <div className="flex flex-col bg-white border  rounded-xl max-w-2xl">
        <div className="bg-gray-100 border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5">
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-500">
            Error Message
          </p>
        </div>
        <div className="p-4 md:p-5">
          <code style={{ color: "red" }}>{error.message}</code>
        </div>
      </div>
    </div>
  );
};

export default Fallback;
