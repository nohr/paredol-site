import { Folder } from "./opt.style";
import { FFIcon, PlayPauseIcon } from "./opt.svg";

export function PlayButton() {
  return (
    <Folder
      className="trayIcon li"
      onClick={() => {
        // toggleMusic(audio, setSong);
      }}
    >
      <PlayPauseIcon />
    </Folder>
  );
}

export function FFButton() {
  return (
    <Folder
      className="trayIcon li"
      onClick={() => {
        // nextSong(audio, setSong);
        // select();
      }}
    >
      <FFIcon />
    </Folder>
  );
}
