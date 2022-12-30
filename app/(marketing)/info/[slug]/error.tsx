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
    <div className="error">
      <h1>ERROR</h1>
      <pre>{error.message}</pre>
      <button onClick={reset}>RESET</button>
    </div>
  );
}
