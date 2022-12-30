"use client";

import { getRoster } from "@api/info.api";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Roster() {
  const [roster, setRoster] = useState<any>();

  useEffect(() => {
    (async () => setRoster(await getRoster()))();
  }, []);

  useEffect(() => {
    console.log(roster);
    // console.log(typeof roster);
  }, [roster]);
  return (
    <div>
      <h1>The roster...</h1>
      {roster &&
        Object.keys(roster).map((key) => (
          <div key={key}>
            <Link href={`info/${key}`}>{roster[key].name}</Link>
            {/* <p>{roster[key].bio}</p> */}
          </div>
        ))}
    </div>
  );
}
