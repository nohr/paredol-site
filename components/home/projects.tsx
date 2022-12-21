"use client";

import { DocumentData } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getData } from "../../api/firebase.api";
import { state } from "../../common/state";

export function Projects() {
  const [projects, setProjects] = useState<DocumentData | undefined>();

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
      {projects &&
        projects.map((doc: DocumentData, index: number) => (
          <Link key={index} href={doc.lot}>
            {doc.name}
          </Link>
        ))}
    </>
  );
}
