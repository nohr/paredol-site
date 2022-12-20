"use client";

import { User, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { state } from "../common/state";
import { auth, db } from "./firebase.config";

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
        where("lot", "==", lot),
        orderBy("date", "desc")
      )
    );
    let [project] = data.docs.map((doc) => doc.data());
    state.loading = false;
    return project;
  }
}

export async function getQuote() {
  const docRef = doc(db, "info", "site");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let quotes = docSnap.data().quotes;
    const random = Math.floor(Math.random() * quotes.length);
    return await quotes[random];
  }
}

// fetch songs collection from firestore and order them by the index
export async function getSongs() {
  const data = await getDocs(
    query(collection(db, "songs"), orderBy("index", "asc"))
  );
  return data.docs.map((doc) => doc.data());
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, [auth, setUser]);

  return user;
}
