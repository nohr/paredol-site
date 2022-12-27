import copy from "copy-to-clipboard";
import { useEffect, useState } from "react";
import { MdLibraryMusic } from "react-icons/md";
import { useSnapshot } from "valtio";
import { state } from "../../../common/state";
import { useSong } from "../../../common/utils";
import { FFIcon, PlayPauseIcon } from "./opt.svg";

// export function toggleMusic(current, setSong) {
//   let audio = current.current;
//   if (!cloud.songs[state.songIndex].url) {
//     loadSong(current, cloud.songs[state.songIndex]);
//   } else {
//     if (cloud.playing === false) {
//       cloud.playing = true;
//       audio.play();
//     } else if (cloud.playing === true) {
//       cloud.playing = false;
//       audio.pause();
//     }
//   }
//   audio.onended = () => nextSong(current, setSong);
// }
// export function nextSong(current, setSong) {
//   function next() {
//     let audio = current.current;

//     cloud.playing = false;
//     audio.pause();
//     console.log(state.songIndex);

//     if (state.songIndex < cloud.songs.length - 1) {
//       state.songIndex += 1;
//     } else {
//       state.songIndex = 0;
//     }
//     if (!cloud.songs[state.songIndex].url) {
//       loadSong(current, cloud.songs[state.songIndex]);
//     } else {
//       audio.setAttribute("src", cloud.songs[state.songIndex].url);
//       audio.play();
//     }
//   }
//   next();
//   setSong(
//     `${cloud.songs[state.songIndex].artist} - ${
//       cloud.songs[state.songIndex].name
//     }`
//   );
//   current.current.onEnded = () => next();
// }

export const toggleMute = () => {
  state.muted = !state.muted;
};
export const toggleMotion = (motion?: string) => {
  if (motion === "reduce") {
    state.motion = true;
    localStorage.setItem("motion", `true`);
    return;
  }
  state.motion = !state.motion;
  localStorage.setItem("motion", `${state.motion}`);
};

export function PlayButton({ ...props }) {
  const { className } = props;
  return (
    <div
      className={className}
      onClick={() => {
        state.playing = !state.playing;
        // toggleMusic(audio, setSong);
      }}
    >
      <PlayPauseIcon className="h-[10px] w-[10px] overflow-visible" />
    </div>
  );
}

export function FFButton({ ...props }) {
  const { className } = props;
  return (
    <div
      className={className}
      onClick={() => {
        // nextSong(audio, setSong);
        // select();
      }}
    >
      <FFIcon className="h-[10px] w-[10px] overflow-visible" />
    </div>
  );
}

export function SongInfo() {
  const [song, songs] = useSong();
  const { songIndex, motion, theme } = useSnapshot(state);
  const normal = `(${songIndex + 1}/${songs.length}) ${song}`;
  const [value, setValue] = useState<string>(normal);
  const slide = "animate-[autoscroll_7s_linear_infinite]";

  useEffect(() => {
    setValue(normal);
  }, [songs, normal, theme]);

  return (
    <div
      className="relative flex w-full cursor-pointer flex-row items-center gap-x-2 overflow-hidden rounded-lg border-[1px] border-blue-900 px-0 py-1 dark:border-blue-200"
      onMouseOver={() => {
        setValue("Click to copy song info");
      }}
      onMouseLeave={() => setValue(normal)}
      onClick={() => {
        copy(song);
        setValue("Copied!");
        setTimeout(() => setValue(normal), 2500);
      }}
    >
      <MdLibraryMusic className="absolute left-[6px] h-4 w-4 fill-blue-900 dark:fill-blue-200" />
      <p
        style={
          motion
            ? { animation: "none" }
            : value === "Copied!"
            ? { animation: "none", alignSelf: "center" }
            : undefined
        }
        className={`pointer-events-none select-none whitespace-nowrap pl-6 text-blue-900 dark:text-blue-200 ${
          !motion ? slide : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}
