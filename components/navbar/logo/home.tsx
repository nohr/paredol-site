// import { useRef } from "react";
import { useState } from "react";
import { state } from "../../../common/state";
import { LogoWrapper } from "../nav.style";
import LogoCanvas from "./logo.comp";

export function HomeButton() {
  // const svg = useRef(null);
  //   const snap = useSnapshot(state);
  //   const clip = useSnapshot(state);

  const [hover, setHover] = useState<boolean>(false);
  return (
    <LogoWrapper
      onClick={() => (state.menu = false)}
      href="/"
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
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
