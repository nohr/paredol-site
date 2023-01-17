import { db } from "@api/firebase.config";
import { doc, getDoc } from "firebase/firestore/lite";
import { Suspense } from "react";
import { CgSpinner } from "react-icons/cg";

async function getName() {
  const docRef = doc(db, "info", "site");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().name;
  }
}

export default async function Name() {
  const name = await getName();

  return (
    <div className="flex flex-col gap-y-2  p-3 md:w-[65ch]">
      <h1 className="title self-center md:self-start">The name...</h1>
      <div className="flex h-full w-full justify-center">
        <Suspense fallback={<CgSpinner className="h-8 w-auto animate-spin" />}>
          <p className="p-1 font-semibold first-letter:float-left first-letter:pr-2 first-letter:font-serif first-letter:text-7xl first-letter:font-extralight first-letter:italic first-letter:text-red-500">
            {name}
          </p>
        </Suspense>
      </div>
    </div>
  );
}
