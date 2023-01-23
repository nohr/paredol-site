"use client";

import React, { useContext, useRef } from "react";
import { useSnapshot } from "valtio";
import { state } from "state";
import { MusicPlayer } from "./musicPlayer";
import { SongInfo } from "./songInfo";
import { ModeIcon, MuteIcon } from "svg";
import { toggleTheme, toggleMute } from "utils";
import { AnimatePresence, motion } from "framer-motion";
import { SFXContext } from "context/sfx";

function Options({ ...props }) {
  const { muted, theme, options, mobile } = useSnapshot(state);
  const ref = useRef<HTMLDivElement>(null!);
  const { className } = props;
  const { select } = useContext(SFXContext);

  ref.current?.addEventListener(
    "touchmove",
    (e: any) => {
      e.preventDefault();
    },
    { passive: true }
  );

  return (
    <AnimatePresence>
      {options && (
        <motion.div
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.1 },
          }}
          initial={{ y: mobile ? 500 : -500, scale: 0 }}
          animate={{ y: 0, scale: 1 }}
          exit={{ y: mobile ? 500 : -500, scale: 0 }}
          transition={{ duration: 0.2, type: "spring", bounce: 0.25 }}
          ref={ref}
          className={`${className} bottom-36 z-50 mx-1 grid w-full items-start border-blue-900 p-3 backdrop-blur-lg dark:border-blue-200 md:fixed md:!top-[46px] md:right-4 md:mx-0 md:h-min md:w-48 md:grid-cols-[100%] md:grid-rows-[min-content_20px_min-content] md:rounded-2xl md:border-[1px] md:!border-t-0 md:pt-10 md:shadow-lg lg:w-60`}
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
              <MuteIcon className="fade-transition m-0 h-4 w-4 fill-blue-900 p-0 dark:fill-blue-200 md:group-hover:fill-white  dark:md:group-hover:fill-black " />
            </div>
          </div>
          <div className="grid_space w-full md:h-full"></div>
          <div className="m-0 flex h-full w-full flex-col items-center justify-start gap-y-5 p-0 md:relative">
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
              <ModeIcon className="fade-transition m-0 h-4 w-4 fill-blue-900 p-0 dark:fill-blue-200 md:group-hover:fill-white  dark:md:group-hover:fill-black" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Options;
