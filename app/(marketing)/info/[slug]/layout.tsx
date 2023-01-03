"use client";

import { AudioContext } from "@context/audio.context";
import Link from "next/link";
import { useContext } from "react";
import { IoIosArrowBack } from "react-icons/io";

export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { select } = useContext(AudioContext);
  return (
    <div className="flex !w-full flex-col">
      <div className=" flex h-full pb-32 md:mx-8 md:justify-center md:pb-0">
        {children}
      </div>
    </div>
  );
}
