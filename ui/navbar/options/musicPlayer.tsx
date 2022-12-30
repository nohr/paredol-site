import { useSnapshot } from "valtio";
import { state } from "state";
import { FFIcon, PlayPauseIcon } from "svg";

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

function PlayButton({ ...props }) {
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

function FFButton({ ...props }) {
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

export function MusicPlayer() {
  const { playing } = useSnapshot(state);
  // change styling of the  buttons when the song track passes behind them

  //
  return (
    <div className="relative m-0 flex h-8 w-full items-center justify-between gap-x-1 self-center rounded-3xl border-[1px] border-blue-900 px-[5px] py-2 dark:border-blue-200 ">
      <PlayButton
        className={`flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-full border-[1px] border-transparent bg-blue-900 fill-white dark:bg-blue-200 dark:fill-black  md:hover:border-blue-900 md:hover:bg-transparent md:hover:fill-blue-900 md:hover:dark:border-blue-200 md:hover:dark:fill-blue-200`}
      />
      {/*TODO: Song track */}
      <FFButton
        className={`flex h-[20px] w-[20px] cursor-pointer items-center justify-center rounded-full border-[1px] border-transparent bg-blue-900 fill-white dark:bg-blue-200 dark:fill-black md:hover:border-blue-900 md:hover:bg-transparent md:hover:fill-blue-900 md:hover:dark:border-blue-200 md:hover:dark:fill-blue-200`}
      />
    </div>
  );
}
