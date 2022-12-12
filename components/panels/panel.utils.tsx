import { useTheme } from "styled-components";
import { useSnapshot } from "valtio";
import { cloudPanel, statePanel } from "./panel.state";
import { Folder } from "./panel.style";

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

export function usePadding(panel: string) {
  const { direction, proSwitched, optSwitched } = useSnapshot(statePanel);

  if (panel === "pro") {
    return !direction
      ? "padding-top: 10px;"
      : proSwitched
      ? "padding-top: 50px !important;"
      : "padding-top: 80px;";
  } else if (panel === "opt") {
    return !direction
      ? "padding-top: 7px;"
      : optSwitched
      ? "padding-top: 50px !important;"
      : "padding-top: 80px;";
  }
}

export function useOffset(panel: string, offset: string) {
  const { direction, isOpt, isPro } = useSnapshot(statePanel);

  if (panel === "pro") {
    if (offset === "left") {
      return isPro && !direction ? `${270 - 79}px` : `0px`;
    } else if (offset === "top") {
      return isPro && direction ? `${270 - 79}px` : `0px`;
    }
  } else if (panel === "opt") {
    if (offset === "left") {
      return isOpt && !direction
        ? isPro
          ? `${270 * 2 - 79 * 2}px`
          : `${270 - 79}px`
        : `0px`;
    } else if (offset === "top") {
      return isOpt && direction
        ? isPro
          ? `${270 * 2 - 79 * 2}px`
          : `${270 - 79}px`
        : `0px`;
    }
  }
}

export function useLayout(panel: string) {
  const { direction } = useSnapshot(statePanel);

  if (panel === "pro") {
    return;
  } else if (panel === "opt") {
    return !direction
      ? "grid-template-columns: 100%; grid-template-rows: 10% 1fr 10% 1fr; padding-left: 60px;padding-right: 25px;"
      : "grid-template-columns: 1fr 1fr; grid-template-rows: 15% 1fr; padding: 80px 12px 26px;";
  }
}

export function usePanelStyle(panel: string) {
  const { isPro, isOpt } = statePanel;

  return `
    ${
      panel === "nav"
        ? `
        z-index: 5000;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-indent: 10px;
    `
        : panel === "pro"
        ? `
        z-index: 4500 !important;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    ${!isPro ? "opacity: 0; pointer-events: none;" : ""}
    padding-left: 60px;
    padding-right: 25px;
    & a{
        text-indent: 10px;
        width: 60%;
    }
    `
        : panel === "opt"
        ? `
  z-index: 4000 !important;
  display: grid;
  flex-direction: column;
  justify-content: center;
  align-items: start;
    ${!isOpt ? "opacity: 0; pointer-events: none;" : ""}

    & div{
        text-indent: 10px;
    }
        `
        : ""
    }`;
}

export function SongInfo({ song }: { song: string }) {
  // const clip = useSnapshot(cloud);
  // const snap = useSnapshot(state);

  // // Rotate reset button
  // useEffect(() => {
  //     Rotate(resetButton, clip, snap);
  // }, [state.grabberPosition, state.navPosition]);

  return (
    <Folder className="songinfo li">
      {/* <p>Song {state.songIndex + 1}/{cloud.songs.length}</p> */}
      <textarea
        readOnly
        // type="text"
        value={`${statePanel.songIndex + 1}/${
          cloudPanel.songs.length
        } > ${song}`}
        onSelect={() => {
          navigator.clipboard.writeText(song);
        }}
      ></textarea>
    </Folder>
  );
}
