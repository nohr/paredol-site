// import { useRef } from "react";
import { SFXContext } from "@context/sfx.context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
// import { useState } from "react";
import { state } from "state";
import { useSnapshot } from "valtio";
import LogoCanvas from "./logo.comp";

let taps = 0;
let factor = 4;
function handleSpeech(home: () => void, speech: boolean) {
  function getRandom(max: number, min: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  const amount = getRandom(6, 4);
  const speed = getRandom(250, 85);
  const time = getRandom(2000, 1000);
  const required = getRandom(2000, 1500);
  if (!speech) {
    state.playRate = +(Math.random() * (0.45 - 0.15) + 0.15).toFixed(2);
    home();
    taps += 1;
    setTimeout(() => {
      //  CD SPEECH
      if (taps >= amount && taps <= amount + 4) {
        // debugger;
        // state.colorChanged = true;
        state.speech = true;
        // cloud.skew = !clip.skew;
        if (state.mobile) state.chatMode = !state.chatMode;
        // TODO: Trigger smile animation
        // TODO: lengthen speech to amount of words spoken
        // newQuote();
        const color = setInterval(() => {
          state.hue += factor;
        }, 300);
        setTimeout(() => {
          clearInterval(color);
        }, 400);
        const loop = setInterval(() => {
          // toggleTheme();
          // document.getElementById("theme-color").style.transition = cloud.playRate * 500;
          state.hue + getRandom(50, 10) < 360
            ? (state.hue += getRandom(50, 10))
            : (state.hue = 0);
          state.playRate = +(Math.random() * (1.0 - 0.65) + 0.65).toFixed(2);
          home();
          // activeTap(nabla, svg);
        }, speed);
        setTimeout(() => {
          clearInterval(loop);
          state.speech = false;
        }, time);
        console.log(taps, amount, speed, time, state.hue);
      }
      taps = 0;
    }, required);
  }
}

export function HomeButton() {
  const { home } = useContext(SFXContext);
  const { speech } = useSnapshot(state);
  const path = usePathname();
  // const [hover, setHover] = useState<boolean>(false);
  return (
    <Link
      onClick={() => {
        state.menu = false;
        handleSpeech(home, speech);
      }}
      href="/"
      className={`fade-transition m-0 flex h-full w-fit select-none flex-col items-center justify-center justify-items-center gap-0 overflow-visible rounded-[15px] border-[1px] border-transparent bg-transparent p-2 font-thin shadow-none active:border-blue-900 active:dark:border-blue-200 
      md:flex-row md:gap-x-1 md:p-0  ${
        path === "/" ? "md:px-[10px]" : "md:pr-[10px]"
      } md:hover:border-blue-900 md:hover:dark:border-blue-200 `}
    >
      <LogoCanvas style={{ width: "48px", height: "46px" }} />
      Paredol
    </Link>
  );
}
