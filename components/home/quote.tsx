"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { getQuote } from "../../api/firebase.api";
import { state } from "../../common/state";
const Scrambler = require("scrambling-text");

export function Quote() {
  const scramble = useRef(new Scrambler());
  const [text, setText] = useState<string>(state.quote);
  const { motion, quote } = useSnapshot(state);

  useEffect(() => {
    getQuote().then((res) =>
      scramble.current.scramble(res, setText, {
        characters: characters,
      })
    );
  }, [quote, setText]);

  return (
    <h1
    className={`text-5xl ${!motion ? "animate-[quotescroll_7s_linear_infinite] w-max" : "whitespace-pre-wrap"}`}
    >
      {text}
    </h1>
  );
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
