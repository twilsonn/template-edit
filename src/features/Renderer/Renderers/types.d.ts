export type RenderInput = {
  data: any;
  content: string;
};

export type RenderOutput = {
  html: string;
  error?: Error;
};

export type RenderFunction = (args: RenderInput) => RenderOutput;
