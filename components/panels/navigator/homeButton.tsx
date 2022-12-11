import React, { Ref, useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import styles from "./nav.module.scss";
// import Draggable from "react-draggable";
import Link from "next/link";
import { cloud, state } from "../../../common/state";
// import { activeTap, handleClick, unActiveTap } from "../common/utils";
// import { newQuote } from "../services/firebase.service";
import { LogoWrapper } from "../panel.style";
import HomeSVG from "./nav.svg";
// import Scrambler from "scrambling-text";

export function HomeButton({ dong, nabla }: { dong: any; nabla: Ref<any> }) {
  const svg = useRef(null);
  const snap = useSnapshot(state);
  const clip = useSnapshot(cloud);

  return (
    <Link
      href="/"
      //   onClick={() => handleClick(clip, dong, nabla, svg)}
      //   onMouseDown={() => !clip.talking && activeTap(nabla, svg)}
      //   onMouseUp={() => !clip.talking && unActiveTap(nabla, svg)}
      //   onTouchStart={() => !clip.talking && activeTap(nabla, svg)}
      //   onTouchEnd={() => !clip.talking && unActiveTap(nabla, svg)}
    >
      <LogoWrapper
        // style={
        //   snap.drag
        //     ? { backgroundColor: ({ theme }) => theme. }
        //     : { backgroundColor: "transparent" }
        // }
        ref={nabla}
      >
        <HomeSVG nodeRef={svg} />
      </LogoWrapper>
    </Link>
  );
}

export function Quote() {
  const quote = useRef(null);
  // const scramble = useRef(new Scrambler());
  const snap = useSnapshot(state);
  const clip = useSnapshot(cloud);

  const [text, setText] = useState<string>(clip.quote);

  // useEffect(() => {
  //   !cloud.CanvasLoading &&
  //     newQuote().then(() =>
  //       scramble.current.scramble(cloud.quote, setText, {
  //         characters: characters,
  //       })
  //     );
  // }, [setText, clip.quote]);

  // if (clip.mobile) {
  //   return (
  //     //   <Draggable
  //     //     nodeRef={quote}
  //     //     bounds=".mobileNav"
  //     //     position={snap.grabberPosition}
  //     //     axis="x"
  //     //   >
  //     <div className={styles.quote}>
  //       <div>{text}</div>
  //     </div>
  //     //   </Draggable>
  //   );
  // } else {
  return <div className={styles.quote}>{text}</div>;
  // }
}

const characters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  ".",
  "!",
  "?",
  " ",
  " ",
  " ",
  " ",
  " ",
];
