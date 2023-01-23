"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { getQuote } from "@api/firebase.api";
import { state } from "state";

function Quote() {
  const ref = useRef<HTMLHeadingElement>(null!);
  const scramble = useRef<any>();
  const [text, setText] = useState<string>(state.quote);
  const { enableMotion, quote, theme, speech } = useSnapshot(state);

  // import Scrambler from "scrambling-text" dynamically
  useEffect(() => {
    import("scrambling-text").then((Scrambler) => {
      scramble.current = new Scrambler.default();
    });
  }, []);

  useEffect(() => {
    getQuote()
      .then((res) => {
        state.quote = res;
        !enableMotion &&
          scramble.current?.scramble(res, setText, {
            characters: characters,
          });
      })
      .catch((err) => console.log(err));
  }, [setText, enableMotion]);
  //  FIXME: Rescramble only once when the speech var is true instead of twice in the useEffect above
  useEffect(() => {
    speech &&
      getQuote()
        .then((res) => {
          state.quote = res;
          scramble.current?.scramble(res, setText, {
            characters: characters,
          });
        })
        .catch((err) => console.log(err));
  }, [setText, speech]);

  useEffect(() => {
    enableMotion
      ? setText(quote)
      : scramble.current?.scramble(quote, setText, {
          characters: characters,
        });
  }, [quote, enableMotion, theme]);

  useEffect(() => {
    // !enableMotion
    //   ? ref.current.classList.add(
    //       "w-screen",
    //       "animate-[autoscroll_7s_linear_infinite]",
    //       "whitespace-nowrap",
    //       "will-change-transform"
    //     )
    //   : ref.current.classList.remove(
    //       "w-screen",
    //       "animate-[autoscroll_7s_linear_infinite]",
    //       "whitespace-nowrap",
    //       "will-change-transform"
    //     );

    // enableMotion
    //   ?
    ref.current.classList.add("animate-none", "whitespace-pre-wrap");
    // : ref.current.classList.remove("animate-none", "whitespace-pre-wrap");
  }, [enableMotion, quote]);

  useEffect(() => {
    return () => {
      state.quote = "...";
    };
  }, []);
  return (
    <h1 ref={ref} className={`title`}>
      {text}
    </h1>
  );
}

export default Quote;

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
