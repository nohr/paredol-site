"use client";

import { DocumentData } from "@firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { state } from "../common/state";
import { getData, getQuote } from "../api/firebase.api";
import { Wireframe } from "../components/home/home.svg";
import { useTheme } from "styled-components";

export default function HomePage() {
  const [quote, setQuote] = useState("");
  const [projects, setProjects] = useState<DocumentData | undefined>();
  const { motion, theme } = useSnapshot(state);
  const { ui } = useTheme();
  useEffect(() => {
    (async () => {
      setQuote(await getQuote());
      setProjects(await getData());
    })();
  }, []);

  // handle d3 circle packing
  // const svg = React.useRef(null);
  state.loading = false;
  return (
    <div
      id="chart"
      style={quote !== "" ? { display: "block" } : { display: "none" }}
    >
      <h1
        style={
          motion ? undefined : { animation: "autoscroll 7s linear infinite" }
        }
      >
        {quote}
      </h1>
      <Wireframe
        style={{
          justifySelf: "center",
          fill: ui.secondary,
          opacity: 0.1,
        }}
      />
      {/* <svg ref={svg} /> */}
      {projects &&
        projects.map((doc: DocumentData, index: number) => (
          <Link key={index} href={doc.lot}>
            {doc.name}
          </Link>
        ))}
    </div>
  );
}

// export function Quote() {
//   const quote = useRef(null);
//   // const scramble = useRef(new Scrambler());
//   const snap = useSnapshot(state);
//   const clip = useSnapshot(state);

//   const [text, setText] = useState<string>(clip.quote);

//   // useEffect(() => {
//   //   !state.CanvasLoading &&
//   //     newQuote().then(() =>
//   //       scramble.current.scramble(state.quote, setText, {
//   //         characters: characters,
//   //       })
//   //     );
//   // }, [setText, clip.quote]);

//   // if (clip.mobile) {
//   //   return (
//   //     //   <Draggable
//   //     //     nodeRef={quote}
//   //     //     bounds=".mobileNav"
//   //     //     position={snap.grabberPosition}
//   //     //     axis="x"
//   //     //   >
//   //     <div className={styles.quote}>
//   //       <div>{text}</div>
//   //     </div>
//   //     //   </Draggable>
//   //   );
//   // } else {
//   return <div className={styles.quote}>{clip.quote}</div>;
//   // }
// }

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
