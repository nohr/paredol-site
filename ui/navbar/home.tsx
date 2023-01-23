// import { useRef } from "react";
import { SFXContext } from "context/sfx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
// import { useState } from "react";
import { state } from "state";
import { useSnapshot } from "valtio";
// import LogoCanvas from "./logo.comp";

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
      md:flex-row md:gap-x-1 md:p-0  md:px-[10px] md:hover:border-blue-900 md:hover:dark:border-blue-200 `}
    >
      {/* <LogoCanvas style={{ width: "48px", height: "46px" }} /> */}
      <LogoIcon />
      Paredol
    </Link>
  );
}

function LogoIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      version="1.1"
      viewBox="0 0 121.2 100"
      xmlSpace="preserve"
      className="h-6 w-6 fill-blue-900 dark:fill-blue-200 md:!h-4 md:!w-4"
    >
      <path d="M-159.8 51.8c33.9.1 60.7 26.7 60.8 60.4s-27.1 61.2-60.8 61.3-61.2-27.1-61.3-60.8c-.5-33.9 26.8-60.9 61.3-60.9zM-250.2 48.1C-284 48-310.1 21.4-310-12.8c-.2-33.2 26.5-60.4 59.8-60.6h1.7c33.3.4 60.5 28.1 60.2 61.2-.3 34.1-27.4 60.4-61.9 60.3zM-70.5 48.1c-34.4 0-61.4-26.7-61.5-60.7-.1-33.4 28-61 61.9-60.8 33.4.2 60.3 27.5 60.1 61v.2c-.1 33.9-26.5 60.3-60.5 60.3z"></path>
      <g>
        <path d="M60.7 50.6c12.4 0 22.1 9.7 22.2 22S73 95 60.7 95s-22.3-9.9-22.3-22.2c-.3-12.3 9.7-22.2 22.3-22.2zM27.7 49.3c-12.3 0-21.8-9.7-21.8-22.2C5.9 15 15.6 5.1 27.7 5h.6c12.1.1 22.1 10.2 21.9 22.3 0 12.4-9.9 22.1-22.5 22zM93.2 49.3c-12.5 0-22.4-9.7-22.4-22.1C70.8 15 81 4.9 93.4 5c12.2.1 22 10 21.9 22.2v.1c-.1 12.4-9.7 22-22.1 22z"></path>
      </g>
    </svg>
  );
}
