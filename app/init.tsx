"use client";

import { SFXProvider } from "@context/sfx.context";
import Navbar from "@ui/navbar/navbar";
import { DocumentData } from "firebase/firestore/lite";
import { useMobile, useEnableMotion, useTheme } from "utils";

export function Init({
  children,
  data,
}: {
  children: React.ReactNode;
  data: DocumentData;
}) {
  useTheme();
  useMobile();
  useEnableMotion();

  return (
    <SFXProvider>
      <Navbar data={data} />
      {children}
    </SFXProvider>
  );
}
