"use client";

import React from "react";
import { getFirestore, collection, query, where } from "firebase/firestore";
import {
  useCollection,
  useCollectionOnce,
} from "react-firebase-hooks/firestore";
import { app } from "../firebase/config";
import { Path } from "../components/panels/panel.style";
import { usePathname } from "next/navigation";
import { useTheme } from "styled-components";

const ProjectsCollection = () => {
  const collectionRef = collection(getFirestore(app), "projects");
  const [value, loading, error] = useCollectionOnce(
    query(collectionRef, where("published", "==", true))
  );
  const pathname = usePathname();
  const theme = useTheme();

  const active = `background-color: ${theme.colors.active};
  color: #ebebeb;
  -webkit-box-shadow: 0px 2px 10px 1px ${theme.colors.active};
  -moz-box-shadow: 0px 2px 10px 1px ${theme.colors.active};
  box-shadow: 0px 2px 10px 1px ${theme.colors.active};
  text-shadow: 1px 1px 3px #ebebeb;`;

  return (
    <>
      {error && (
        <p>
          <strong>Error: {JSON.stringify(error)}</strong>
        </p>
      )}
      {loading && <p>Loading...</p>}
      {value && (
        <>
          {value.docs.map((doc, index) => (
            <Path
              key={index}
              width="80%"
              href={doc.id}
              active={pathname?.substring(1) === doc.id ? active : undefined}
            >
              {doc.data().name}
            </Path>
          ))}
        </>
      )}
    </>
  );
};

export default ProjectsCollection;
