"use client";
import React from "react";
import { getFirestore, collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { app } from "../firebase/config";
import Link from "next/link";

export const FirestoreCollection = () => {
  const collectionRef = collection(getFirestore(app), "projects");
  const [value, loading, error] = useCollection(
    query(collectionRef, where("published", "==", true)),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  return (
    <div>
      {error && (
        <p>
          <strong>Error: {JSON.stringify(error)}</strong>
        </p>
      )}
      {loading && <p>Collection: Loading...</p>}
      {value && (
        <>
          {value.docs.map((doc) => (
            <React.Fragment key={doc.id}>
              <h3>
                <Link href={doc.id} target="_self">
                  {doc.data().name}
                </Link>
              </h3>
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
};
