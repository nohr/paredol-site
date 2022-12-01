"use client";
import "../styles/globals.css";
import React from "react";
import styles from "../styles/ui.module.scss";
import { Navigator } from "./(panels)/navigator";
import { Composition } from "./(comp)/Composition";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className={styles.Interface}>
          <Navigator />
          {children}
        </div>
        <Composition />
      </body>
    </html>
  );
}
