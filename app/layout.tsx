// These styles apply to every route in the application
import "../styles/globals.css";
import React from "react";
import { Navigator } from "./(panels)/navigator";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navigator />
        {children}
      </body>
    </html>
  );
}
