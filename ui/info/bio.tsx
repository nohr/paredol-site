"use client";

import { getBio } from "@api/info.api";
import { useEffect, useRef, useState } from "react";

export default function Bio() {
  const [bio, setBio] = useState("...");

  useEffect(() => {
    (async () => setBio(await getBio()))();
  }, []);

  return (
    <>
      <h1>The gist...</h1>
      <p>{bio}</p>
    </>
  );
}
