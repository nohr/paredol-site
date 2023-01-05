import React from "react";
import { state } from "state";

export default function NotFound() {
  state.loading = false;
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className=" !text-9xl font-black">404</h1>
      <p className="text-xl font-thin italic">Couldn't find that project!</p>
    </div>
  );
}
