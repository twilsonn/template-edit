interface Template {
  id: string;
  content: string;
  data: string;
  type: "twig" | "handlebars" | "svelte";
  name: string;
  createdAt: number;
  updatedAt: number;
}

interface TemplateState {
  active: string;
  open: string[];
  templates: {
    [id: string]: Template;
  };
}

type TemplateAction<T> = Action<TemplateState, T>;

interface TemplateActions {
  getContent: (id: string) => Template;
  setContent: (id: string, content: string) => Template;
  setData: (id: string, data: string) => Template;
  removeTemplate: (id: string) => Template;
  createTemplate: (
    template: Omit<Template, "id" | "createdAt" | "updatedAt">
  ) => Template;
  setActive: (id: string) => Template;
  openTemplate: (id: string) => void;
  closeTemplate: (id: string) => void;
}
