"use client";

import React, { useContext, useEffect, useRef } from "react";
import { useSnapshot } from "valtio";
import { state } from "state";
import { MusicPlayer } from "./musicPlayer";
import { SongInfo } from "./songInfo";
import { ColorIcon, ModeIcon, MuteIcon } from "svg";
import { toggleTheme, toggleEnableMotion, toggleMute, useColor } from "utils";
import { IoAccessibility } from "react-icons/io5";
import { SFXContext } from "@context/sfx.context";
import { Flex } from "@adobe/react-spectrum";
import { ColorSlider } from "@react-spectrum/color";
import { AnimatePresence, motion } from "framer-motion";

const Options = ({ ...props }) => {
  const { muted, theme, enableMotion, colorBar, options, mobile } =
    useSnapshot(state);
  const ref = useRef<HTMLDivElement>(null!);
  const { className } = props;
  const { select, confirm } = useContext(SFXContext);

  ref.current?.addEventListener(
    "touchmove",
    (e: any) => {
      e.preventDefault();
    },
    { passive: true }
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

  const [value, setValue] = useColor();
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
          className={`${className} bottom-36 z-50 mx-1 grid w-full  items-start border-blue-900 p-3 backdrop-blur-lg dark:border-blue-200 md:fixed md:top-20 md:right-4 md:mx-0 md:h-min md:w-48 md:grid-cols-[100%] md:grid-rows-[min-content_20px_min-content] md:rounded-2xl md:border-y-0 md:bg-white md:bg-opacity-70 md:dark:bg-black md:dark:bg-opacity-70 lg:w-60`}
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
              <ModeIcon className="fade-transition m-0 h-4 w-4 fill-blue-900 p-0 dark:fill-blue-200 md:group-hover:fill-white  dark:md:group-hover:fill-black" />
            </div>
            <div
              className="fill group relative flex h-min w-full cursor-pointer select-none flex-row-reverse items-center justify-between gap-x-2 rounded-lg border-[1px] border-blue-900 py-1 px-1 dark:border-blue-200"
              onClick={() => {
                toggleEnableMotion();
                select();
              }}
            >
              {!enableMotion ? "Reduce Motion" : "Enable Motion"}
              <IoAccessibility className="fade-transition m-0 h-4 w-4 fill-blue-900 p-0 dark:fill-blue-200 md:group-hover:fill-white  dark:md:group-hover:fill-black" />
            </div>
            {colorBar ? (
              <div className="flex h-fit w-full overflow-hidden rounded-lg border-[1px] border-blue-900 dark:border-blue-200">
                <Flex
                  direction="column"
                  alignItems="start"
                  width="100%"
                  height="32px"
                  gap={0}
                >
                  <ColorSlider
                    value={value}
                    onChange={setValue}
                    onChangeEnd={() => {
                      state.colorBar = false;
                      confirm();
                    }}
                    channel="hue"
                    label={null}
                    width="100%"
                    height="100%"
                    flex={true}
                  />
                </Flex>
              </div>
            ) : (
              <div
                className=" fill relative flex h-min w-full cursor-pointer select-none flex-row-reverse items-center justify-between gap-x-2 rounded-lg border-[1px] border-blue-900 py-1 px-1 dark:border-blue-200"
                onClick={() => {
                  state.colorBar = !colorBar;
                  select();
                }}
              >
                <>
                  Change Color
                  <ColorIcon className="m-0 h-4 w-4" />
                </>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Options;
