"use client";

import Link from "next/link";
import { state } from "state";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { Program } from "@ui/program";
import { motion } from "framer-motion";
import { SFXContext } from "context/sfx";

export default function ProjectLink({ doc }: any) {
  const { confirm } = useContext(SFXContext);
  useEffect(() => {
    state.loading = false;
  }, []);

  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.1 },
      }}
    >
      <Link
        onClick={() => confirm()}
        href={doc.lot}
        className="fade-transition group relative my-2 flex h-[160px] w-full flex-row justify-between overflow-hidden rounded-3xl border-[1px] border-transparent p-3 active:border-blue-900 active:dark:border-blue-200 md:hover:border-blue-900  md:hover:shadow-lg md:hover:dark:border-blue-200"
      >
        <div className="flex h-full w-max flex-col justify-between gap-y-4 rounded-xl bg-opacity-20 p-3 backdrop-blur-xl group-hover:bg-zinc-300 dark:group-hover:bg-zinc-700 ">
          <div className="flex flex-col items-start">
            <h3 className="white-space-pre w-max text-xl font-thin">
              {doc.name}
            </h3>
            <p className="text-xs uppercase">{doc.category}</p>
          </div>
          <Program program={doc.program} setProgram={undefined} />
        </div>
        {doc.cover !== "" && (
          // <div className="relative aspect-square h-full w-[160px] overflow-hidden rounded-xl shadow-lg">
          <Image
            priority
            src={doc.cover}
            fill
            alt={doc.name}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover", zIndex: -100 }}
            className="rounded-3xl opacity-30 group-hover:opacity-80"
          />
          // </div>
        )}
      </Link>
    </motion.div>
  );
}
