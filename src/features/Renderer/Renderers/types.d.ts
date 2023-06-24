export type RenderInput = {
  data: any;
  content: string;
};

export type RenderFunction = (args: RenderInput) => string;
