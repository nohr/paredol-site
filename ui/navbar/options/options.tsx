"use client";

import React, { useContext, useRef } from "react";
import { useSnapshot } from "valtio";
import { state } from "state";
import { MusicPlayer } from "./musicPlayer";
import { SongInfo } from "./songInfo";
import { ColorIcon, ModeIcon, MuteIcon } from "svg";
import { toggleTheme, toggleMotion, toggleMute } from "utils";
import { IoAccessibility } from "react-icons/io5";
import { AudioContext } from "@context/audio.context";

const Options = ({ ...props }) => {
  const { muted, theme, motion, mobile } = useSnapshot(state);
  const ref = useRef<HTMLDivElement>(null!);
  const { className } = props;
  const { select } = useContext(AudioContext);

  ref.current?.addEventListener(
    "touchmove",
    (e: any) => {
      e.preventDefault();
    },
    false
  );

  // close the options menu when the user clicks outside of it
  // const handleClick = (e: any) => {
  //   if (ref.current.contains(e.target)) return;
  //   else state.options = false;
  //   // if (!mobile && optionsBtn.current?.contains(e.target)) return;

  //   console.log("clicked outside of options menu");
  // };

  // useEffect(() => {
  //   if (typeof window === "undefined") return;
  //   window.addEventListener("mousedown", handleClick);
  //   return () => {
  //     if (typeof window === "undefined") return;
  //     window.removeEventListener("mousedown", handleClick);
  //   };
  // }, [handleClick]);

  return (
    <div
      ref={ref}
      className={`${className} bottom-36 z-50 grid w-full grid-cols-[48%_4%_48%] grid-rows-[min-content] items-start rounded-2xl border-y-[1px] border-blue-900 p-3 !backdrop-blur-lg dark:border-blue-200 md:fixed md:top-[68px] md:right-4 md:h-min md:w-48 md:grid-cols-[100%] md:grid-rows-[min-content_20px_min-content] md:border-y-0 lg:w-80`}
    >
      <div className="m-0 flex h-full w-full flex-col items-center justify-center gap-y-5 p-0">
        <p className=" select-none rounded-lg p-0 text-xs font-black uppercase md:static">
          Audio
        </p>
        <MusicPlayer />
        <SongInfo />
        <div
          className="fill group relative flex h-min w-full cursor-pointer select-none flex-row-reverse items-center justify-between gap-x-2 rounded-lg border-[1px] border-blue-900 py-1 px-1 dark:border-blue-200"
          onClick={() => {
            toggleMute();
            select();
          }}
        >
          {!muted ? "Mute SFX" : "Unmute SFX"}
          <MuteIcon className="m-0 h-4 w-4 fill-blue-900 p-0 dark:fill-blue-200 md:group-hover:fill-white  dark:md:group-hover:fill-black " />
        </div>
      </div>
      <div className="grid_space w-full md:h-full"></div>
      <div className="m-0 flex h-full w-full flex-col items-center justify-center gap-y-5 p-0 md:relative">
        <p className=" select-none rounded-lg p-0 text-xs font-black uppercase md:static">
          Display
        </p>
        <div
          className="fill group relative flex h-min w-full cursor-pointer select-none flex-row-reverse items-center justify-between gap-x-2 rounded-lg border-[1px] border-blue-900 py-1 px-1 dark:border-blue-200"
          onClick={() => {
            toggleTheme();
            select();
          }}
        >
          {theme === "light" ? "Dark Theme" : "Light Theme"}
          <ModeIcon className="m-0 h-4 w-4 fill-blue-900 p-0 dark:fill-blue-200 md:group-hover:fill-white  dark:md:group-hover:fill-black" />
        </div>
        <div
          className="fill group relative flex h-min w-full cursor-pointer select-none flex-row-reverse items-center justify-between gap-x-2 rounded-lg border-[1px] border-blue-900 py-1 px-1 dark:border-blue-200"
          onClick={() => {
            toggleMotion();
            select();
          }}
        >
          {!motion ? "Reduce Motion" : "Enable Motion"}
          <IoAccessibility className="m-0 h-4 w-4 fill-blue-900 p-0 dark:fill-blue-200 md:group-hover:fill-white  dark:md:group-hover:fill-black" />
        </div>
        <div
          className=" fill relative flex h-min w-full cursor-pointer select-none flex-row-reverse items-center justify-between gap-x-2 rounded-lg border-[1px] border-blue-900 py-1 px-1 dark:border-blue-200"
          onClick={() => {
            //   openWheel();
            select();
          }}
        >
          Change Color
          <ColorIcon className="m-0 h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export default Options;
