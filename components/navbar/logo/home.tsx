// import { useRef } from "react";
import { LogoWrapper } from "../nav.style";
import { LogoCanvas } from "./logo.comp";

export function HomeButton() {
  // const svg = useRef(null);
  //   const snap = useSnapshot(state);
  //   const clip = useSnapshot(state);

  return (
    <LogoWrapper
      href="/"
      //   onClick={() => handleClick(clip, dong, nabla, svg)}
      //   onMouseDown={() => !clip.talking && activeTap(nabla, svg)}
      //   onMouseUp={() => !clip.talking && unActiveTap(nabla, svg)}
      //   onTouchStart={() => !clip.talking && activeTap(nabla, svg)}
      //   onTouchEnd={() => !clip.talking && unActiveTap(nabla, svg)}
      // ref={nabla}
    >
      <LogoCanvas />
      Paredol
    </LogoWrapper>
  );
}
