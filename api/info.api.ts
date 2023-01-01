import { state } from "@common/state";
import { doc, getDoc } from "firebase/firestore/lite";
import { db } from "./firebase.config";

// export a function that fetches the bio from firestore
export async function getBio() {
  state.loading = true;
  const docRef = doc(db, "info", "site");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    state.loading = false;
    return docSnap.data().bio;
  }
}

// export a funnction that lists people from the roster document
export async function getRoster(name?: string) {
  state.loading = true;
  const docRef = doc(db, "info", "roster");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    state.loading = false;
    if (name) return docSnap.data()[`${name}`];
    else return docSnap.data();
  }
}

//
// export a function that fetches the email from firestore
export async function getEmail() {
  const docSnap = await getDoc(doc(db, "info", "site"));
  if (docSnap.exists()) {
    return docSnap.data().email;
  }
}
