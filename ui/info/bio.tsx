"use client";

import { CgSpinner } from "react-icons/cg";
import { state } from "state";
import { useSnapshot } from "valtio";

export default function Bio() {
  const { bio } = useSnapshot(state);

  return (
    <div className="flex flex-col gap-y-2  p-3 md:w-[65ch]">
      <h1 className="title self-center md:self-start">The gist...</h1>
      <div className="flex h-full w-full justify-center">
        {bio! !== "..." ? (
          <p className="p-1 font-semibold first-letter:float-left first-letter:pr-2 first-letter:font-serif first-letter:text-7xl first-letter:font-extralight first-letter:italic first-letter:text-red-500">
            {bio}
          </p>
        ) : (
          <CgSpinner className="!flex h-8 w-auto animate-spin self-center" />
        )}
      </div>
    </div>
  );
}
