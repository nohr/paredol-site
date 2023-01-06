import React, { useRef } from "react";

export default function Load() {
  const ref = useRef<HTMLParagraphElement>(null!);
  const loaders = [
    "A moment please...",
    "Just a second...",
    "Setting up the magic...",
    "Are you ready?",
    "Why not give mum a ring while you wait?",
    "Nice to see you! 👁" + "👄" + "👁",
  ];

  const load = loaders[Math.floor(Math.random() * loaders.length)];

  if (ref.current) {
    ref.current.innerHTML = load;
  }

  return <p ref={ref} className="loading"></p>;
}
