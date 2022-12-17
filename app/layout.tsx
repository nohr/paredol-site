"use client";

import React, { useEffect } from "react";
import Interface from "./components/interface/Interface";
import { ThemeProvider } from "styled-components";
import { useSnapshot } from "valtio";
import { cloud, state } from "../common/state";
import { GlobalStyles } from "./globals";
import { dark, light } from "./themes";
import { Composition } from "./(canvas)/comp";
import { getFirestore, collection, query, where } from "firebase/firestore";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { app } from "../firebase/config";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const collectionRef = collection(getFirestore(app), "projects");
  const [value, loading, error] = useCollectionOnce(
    query(collectionRef, where("published", "==", true))
  );
  cloud.projects = value?.docs.map((doc) => doc.data());

  // Check for dark mode preference
  const { theme } = useSnapshot(state);
  useEffect(() => {
    if (typeof window !== "undefined") {
      state.theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
  }, []);

  if (typeof window !== "undefined") {
    // Client-side-only code
    cloud.mobile = window.matchMedia("(max-width: 768px)").matches;

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        state.theme = event.matches ? "dark" : "light";
      });
  }

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme === "light" ? light : dark}>
          <GlobalStyles />
          <Interface children={children} />
        </ThemeProvider>
      </body>
    </html>
  );
}
