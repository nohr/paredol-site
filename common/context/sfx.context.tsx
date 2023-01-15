import { state } from "state";
import React, { createContext, useRef } from "react";
import useSound from "use-sound";
import { useSnapshot } from "valtio";

interface SFXContext {
  select: () => void;
  open: () => void;
  close: () => void;
  home: () => void;
  confirm: () => void;
  reset: () => void;
  audio: React.RefObject<HTMLAudioElement> | null;
}

export const SFXContext = createContext<SFXContext>({
  select: () => {},
  open: () => {},
  close: () => {},
  home: () => {},
  confirm: () => {},
  reset: () => {},
  audio: null,
});

const rate = Math.random() * (1.15 - 0.85) + 0.85;
export const SFXProvider = ({ children }: { children?: React.ReactNode }) => {
  const { muted, playRate } = useSnapshot(state);
  const [select] = useSound("/sounds/select.mp3", {
    volume: muted ? 0 : 1,
    playbackRate: rate,
  });
  const [open] = useSound("/sounds/open.mp3", { volume: muted ? 0 : 1 });
  const [close] = useSound("/sounds/close.mp3", { volume: muted ? 0 : 1 });
  const [home] = useSound("/sounds/home.mp3", {
    volume: muted ? 0 : 1,
    playbackRate: playRate,
  });
  const [confirm] = useSound("/sounds/confirm.mp3", { volume: muted ? 0 : 1 });
  const [reset] = useSound("/sounds/reset.mp3", { volume: muted ? 0 : 1 });
  const audio = useRef<HTMLAudioElement>(null!);
  return (
    <SFXContext.Provider
      value={{
        select,
        open,
        close,
        home,
        confirm,
        reset,
        audio,
      }}
    >
      {children}
      <audio ref={audio} preload="metadata" autoPlay={false}></audio>
    </SFXContext.Provider>
  );
};

interface AudioConsumerProps {
  children: (value: any) => React.ReactNode;
}

export const AudioConsumer = ({ children }: AudioConsumerProps) => (
  <SFXContext.Consumer>
    {({ select, open, close, home, confirm, reset, audio }) =>
      children({ select, open, close, home, confirm, reset, audio })
    }
  </SFXContext.Consumer>
);
