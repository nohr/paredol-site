"use client";

import { state } from "state";
import React, { createContext } from "react";
import useSound from "use-sound";
import { useSnapshot } from "valtio";

interface AudioContext {
  select: () => void;
  open: () => void;
  close: () => void;
  home: () => void;
  confirm: () => void;
  reset: () => void;
}

export const AudioContext = createContext<AudioContext>({
  select: () => {},
  open: () => {},
  close: () => {},
  home: () => {},
  confirm: () => {},
  reset: () => {},
});

export const AudioProvider = ({ children }: { children?: React.ReactNode }) => {
  const { muted } = useSnapshot(state);
  const [select] = useSound("/sounds/select.mp3", {
    volume: muted ? 0 : 1,
    playbackRate: Math.random() * (1.15 - 0.85) + 0.85,
  });
  const [open] = useSound("/sounds/open.mp3", { volume: muted ? 0 : 1 });
  const [close] = useSound("/sounds/close.mp3", { volume: muted ? 0 : 1 });
  const [home] = useSound("/sounds/home.mp3", { volume: muted ? 0 : 1 });
  const [confirm] = useSound("/sounds/confirm.mp3", { volume: muted ? 0 : 1 });
  const [reset] = useSound("/sounds/reset.mp3", { volume: muted ? 0 : 1 });

  return (
    <AudioContext.Provider
      value={{
        select,
        open,
        close,
        home,
        confirm,
        reset,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

interface AudioConsumerProps {
  children: (value: any) => React.ReactNode;
}

export const AudioConsumer = ({ children }: AudioConsumerProps) => (
  <AudioContext.Consumer>
    {({ select, open, close, home, confirm, reset }) =>
      children({ select, open, close, home, confirm, reset })
    }
  </AudioContext.Consumer>
);
