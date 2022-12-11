"use client";

import React from "react";
import Composition from "../canvas/Composition";
import Interface from "./Interface";
import { ThemeProvider } from "styled-components";
import { useSnapshot } from "valtio";
import { state } from "../common/state";
import { GlobalStyles } from "../styles/globals";
import { dark, light } from "../styles/themes";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { canvas, theme } = useSnapshot(state);

  window.addEventListener("color-scheme-changed", (e) => {
    console.log(e);
  });

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme === "light" ? light : dark}>
          <GlobalStyles />
          <Interface children={children} />
          {canvas ? <Composition /> : null}
        </ThemeProvider>
      </body>
    </html>
  );
}
