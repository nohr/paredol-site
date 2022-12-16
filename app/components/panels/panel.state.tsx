import { proxy } from "valtio";

// state to be cached
interface statePanelTypes {
  // Audio
  songIndex: number;
  muted: boolean;
  // Panel
  direction: boolean;
  dragged: boolean;
  isPro: boolean;
  isOpt: boolean;
  proSwitched: boolean;
  optSwitched: boolean;
  initPosition: { x: number; y: number };
  navPosition: { x: number; y: number };
  proPosition: { x: number; y: number };
  optPosition: { x: number; y: number };
  wheelPosition: { x: number; y: number };
}

export const statePanel = proxy<statePanelTypes>({
  // Audio
  songIndex: 0,
  muted: false,
  // Panel
  direction: false,
  dragged: false,
  isPro: false,
  isOpt: false,
  proSwitched: false,
  optSwitched: false,
  initPosition: { x: 0, y: 0 },
  navPosition: { x: 0, y: 0 },
  proPosition: { x: 0, y: 0 },
  optPosition: { x: 0, y: 0 },
  wheelPosition: { x: 0, y: 0 },
});

interface songTypes {
  name: string;
  artist: string;
  album?: string;
  url?: string;
  cover?: string;
  duration?: number;
}
// temporary state
interface cloudPanelTypes {
  // Audio
  songs: Array<songTypes>;
  // Panel
  colorWheel: boolean;
  skew: boolean;
  talking: boolean;
  dragging: boolean;
}

export const cloudPanel = proxy<cloudPanelTypes>({
  // Audio
  songs: [],
  // Panel
  colorWheel: false,
  skew: false,
  talking: false,
  dragging: false,
});
