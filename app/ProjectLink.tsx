"use client";

import Link from "next/link";
import { state } from "state";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { SFXContext } from "@context/sfx.context";

export default function ProjectLink({ doc }: any) {
  const { confirm } = useContext(SFXContext);
  useEffect(() => {
    state.loading = false;
  }, []);

  return (
    <>
      <Link
        onClick={() => confirm()}
        href={doc.lot}
        className="fade-transition my-2 flex h-[160px] w-full flex-row justify-between rounded-xl bg-opacity-50 p-2 md:hover:bg-blue-900 md:hover:bg-opacity-50 md:hover:text-white md:hover:shadow-lg md:hover:dark:bg-blue-200 md:hover:dark:bg-opacity-50 md:hover:dark:text-black"
      >
        <div className="flex h-full flex-col justify-start">
          <h3 className="text-xl font-thin">{doc.name}</h3>
          <p className="text-xs uppercase">{doc.category}</p>
        </div>
        <div className="relative aspect-square h-full w-[160px] overflow-hidden rounded-xl shadow-lg">
          <Image
            priority
            src={doc.cover}
            fill
            alt={doc.name}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </Link>
    </>
  );
}
