import { db, storage } from "@api/firebase.config";
import { doc, getDoc } from "firebase/firestore/lite";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import Image from "next/image";
import { Suspense } from "react";
import { CgSpinner } from "react-icons/cg";

async function getName() {
  const docRef = doc(db, "info", "site");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().name;
  }
}

async function getImages() {
  const listRef = ref(storage, "info/name");
  const list = await listAll(listRef).then((res) => res.items);
  const urls = await Promise.all(
    list.map(async (itemRef) => {
      return await getDownloadURL(itemRef);
    })
  );
  return urls;
}

export default async function Name() {
  const name = await getName();
  const list = await getImages();
  const images = list.sort(() => Math.random() - 0.5).slice(0, 5);
  setInterval(() => {
    const first = images.shift() as string;
    images.push(first);
  }, 5000);

  return (
    <div className="flex flex-col gap-y-2  p-3 md:w-[65ch]">
      <h1 className="title self-center md:self-start">The name...</h1>
      <div className="flex h-full w-full flex-row justify-around gap-x-4">
        <Suspense fallback={<CgSpinner className="h-8 w-auto animate-spin" />}>
          {images.map((url) => (
            <Image
              key={url}
              src={url}
              width={200}
              height={200}
              alt="name"
              className="!aspect-square h-20 w-auto select-none self-center rounded-md shadow-md"
            />
          ))}
        </Suspense>
      </div>
      <div className="flex h-full w-full justify-center">
        <Suspense fallback={<CgSpinner className="h-8 w-auto animate-spin" />}>
          <p className="p-1 font-semibold first-letter:float-left first-letter:pr-2 first-letter:font-serif first-letter:text-7xl first-letter:font-extralight first-letter:text-red-500">
            {name}
          </p>
        </Suspense>
      </div>
    </div>
  );
}
