"use client";

import { DocumentData } from "@firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { state } from "../common/state";
import { getData, getQuote } from "../firebase/api";

export default function HomePage() {
  const [quote, setQuote] = useState("");
  const [projects, setProjects] = useState<DocumentData | undefined>();
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
      <h1>{quote}</h1>
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
