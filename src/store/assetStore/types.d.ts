interface Asset {
  id: string;
  content: string;
  type: string;
  tag: string;
}

interface AssetState {
  assets: {
    [id: string]: Asset;
  };
}

type AssetAction<T> = Action<AssetState, T>;

interface AssetActions {
  removeAsset: (id: string) => Asset;
  createAsset: (template: Omit<Asset, "id">) => Asset;
  getAsset: (id: string) => Asset;
}
