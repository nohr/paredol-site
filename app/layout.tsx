"use client";

import { Navigator } from "./(panels)/navigator";
import { Composition } from "./comp";

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Nav and Panels */}
        <Navigator />
        {children}
        <Composition />
      </body>
    </html>
  );
}
