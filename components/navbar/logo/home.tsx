// import { useRef } from "react";
import Link from "next/link";
// import { useState } from "react";
import { state } from "../../../common/state";
import LogoCanvas from "./logo.comp";

export function HomeButton() {
  // const svg = useRef(null);
  //   const snap = useSnapshot(state);
  //   const clip = useSnapshot(state);

  // const [hover, setHover] = useState<boolean>(false);
  return (
    <Link
      onClick={() => (state.menu = false)}
      href="/"
      className="m-0 flex h-full w-fit select-none flex-col items-center justify-center justify-items-center gap-0 overflow-visible rounded-[15px] border-[1px] border-transparent bg-transparent p-0 font-thin shadow-none md:flex-row md:gap-x-1 md:pr-[10px] md:hover:border-blue-900 md:hover:dark:border-blue-200"

      //   onClick={() => handleClick(clip, dong, nabla, svg)}
      //   onMouseDown={() => !clip.talking && activeTap(nabla, svg)}
      //   onMouseUp={() => !clip.talking && unActiveTap(nabla, svg)}
      //   onTouchStart={() => !clip.talking && activeTap(nabla, svg)}
      //   onTouchEnd={() => !clip.talking && unActiveTap(nabla, svg)}
      // ref={nabla}
    >
      <LogoCanvas />
      Paredol
    </Link>
  );
}
