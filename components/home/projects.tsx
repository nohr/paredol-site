"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getData } from "../../api/firebase.api";
import { state } from "../../common/state";

function Projects() {
  const [projects, setProjects] = useState<any>();

  useEffect(() => {
    getData().then((data) => setProjects(data));
  }, []);

  // handle d3 circle packing
  // const svg = React.useRef(null);

  if (projects !== undefined) {
    state.loading = false;
  }
  return (
    <>
      {/* <svg ref={svg} /> */}
      {projects ? (
        projects.map((doc: any, index: number) => (
          <Link key={index} href={doc.lot} className="w-fit">
            {doc.name}
          </Link>
        ))
      ) : (
        <p>Loading projects...</p>
      )}
    </>
  );
}

export default Projects;
