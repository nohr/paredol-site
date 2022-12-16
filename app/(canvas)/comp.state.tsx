import { proxy } from "valtio";

interface cloudCompTypes {
  target: [number, number, number];
  preview: Array<Object>;
}

export const cloudComp = proxy<cloudCompTypes>({
  target: [0, 0, 0],
  preview: [],
});
