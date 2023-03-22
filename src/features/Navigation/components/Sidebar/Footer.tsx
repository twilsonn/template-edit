import { Link } from "../../../../assets/icons";

const Footer = () => {
  return (
    <footer className="select-none">
      <a
        href="https://github.com/twilsonn/template-edit"
        className="h-16 border-t border-neutral-700 text-neutral-200 w-full flex items-center justify-center space-x-3 hover:text-blue-400 transition-colors"
      >
        <p className="text-lg font-semibold">
          Open{" "}
          <span className="font-brand underline text-xl">TemplateEdit</span> on
          GitHub
        </p>
        <Link className="w-3 h-3 mb-2" />
      </a>
    </footer>
  );
};

export { Footer };
