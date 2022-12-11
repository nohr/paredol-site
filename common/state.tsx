import { proxy } from "valtio";

// state to be cached
interface stateTypes {
  // Firebase=
  // UI
  theme: string;
  // Mobile
  mobile: boolean;
  gyro: boolean;
  // Canvas
  canvas: boolean;
}

export const state = proxy<stateTypes>({
  // Firebase
  // UI
  theme: window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light",
  // Mobile
  mobile: false,
  gyro: false,
  // Canvas
  canvas: true,
});

// temporary state
interface cloudTypes {
  // Firebase
  projects: Array<Object>;
  project: Array<Object>;
  quote: string;
  // UI
  UILoading: boolean;
  modalImg: null;
  // Canvas
  CanvasLoading: boolean;
  // Audio
  songs: Array<Object>;
  playMusic: boolean;
  playRate: number;
  resetRate: number;
  selectRate: number;
  // Mobile
  mobile: boolean;
  orientation: boolean;
  mobileOptions: boolean;
  mobileSearch: boolean;
}

export const cloud = proxy<cloudTypes>({
  // Firebase
  projects: [],
  project: [],
  quote: "Come in, you must be freezing.",
  //UI
  UILoading: true,
  modalImg: null,
  // Canvas
  CanvasLoading: true,
  // Audio
  songs: [],
  playMusic: false,
  playRate: 0.75,
  resetRate: Math.random() * (1.15 - 0.3) + 0.3,
  selectRate: Math.random() * (1.15 - 0.85) + 0.85,
  // Mobile
  mobile: window.matchMedia("(max-width: 768px)").matches,
  orientation: true,
  mobileOptions: false,
  mobileSearch: false,
});
