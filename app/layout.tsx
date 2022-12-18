"use client";

import React from "react";
import { ThemeProvider } from "styled-components";
import { useSnapshot } from "valtio";
import { state } from "../common/state";
import { GlobalStyles } from "../common/globals";
import { dark, light } from "../common/themes";
import Navbar from "../components/navbar/navbar";
import { Theme, useMobile, useMotion } from "../common/utils";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  Theme();
  useMobile();
  useMotion();

  const { theme } = useSnapshot(state);
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme === "light" ? light : dark}>
          <GlobalStyles />
          <Navbar />
          <div className="content">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
