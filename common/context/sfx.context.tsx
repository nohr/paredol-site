import { state } from "state";
import React, { createContext } from "react";
import useSound from "use-sound";
import { useSnapshot } from "valtio";

interface SFXContext {
  select: () => void;
  open: () => void;
  close: () => void;
  home: () => void;
  confirm: () => void;
  reset: () => void;
}

export const SFXContext = createContext<SFXContext>({
  select: () => {},
  open: () => {},
  close: () => {},
  home: () => {},
  confirm: () => {},
  reset: () => {},
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

  return (
    <SFXContext.Provider
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
    </SFXContext.Provider>
  );
};

interface AudioConsumerProps {
  children: (value: any) => React.ReactNode;
}

export const AudioConsumer = ({ children }: AudioConsumerProps) => (
  <SFXContext.Consumer>
    {({ select, open, close, home, confirm, reset }) =>
      children({ select, open, close, home, confirm, reset })
    }
  </SFXContext.Consumer>
);
