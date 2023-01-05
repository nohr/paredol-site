"use client";

import { SFXProvider } from "@context/sfx.context";
import Navbar from "@ui/navbar/navbar";
import { DocumentData } from "firebase/firestore/lite";
import { useEffect } from "react";
import { useMobile, useMotion, useTheme } from "utils";

export function Init({
  children,
  data,
}: {
  children: React.ReactNode;
  data: DocumentData;
}) {
  useEffect(() => {
    useTheme();
    useMobile();
    useMotion();
  }, []);

  return (
    <SFXProvider>
      <Navbar data={data} />
      {children}
    </SFXProvider>
  );
}
