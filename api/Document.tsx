"use client";
import React from "react";
import { getFirestore, doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { app } from "./firebase.config";

type Props = {
  path: string;
};

export const FirestoreDocument: React.FC<Props> = ({ path }) => {
  const [value, loading, error] = useDocument(
    doc(getFirestore(app), `projects`, path),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  return (
    <>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Document: Loading...</span>}
      </p>
      {value && <h1>{value.data()?.name}</h1>}
    </>
  );
};
