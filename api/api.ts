export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 60,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore/lite";
import { state } from "state";
import { db } from "./firebase.config";

export async function getData(lot?: string) {
  state.loading = true;
  if (!lot) {
    const data = await getDocs(
      query(
        collection(db, "projects"),
        where("published", "==", true),
        orderBy("date", "desc")
      )
    );
    const snap = data.docs.map((doc) => doc.data());
    // remove the date property from each object in the array
    snap.map((doc: any) => {
      delete doc.date;
    });

    state.loading = false;
    return snap;
  } else {
    const data = await getDocs(
      query(
        collection(db, "projects"),
        where("published", "==", true),
        where("lot", "==", lot)
      )
    );
    const snap = data.docs.map((doc) => doc.data());
    // Serialize the date object to a string to prevent the error
    snap.map((doc: any) => {
      delete doc.date;
    });
    let [project] = snap;
    state.loading = false;
    return project;
  }
}

export async function getStore() {
  const data = await getDocs(collection(db, "store"));
  const snap = data.docs.map((doc) => doc.data());
  return snap;
}
