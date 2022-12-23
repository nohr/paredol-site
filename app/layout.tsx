"use client";

import "../common/index.css";
import React from "react";
import { ThemeProvider } from "styled-components";
import { useSnapshot } from "valtio";
import { state } from "../common/state";
import { GlobalStyles } from "../common/globals";
import { dark, light } from "../common/themes";
import Navbar from "../components/navbar/navbar";
import { Theme, useMobile, useMotion } from "../common/utils";
import { Container } from "../components/container/page.style";
import Load from "../components/container/loader";

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
          <Load />
          <Navbar />
          <Container>{children}</Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
