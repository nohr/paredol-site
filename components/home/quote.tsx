"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { getQuote } from "../../api/firebase.api";
import { state } from "../../common/state";
const Scrambler = require("scrambling-text");

function Quote() {
  const ref = useRef<HTMLHeadingElement>(null!);
  const scramble = useRef(new Scrambler());
  const [text, setText] = useState<string>(state.quote);
  const { motion, quote, theme } = useSnapshot(state);

  useEffect(() => {
    getQuote().then((res) => {
      state.quote = res;
      !motion &&
        scramble.current.scramble(res, setText, {
          characters: characters,
        });
    });
  }, [setText]);

  useEffect(() => {
    motion
      ? setText(quote)
      : scramble.current.scramble(quote, setText, {
          characters: characters,
        });
  }, [quote, motion, theme]);

  useEffect(() => {
    !motion
      ? ref.current.classList.add(
          "w-full",
          "animate-[autoscroll_7s_linear_infinite]",
          "whitespace-nowrap",
          "will-change-transform"
        )
      : ref.current.classList.remove(
          "w-full",
          "animate-[autoscroll_7s_linear_infinite]",
          "whitespace-nowrap",
          "will-change-transform"
        );

    motion
      ? ref.current.classList.add("animate-none", "whitespace-pre-wrap")
      : ref.current.classList.remove("animate-none", "whitespace-pre-wrap");
  }, [motion, quote]);

  useEffect(() => {
    return () => {
      state.quote = "";
    };
  }, []);
  return (
    <h1 ref={ref} className={`text-5xl`}>
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
