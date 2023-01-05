"use client";

import { storage } from "@api/firebase.config";
import { getBlob, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

// export a function that downloads a file from storage based on the member's name and returns the blob
export async function getMemberBio(name: string) {
  const blob = await getBlob(ref(storage, `info/roster/${name}/bio.md`));
  // read the blob as text
  const text = await blob.text();
  return text;
}

export function MemberBio({ bio, name }: { bio: string; name: string }) {
  const [mdBio, setMdBio] = useState(bio);

  useEffect(() => {
    (async () => setMdBio(await getMemberBio(name)))();
  }, []);

  return (
    <div className="flex h-full flex-col gap-y-4 overflow-y-scroll font-bold md:w-[65ch] md:justify-start md:pb-0 lg:mx-0 lg:justify-center">
      <h3 className="subTitle">Bio</h3>
      {/* Display bio from firestore db or storage md file */}
      {bio ? <p>{bio}</p> : <ReactMarkdown>{mdBio}</ReactMarkdown>}
    </div>
  );
}
