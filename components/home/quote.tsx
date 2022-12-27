"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { getQuote } from "../../api/firebase.api";
import { state } from "../../common/state";
const Scrambler = require("scrambling-text");

function Quote() {
  const scramble = useRef(new Scrambler());
  const [text, setText] = useState<string>(state.quote);
  const { motion, quote, theme } = useSnapshot(state);

  useEffect(() => {
    getQuote().then((res) => {
      state.quote = res;
      scramble.current.scramble(res, setText, {
        characters: characters,
      });
    });
  }, [setText, theme]);

  useEffect(() => {
    return () => {
      state.quote = "";
    };
  }, []);
  return (
    <h1
      className={`text-5xl  ${
        !motion
          ? "w-full animate-[autoscroll_7s_linear_infinite] whitespace-nowrap will-change-transform"
          : "animate-none whitespace-pre-wrap"
      }`}
    >
      {motion ? quote : text}
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
