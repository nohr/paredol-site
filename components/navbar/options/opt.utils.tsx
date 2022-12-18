import { state } from "../../../common/state";
import { Toggle } from "../nav.style";
import { FFIcon, PlayPauseIcon } from "./opt.svg";

// export function toggleMusic(current, setSong) {
//   let audio = current.current;
//   if (!cloud.songs[state.songIndex].url) {
//     loadSong(current, cloud.songs[state.songIndex]);
//   } else {
//     if (cloud.playMusic === false) {
//       cloud.playMusic = true;
//       audio.play();
//     } else if (cloud.playMusic === true) {
//       cloud.playMusic = false;
//       audio.pause();
//     }
//   }
//   audio.onended = () => nextSong(current, setSong);
// }
// export function nextSong(current, setSong) {
//   function next() {
//     let audio = current.current;

//     cloud.playMusic = false;
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

export function PlayButton() {
  return (
    <Toggle
      className="trayIcon li"
      onClick={() => {
        state.playMusic = !state.playMusic;
        // toggleMusic(audio, setSong);
      }}
    >
      <PlayPauseIcon />
    </Toggle>
  );
}

export function FFButton() {
  return (
    <Toggle
      className="trayIcon li"
      onClick={() => {
        // nextSong(audio, setSong);
        // select();
      }}
    >
      <FFIcon />
    </Toggle>
  );
}
