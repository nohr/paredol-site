import { proxy } from "valtio";

interface songTypes {
  name: string;
  artist: string;
  album?: string;
  url?: string;
  cover?: string;
  duration?: number;
}

interface stateypes {
  // UI
  theme: string;
  monochrome: boolean;
  motion: boolean;
  loading: boolean;
  modalImg: null;
  options: boolean;
  colorBar: boolean;
  chatMode: boolean;
  // Audio
  songs: Array<songTypes>;
  songIndex: number;
  muted: boolean;
  playMusic: boolean;
  playRate: number;
  resetRate: number;
  selectRate: number;
  // Mobile
  gyro: boolean;
  mobile: boolean;
  orientation: boolean;
}

export const state = proxy<stateypes>({
  //UI
  theme: "dark",
  monochrome: false,
  motion: false,
  loading: true,
  modalImg: null,
  options: false,
  colorBar: false,
  chatMode: false,
  // Audio
  songs: [],
  songIndex: 1,
  muted: false,
  playMusic: false,
  playRate: 0.75,
  resetRate: Math.random() * (1.15 - 0.3) + 0.3,
  selectRate: Math.random() * (1.15 - 0.85) + 0.85,
  // Mobile
  gyro: false,
  mobile: false,
  orientation: true,
});
