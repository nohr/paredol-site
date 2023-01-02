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
      {/* back bar */}
      <div className="fixed hidden h-min w-full md:flex">
        <Link
          href="/info"
          onClick={() => select()}
          className="fill link flex !w-min flex-row"
        >
          <IoIosArrowBack />
          Back
        </Link>
      </div>
      <div className=" flex h-full pb-32 md:justify-center md:pt-9 md:pb-0 lg:mx-24">
        {children}
      </div>
    </div>
  );
}
