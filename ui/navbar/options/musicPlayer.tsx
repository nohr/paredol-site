import { useSnapshot } from "valtio";
import { state } from "state";
import { FFIcon, PlayPauseIcon } from "svg";
import { loadSong, useSong } from "utils";
import { useContext, useEffect, useRef } from "react";
import { AudioContext } from "@context/audio.context";

export function toggleMusic(audio: any, nextSong: () => any) {
  state.playing = !state.playing;
  if (state.playing === false) {
    audio.play();
  } else {
    audio.pause();
  }

  audio.onended = () => nextSong();
}

function PlayButton({ ...props }) {
  const { audio, nextSong, select, className } = props;
  const { playing } = useSnapshot(state);
  return (
    <div
      className={className}
      onClick={() => {
        toggleMusic(audio.current, nextSong);
      }}
    >
      <PlayPauseIcon className="h-[10px] w-[10px] overflow-visible" />
    </div>
  );
}

function FFButton({ ...props }) {
  const { nextSong, select, className } = props;

  return (
    <div
      className={className}
      onClick={() => {
        nextSong();
        select();
      }}
    >
      <FFIcon className="h-[10px] w-[10px] overflow-visible" />
    </div>
  );
}

export function MusicPlayer() {
  const { playing, songIndex } = useSnapshot(state);
  const { select } = useContext(AudioContext);
  const audio = useRef<HTMLAudioElement>(null!);
  const [song, songs, setSong, nextSong] = useSong();
  // change styling of the  buttons when the song track passes behind them

  useEffect(() => {
    async () => {
      songs[songIndex].src = await loadSong(songs[songIndex].name);
      console.log(audio.current.src);
    };
    // audio.current.play();
  }, [songIndex, songs]);

  return (
    <>
      <div className="relative m-0 flex h-8 w-full items-center justify-between gap-x-1 self-center rounded-3xl border-[1px] border-blue-900 px-[5px] py-2 dark:border-blue-200 ">
        <PlayButton
          audio={audio}
          select={select}
          nextSong={nextSong}
          className={`flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-full border-[1px] border-transparent bg-blue-900 fill-white dark:bg-blue-200 dark:fill-black  md:hover:border-blue-900 md:hover:bg-transparent md:hover:fill-blue-900 md:hover:dark:border-blue-200 md:hover:dark:fill-blue-200`}
        />
        {/*TODO: Song track */}
        <FFButton
          select={select}
          nextSong={nextSong}
          className={`flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-full border-[1px] border-transparent bg-blue-900 fill-white dark:bg-blue-200 dark:fill-black md:hover:border-blue-900 md:hover:bg-transparent md:hover:fill-blue-900 md:hover:dark:border-blue-200 md:hover:dark:fill-blue-200`}
        />
      </div>
      <input
        type="range"
        className="relative m-0 flex h-8 w-full items-center justify-between gap-x-1 self-center rounded-3xl border-[1px] border-blue-900 px-[5px] py-2 dark:border-blue-200"
      />
      <audio
        ref={audio}
        src={songs[songIndex]?.url}
        preload="metadata"
        autoPlay={false}
      ></audio>
    </>
  );
}
