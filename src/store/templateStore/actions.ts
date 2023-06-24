import { uniqueId } from "@/utils/generateId";

export const getContent: TemplateAction<TemplateActions["getContent"]> =
  (set, get) => (id) =>
    get().templates[id];

export const setContent: TemplateAction<TemplateActions["setContent"]> =
  (set, get) => (id, content) => {
    const template = get().templates[id];

    if (!template) throw new Error(`no template found with id ${id}`);

    const timeNow = new Date(Date.now()).getTime();

    const updated = {
      ...template,
      content,
      updatedAt: timeNow,
    };

    set({
      templates: {
        ...get().templates,
        [id]: updated,
      },
    });

    return updated;
  };

export const removeTemplate: TemplateAction<
  TemplateActions["removeTemplate"]
> = (set, get) => (id) => {
  const template = get().templates[id];

  if (!template) throw new Error(`no template found with id ${id}`);

  const templates = get().templates;

  delete templates[id];

  set({
    templates,
  });

  return templates[id];
};

export const createTemplate: TemplateAction<
  TemplateActions["createTemplate"]
> = (set, get) => (template) => {
  const id = uniqueId();

  const timeNow = new Date(Date.now()).getTime();

  const created = {
    id,
    createdAt: timeNow,
    updatedAt: timeNow,
    ...template,
  };

  set({
    templates: {
      ...get().templates,
      [id]: created,
    },
  });

  return created;
};

export const setActive: TemplateAction<TemplateActions["setActive"]> =
  (set, get) => (id) => {
    const template = get().templates[id];

    if (!template) throw new Error(`no template found with id ${id}`);

    set({
      active: id,
    });

    return template;
  };

export const setData: TemplateAction<TemplateActions["setData"]> =
  (set, get) => (id, data) => {
    const template = get().templates[id];

    if (!template) throw new Error(`no template found with id ${id}`);

    const timeNow = new Date(Date.now()).getTime();

    const updated = {
      ...template,
      data,
      updatedAt: timeNow,
    };

    set({
      templates: {
        ...get().templates,
        [id]: updated,
      },
    });

    return updated;
  };

export const openTemplate: TemplateAction<TemplateActions["openTemplate"]> =
  (set, get) => (id) => {
    const template = get().templates[id];

    if (!template) throw new Error(`no template found with id ${id}`);

    set({
      open: Array.from(new Set(get().open).add(id)),
    });
  };

export const CloseTemplate: TemplateAction<TemplateActions["closeTemplate"]> =
  (set, get) => (id) => {
    const template = get().templates[id];

    if (!template) throw new Error(`no template found with id ${id}`);

    const updated = new Set(get().open);

    updated.delete(id);

    set({
      open: Array.from(updated.values()),
    });

    return true;
  };
