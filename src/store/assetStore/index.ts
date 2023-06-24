import { create } from "zustand";
import { createAsset, getAsset, removeAsset } from "./actions";

const useAssetStore = create<AssetState & AssetActions>((set, get) => ({
  assets: {},
  createAsset: createAsset(set, get),
  getAsset: getAsset(set, get),
  removeAsset: removeAsset(set, get),
}));

export default useAssetStore;
