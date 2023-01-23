"use client";

import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { TfiAngleRight, TfiNewWindow } from "react-icons/tfi";
import { motion } from "framer-motion";
import { SFXContext } from "context/sfx";
export function RosterLink({ member }: any) {
  const { select } = useContext(SFXContext);
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.1 },
      }}
    >
      <Link
        key={member.key}
        onClick={() => select()}
        href={member.url ? member.url : `/info/${member.key}`}
        target={member.url ? "_blank" : "_self"}
        className="fill link !flex !w-full flex-row gap-x-3 self-center justify-self-center !border-0 !p-3 md:self-start"
      >
        <div className="relative aspect-square h-auto w-20 overflow-hidden rounded-md shadow-md">
          <Image
            src={member?.photo}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
            alt={member.name}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <p className="h-fit w-full font-bold">{member.name}</p>
          <p className="h-fit w-full text-xs italic">{member.role}</p>
        </div>
        {member.url ? (
          <TfiNewWindow className="h-4 w-auto" />
        ) : (
          <TfiAngleRight className="h-4 w-auto" />
        )}
      </Link>
    </motion.div>
  );
}
