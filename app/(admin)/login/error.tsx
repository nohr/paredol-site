"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="error">
      <h1>ERROR</h1>
      <pre>{error.message}</pre>
      <button onClick={reset}>RESET</button>
    </div>
  );
}
