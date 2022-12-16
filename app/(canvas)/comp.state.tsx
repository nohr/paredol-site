import { proxy } from "valtio";

interface cloudCompTypes {
  target: [number, number, number];
  preview: Array<Object>;
  //   Physics
  leftright: number;
  frontback: number;
}

export const cloudComp = proxy<cloudCompTypes>({
  target: [0, 3, 0],
  preview: [],
  //   Physics
  leftright: 0,
  frontback: 0,
});
