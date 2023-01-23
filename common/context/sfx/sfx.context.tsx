import { state } from "state";
import React, { ReactNode, useRef } from "react";
import useSound from "use-sound";
import { useSnapshot } from "valtio";
import { SFXContext } from "./index";

const rate = Math.random() * (1.15 - 0.85) + 0.85;
function SFXProvider({ children }: { children?: ReactNode }) {
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
}

export default SFXProvider;
