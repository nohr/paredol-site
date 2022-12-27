"use client";

import React, { useRef } from "react";
import { useSnapshot } from "valtio";
import { state } from "../../../common/state";
import {
  FFButton,
  PlayButton,
  SongInfo,
  toggleMotion,
  toggleMute,
} from "./opt.utils";
import { ColorIcon, ModeIcon, MuteIcon } from "./opt.svg";
import { toggleTheme } from "../../../common/utils";
import { IoAccessibility } from "react-icons/io5";

const Options = ({ ...props }) => {
  const { muted, theme, motion } = useSnapshot(state);
  const ref = useRef<any>(null);
  const { optionsBtn } = props;

  ref.current?.addEventListener("touchmove", (e: any) => {
    e.preventDefault();
  });

  // close the options menu when the user clicks outside of it
  const handleClick = (e: any) => {
    if (
      ref.current?.contains(e.target) ||
      (optionsBtn.current && optionsBtn.current?.contains(e.target))
    ) {
      return;
    }
    state.options = false;
  };

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    window.addEventListener("mousedown", handleClick);
    return () => {
      if (typeof window === "undefined") return;
      window.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="bottom-36 grid w-full grid-cols-[48%_4%_48%] grid-rows-[min-content] items-start border-y-[1px] border-blue-900 p-3 backdrop-blur-lg dark:border-blue-200 md:fixed md:top-24 md:right-4 md:h-min md:w-1/5 md:grid-cols-[100%] md:grid-rows-[min-content_20px_min-content]"
    >
      <div className="m-0 flex h-full w-full flex-col items-center justify-center gap-y-5 p-0">
        <p className="absolute -top-[30px] select-none p-2 text-[0.5rem] font-black uppercase backdrop-blur-lg md:static">
          Audio
        </p>
        <ToolTray />
        <SongInfo />
        <div
          className="relative flex h-min w-full cursor-pointer select-none flex-row-reverse items-center justify-between gap-x-2 rounded-lg border-[1px] border-blue-900 py-1 px-1 dark:border-blue-200"
          onClick={() => toggleMute()}
        >
          {!muted ? "Mute SFX" : "Unmute SFX"}
          <MuteIcon className="m-0 h-4 w-4 fill-blue-900 p-0 dark:fill-blue-200" />
        </div>
      </div>
      <div className="grid_space w-full md:h-full"></div>
      <div className="m-0 flex h-full w-full flex-col items-center justify-center gap-y-5 p-0 md:relative">
        <p className="absolute -top-[30px] select-none p-2 text-[0.5rem] font-black uppercase backdrop-blur-lg md:static">
          Display
        </p>
        <div
          className="relative flex h-min w-full cursor-pointer select-none flex-row-reverse items-center justify-between gap-x-2 rounded-lg border-[1px] border-blue-900 py-1 px-1 dark:border-blue-200"
          onClick={() => toggleTheme()}
        >
          {theme === "light" ? "Dark Theme" : "Light Theme"}
          <ModeIcon className="m-0 h-4 w-4 fill-blue-900 p-0 dark:fill-blue-200" />
        </div>
        <div
          className="relative flex h-min w-full cursor-pointer select-none flex-row-reverse items-center justify-between gap-x-2 rounded-lg border-[1px] border-blue-900 py-1 px-1 dark:border-blue-200"
          onClick={() => {
            toggleMotion();
            // select();
          }}
        >
          {!motion ? "Reduce Motion" : "Enable Motion"}
          <IoAccessibility className="m-0 h-4 w-4 fill-blue-900 p-0 dark:fill-blue-200" />
        </div>
        <div
          className="relative flex h-min w-full cursor-pointer select-none flex-row-reverse items-center justify-between gap-x-2 rounded-lg border-[1px] border-blue-900 py-1 px-1 dark:border-blue-200"
          // onClick={() => {
          //   openWheel();
          //   select();
          // }}
        >
          Change Color
          <ColorIcon className="m-0 h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export default Options;

function ToolTray() {
  return (
    <div className="relative m-0 flex h-8 w-full items-center justify-between gap-x-1 self-center rounded-3xl border-[1px] border-blue-900 px-[5px] py-2 dark:border-blue-200 ">
      <PlayButton />
      {/* Song track */}
      <FFButton />
    </div>
  );
}
