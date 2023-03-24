import prettier from "prettier";
import TwigParser from "prettier-plugin-twig-melody";

const twig = (text: string): string => {
  const options = { parser: "melody", plugins: [TwigParser], tabWidth: 4 };
  return prettier.format(text, options);
};

export { twig };
