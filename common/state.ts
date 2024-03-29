"use client";

import { DocumentData } from "firebase/firestore/lite";
import { proxy } from "valtio";

interface stateypes {
  // Firebase
  quote: string;
  // UI
  theme: string;
  hue: number;
  monochrome: boolean;
  enableMotion: boolean;
  loading: boolean;
  modalImg: null;
  options: boolean;
  colorBar: boolean;
  chatMode: boolean;
  speech: boolean;
  // Audio
  songs: any;
  songIndex: number;
  muted: boolean;
  playing: boolean;
  playRate: number;
  resetRate: number;
  selectRate: number;
  // Mobile
  menu: boolean;
  gyro: boolean;
  mobile: boolean;
  orientation: boolean;
}

export const state = proxy<stateypes>({
  // Firebase
  quote: "...",
  //UI
  theme: "light",
  hue: 0,
  monochrome: false,
  enableMotion: false,
  loading: true,
  modalImg: null,
  options: false,
  colorBar: false,
  chatMode: false,
  speech: false,
  // Audio
  songs: [],
  songIndex: 0,
  muted: false,
  playing: false,
  playRate: 0.75,
  resetRate: Math.random() * (1.15 - 0.3) + 0.3,
  selectRate: Math.random() * (1.15 - 0.85) + 0.85,
  // Mobile
  menu: false,
  gyro: false,
  mobile: false,
  orientation: true,
});
