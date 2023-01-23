import { useSnapshot } from "valtio";
import { state } from "state";
import { FFIcon, PlayPauseIcon } from "svg";
import { nextSong, toggleMusic, useSong } from "utils";
import { useContext } from "react";
import { SFXContext } from "context/sfx";

function PlayButton({ ...props }) {
  const { audio, select, className } = props;
  const [song, songs] = useSong();

  const { playing } = useSnapshot(state);
  return (
    <div
      className={className}
      onClick={() => {
        songs !== undefined && toggleMusic(audio, songs);
        playing && select();
      }}
    >
      <PlayPauseIcon className="fade-transition h-[10px] w-[10px] overflow-visible" />
    </div>
  );
}

function FFButton({ ...props }) {
  const { audio, select, className } = props;
  const [song, songs] = useSong();

  return (
    <div
      className={className}
      onClick={() => {
        nextSong(audio, songs);
        select();
      }}
    >
      <FFIcon className="fade-transition h-[10px] w-[10px] overflow-visible" />
    </div>
  );
}

export function MusicPlayer() {
  const { playing, songIndex } = useSnapshot(state);
  const { select, audio } = useContext(SFXContext);
  // const audio = useRef<HTMLAudioElement>(null!);
  const [song, songs] = useSong();
  // change styling of the  buttons when the song track passes behind them

  return (
    <>
      <div className="relative m-0 flex h-8 w-full items-center justify-between gap-x-1 self-center rounded-3xl border-[1px] border-blue-900 px-[5px] py-2 dark:border-blue-200 ">
        <PlayButton
          audio={audio}
          select={select}
          className={`flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-full border-[1px] border-transparent bg-blue-900 fill-white dark:bg-blue-200 dark:fill-black  md:hover:border-blue-900 md:hover:bg-transparent md:hover:fill-blue-900 md:hover:dark:border-blue-200 md:hover:dark:fill-blue-200`}
        />
        {/*TODO: Song track */}
        <FFButton
          audio={audio}
          select={select}
          className={`flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-full border-[1px] border-transparent bg-blue-900 fill-white dark:bg-blue-200 dark:fill-black md:hover:border-blue-900 md:hover:bg-transparent md:hover:fill-blue-900 md:hover:dark:border-blue-200 md:hover:dark:fill-blue-200`}
        />
      </div>
      {/* TODO: song track */}
      {/* <input
        type="range"
        style={{}}
        className="!before:dark:bg-blue-200 m-0 flex h-8  w-full appearance-none items-center justify-between gap-x-1 self-center overflow-hidden rounded-3xl border-[1px] !border-blue-900 bg-transparent before:absolute before:z-10 before:!bg-blue-900 before:content-[''] dark:!border-blue-200 "
      /> */}
    </>
  );
}
