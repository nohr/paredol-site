"use client";
import React from "react";
import { getFirestore, doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { app } from "../../firebase/config";

type Props = {
  page: string;
};

export const FirestoreDocument: React.FC<Props> = ({ page }) => {
  const [value, loading, error] = useDocument(
    doc(getFirestore(app), `projects`, page),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  return (
    <div>
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Document: Loading...</span>}
      </p>
      {value && <h1>{value.data()?.name}</h1>}
    </div>
  );
};
