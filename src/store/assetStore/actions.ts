import { uniqueId } from "@/utils/generateId";

export const getAsset: AssetAction<AssetActions["getAsset"]> =
  (set, get) => (id) =>
    get().assets[id];

export const removeAsset: AssetAction<AssetActions["removeAsset"]> =
  (set, get) => (id) => {
    const template = get().assets[id];

    if (!template) throw new Error(`no document found with id ${id}`);

    const assets = get().assets;

    delete assets[id];

    set({
      ...get(),
      assets,
    });

    return assets[id];
  };

export const createAsset: AssetAction<AssetActions["createAsset"]> =
  (set, get) => (template) => {
    const id = uniqueId();

    const created = {
      id,
      ...template,
    };
    set({
      ...get(),
      assets: {
        ...get().assets,
        [id]: created,
      },
    });

    return created;
  };
