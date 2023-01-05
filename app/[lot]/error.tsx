"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="error w-full p-2">
      <h1>ERROR</h1>
      <pre className="w-full">{error.message}</pre>
      <button onClick={reset}>RESET</button>
    </div>
  );
}
