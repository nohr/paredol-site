import { useSnapshot } from "valtio";
import { state } from "state";
import { FFIcon, PlayPauseIcon } from "svg";
import { nextSong, toggleMusic, useSong } from "utils";
import { useContext, useEffect, useRef, useState } from "react";
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
      <PlayPauseIcon className="fade-transition aspect-square h-4 overflow-visible md:h-[10px] md:w-[10px]" />
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
      <FFIcon className="fade-transition aspect-square h-4 overflow-visible md:h-[10px] md:w-[10px]" />
    </div>
  );
}

export function MusicPlayer() {
  const { select, audio } = useContext(SFXContext);
  const [song, songs] = useSong();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (audio?.current) {
      audio.current.addEventListener("timeupdate", () => {
        const duration = audio?.current?.duration || 0;
        const currentTime = audio?.current?.currentTime || 0;
        setProgress((currentTime / duration) * 100);
      });
    }
  }, [audio]);

  function updateProgress(e) {
    const width = e.currentTarget.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const duration = audio?.current?.duration || 0;
    audio?.current?.currentTime &&
      (audio.current.currentTime = (clickX / width) * duration);
  }

  return (
    <div className="relative m-0 flex h-12 w-full items-center justify-between gap-x-1 self-center overflow-hidden rounded-3xl border-[1px] border-blue-900 dark:border-blue-200  md:h-8 ">
      {song ? (
        <>
          <PlayButton
            audio={audio}
            select={select}
            className={` ${
              progress > 5
                ? "bg-blue-200 fill-black dark:bg-blue-900 dark:fill-white md:hover:!fill-blue-200 md:hover:dark:!fill-blue-900"
                : ""
            } absolute left-2 flex aspect-square h-8 cursor-pointer items-center justify-center rounded-full border-[1px] border-transparent bg-blue-900 fill-white dark:bg-blue-200 dark:fill-black md:left-1 md:h-[20px] md:w-[20px]  md:hover:border-blue-900 md:hover:bg-transparent md:hover:fill-blue-900 md:hover:dark:border-blue-200 md:hover:dark:fill-blue-200`}
          />
          <div
            className="inline-block h-full w-full"
            onClick={updateProgress}
            onTouchStart={updateProgress}
          >
            <div
              className="inline-block h-full bg-blue-900 dark:bg-blue-200"
              style={{ width: `${progress}%` }}
            >
              &nbsp;
            </div>
          </div>
          <FFButton
            audio={audio}
            select={select}
            className={` ${
              progress > 80
                ? "bg-blue-200 fill-black dark:bg-blue-900 dark:fill-white md:hover:!fill-blue-200 md:hover:dark:!fill-blue-900"
                : ""
            } absolute right-2 flex aspect-square h-8 cursor-pointer items-center justify-center rounded-full border-[1px] border-transparent bg-blue-900 fill-white dark:bg-blue-200 dark:fill-black md:right-1 md:h-[20px] md:w-[20px] md:hover:border-blue-900 md:hover:bg-transparent md:hover:fill-blue-900 md:hover:dark:border-blue-200 md:hover:dark:fill-blue-200`}
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
}
