"use client";

import "../styles/globals.css";
import React from "react";
import { ThemeProvider } from "styled-components";
import { useSnapshot } from "valtio";
import { state } from "../common/state";
import { dark, light } from "../common/themes";
import Navbar from "../components/navbar/navbar";
import { useTheme, useMobile, useMotion } from "../common/utils";
// import Load from "../components/container/loader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useTheme();
  useMobile();
  useMotion();

  const { theme } = useSnapshot(state);

  return (
    <html lang="en">
      <body className="overflow-x-hidden bg-white text-blue-900 selection:bg-blue-900 selection:bg-opacity-60 selection:text-white dark:bg-black dark:text-blue-200 dark:selection:bg-blue-200  selection:dark:bg-opacity-60 dark:selection:text-black">
        <ThemeProvider theme={theme === "light" ? light : dark}>
          {/* <Load /> */}
          <Navbar />
          <div className="flex h-full w-full flex-col justify-start p-[10px] md:py-0 md:px-[10px] md:pt-[68px]">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
