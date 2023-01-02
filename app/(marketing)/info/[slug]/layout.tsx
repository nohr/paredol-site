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
      <div className=" h-min w-full">
        <Link
          href="/info"
          onClick={() => select()}
          className="fill link flex !w-min flex-row"
        >
          <IoIosArrowBack />
          Back
        </Link>
      </div>
      {children}
    </div>
  );
}
