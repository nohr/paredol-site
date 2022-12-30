"use client";

import Link from "next/link";
import { useSnapshot } from "valtio";
import { state } from "state";

function Projects() {
  const { data } = useSnapshot(state);

  // handle d3 circle packing
  // const svg = React.useRef(null);

  if (data.length === 0) return <p>Loading projects...</p>;
  else {
    state.loading = false;
    return (
      <>
        {/* <svg ref={svg} /> */}
        {data.map((doc: any, index: number) => (
          <Link key={index} href={doc.lot} className="w-fit">
            {doc.name}
          </Link>
        ))}
      </>
    );
  }
}

export default Projects;
