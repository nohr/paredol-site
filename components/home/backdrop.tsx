"use client";

import styled, { useTheme } from "styled-components";
import { Wireframe } from "./home.svg";

export function Backdrop() {
  const { ui } = useTheme();

  return (
    <Slideshow>
      <Wireframe
        style={{
          justifySelf: "center",
          fill: ui.secondary,
          opacity: 0.1,
        }}
      />
    </Slideshow>
  );
}

// generate a random degree between 0 and 360
const randomDeg = () => Math.floor(Math.random() * 360);

const Slideshow = styled.div`
  &,
  & svg {
    display: flex;
    align-self: center;
    width: 120%;
    height: auto;
    position: fixed;
    pointer-events: none !important;
    top: 50%;
    transform: translateY(-50%) rotate(${randomDeg}deg);
  }
`;
