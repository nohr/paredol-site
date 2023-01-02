"use client";

import Link from "next/link";
import { useSnapshot } from "valtio";
import { state } from "state";
import { useContext } from "react";
import { AudioContext } from "@context/audio.context";

function Projects() {
  const { data } = useSnapshot(state);
  const { select } = useContext(AudioContext);
  // handle d3 circle packing
  // const svg = React.useRef(null);

  if (data.length === 0) return <p>Loading projects...</p>;
  else {
    state.loading = false;
    return (
      <>
        {/* <svg ref={svg} /> */}
        {data.map((doc: any, index: number) => (
          <Link
            onClick={() => select()}
            key={index}
            href={doc.lot}
            className="w-fit"
          >
            {doc.name}
          </Link>
        ))}
      </>
    );
  }
}

export default Projects;
