"use client";

import { useSnapshot } from "valtio";
import { cloud } from "../../../common/state";
import { cloudPanel, statePanel } from "../panel.state";
import { Folder } from "../panel.style";
import { FFIcon, PlayPauseIcon, ShowHideIcon } from "./nav.svg";

// export function Rotate(resetButton, clip, snap) {
//   let rad = clip.mobile
//     ? -Math.atan(
//         state.grabberPosition.x / (-state.grabberPosition.y + (offset - 20))
//       )
//     : Math.atan(
//         (state.navPosition.x + 50) / (-state.navPosition.y + (offset - 150))
//       );

//   const deg = rad * (180 / Math.PI);
//   if (snap.dragged && resetButton.current) {
//     resetButton.current.style.transform = `rotate(${deg}deg)`;
//   }
// }

export function ResetPosButton() {
  const clip = useSnapshot(cloudPanel);
  const snap = useSnapshot(statePanel);
  const { dragged } = snap;

  // Rotate reset button
  //   useEffect(() => {
  //     Rotate(resetButton, clip, snap);
  //   }, [clip, resetButton, snap]);

  return (
    <>
      {dragged ? (
        <Folder
          // ref={resetButton}
          onClick={() => {
            statePanel.isOpt = false;
            statePanel.isPro = false;
            cloud.resetRate = Math.random() * (0.85 - 0.65) + 0.65;
            //   reset();
            //   nav.current.style.transition = "1.3s";
            statePanel.navPosition = { x: 0, y: 0 };
            statePanel.proPosition = { x: 0, y: 0 };
            statePanel.optPosition = { x: 0, y: 0 };
            statePanel.dragged = false;
            setTimeout(() => {
              // nav.current.style.transition = "0.1s";
              console.log("transition returned");
            }, 1300);
          }}
          className="trayIcon li"
        >
          <ShowHideIcon />
        </Folder>
      ) : null}
    </>
  );
}

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
