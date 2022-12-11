import { proxy } from "valtio";

interface cloudSearchTypes {
  query: string;
  chatMode: boolean;
}

export const cloudSearch = proxy<cloudSearchTypes>({
  query: "",
  chatMode: false,
});
