"use client";

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useSnapshot } from "valtio";
import { getQuote } from "../../api/firebase.api";
import { state } from "../../common/state";
const Scrambler = require("scrambling-text");

const QuoteHeader = styled.h1<{
  animate?: string;
}>`
  ${({ animate }) => animate}

  @keyframes quotescroll {
    from {
      transform: translate3d(50%, 0, 0);
    }
    to {
      transform: translate3d(-90%, 0, 0);
    }
  }
`;

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
    <QuoteHeader
      animate={
        !motion
          ? "animation: quotescroll 7s linear infinite; width: max-content;"
          : "white-space: pre-wrap !important;"
      }
    >
      {text}
    </QuoteHeader>
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
