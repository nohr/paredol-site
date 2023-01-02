import { state } from "state";
import { doc, getDoc } from "firebase/firestore/lite";
import { getBlob, getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "./firebase.config";

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
// export a function that fetches the site email from firestore
export async function getEmail() {
  const docSnap = await getDoc(doc(db, "info", "site"));
  if (docSnap.exists()) {
    return docSnap.data().email;
  }
}

// export a function that grabs the intonation from storage
export async function getIntonation(slug: string) {
  const url = await getDownloadURL(
    ref(storage, `info/roster/${slug}/intonation.mp3`)
  );
  return url;
}

// export a function that downloads a file from storage based on the member's name and returns the blob
export async function getMemberBio(name: string) {
  const blob = await getBlob(ref(storage, `info/roster/${name}/bio.md`));
  // read the blob as text
  const text = await blob.text();
  return text;
}
