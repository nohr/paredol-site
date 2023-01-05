"use client";

import { SFXProvider } from "@context/sfx.context";
import Navbar from "@ui/navbar/navbar";
import { useEffect } from "react";
import { useMobile, useMotion, useTheme } from "utils";

export function Init({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    useTheme();
    useMobile();
    useMotion();
  }, []);

  return (
    <SFXProvider>
      <Navbar />
      {children}
    </SFXProvider>
  );
}
