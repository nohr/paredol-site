"use client";

import Link from "next/link";
import { useSnapshot } from "valtio";
import { state } from "state";
import { useContext, useEffect, useRef } from "react";
import { AudioContext } from "@context/audio.context";

function Projects() {
  const { data } = useSnapshot(state);
  const { confirm } = useContext(AudioContext);

  if (data.length === 0) return <p>Loading projects...</p>;
  else {
    state.loading = false;
    return (
      <div className="overflow-y-scroll pb-24 md:pb-0 lg:mx-[10rem] xl:mx-[20rem]">
        {data.map((doc: any, index: number) => (
          <Link
            onClick={() => confirm()}
            key={index}
            href={doc.lot}
            className="flex h-[160px] w-full flex-row justify-between rounded-lg bg-opacity-50  p-2 md:hover:bg-blue-900 md:hover:bg-opacity-50  md:hover:text-white md:hover:dark:bg-blue-200 md:hover:dark:bg-opacity-50 md:hover:dark:text-black"
          >
            <div className="flex h-full flex-col justify-start">
              <h3 className="text-xl font-thin">{doc.name}</h3>
              <p className="text-xs uppercase">{doc.category}</p>
            </div>
            <div
              style={{
                backgroundImage: `url(${doc.cover})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              className="aspect-square h-full w-[160px] rounded-xl bg-center bg-no-repeat"
            ></div>
          </Link>
        ))}
      </div>
    );
  }
}

export default Projects;
