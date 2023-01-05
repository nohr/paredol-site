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
    state.loading = false;
    return data.docs.map((doc) => doc.data());
  } else {
    const data = await getDocs(
      query(
        collection(db, "projects"),
        where("published", "==", true),
        where("lot", "==", lot)
      )
    );
    let [project] = data.docs.map((doc) => doc.data());
    state.loading = false;
    return project;
  }
}
