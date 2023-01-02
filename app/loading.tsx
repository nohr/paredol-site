"use client";

import { useEffect } from "react";
import { state } from "state";

export default function Loading() {
  useEffect(() => {
    state.loading = true;

    return () => {
      state.loading = false;
    };
  }, []);

  return (
    <>
      <p>Loading...</p>
      <div className="htmlSpinner">
        {/* <div className="gugmu9vdpaw">
          <div></div>
        </div> */}
      </div>
    </>
  );
}
