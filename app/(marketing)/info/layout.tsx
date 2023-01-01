"use client";

import { useEffect } from "react";
import { getBio, getRoster } from "@api/info.api";
import { state } from "state";

export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    (async () => (state.bio = await getBio()))();
  }, []);

  useEffect(() => {
    (async () => (state.roster = await getRoster()))();
  }, []);

  return (
    <div className=" flex h-full w-full flex-col justify-center self-center py-2 md:!w-full lg:mx-24 lg:!w-[120ch]">
      {children}
    </div>
  );
}
