import { getMemberBio } from "@api/info.api";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export function MemberBio({ name }: { name: string }) {
  const [bio, setBio] = useState<string>("");

  useEffect(() => {
    (async () => setBio(await getMemberBio(name)))();
  }, [name]);

  return <ReactMarkdown>{bio}</ReactMarkdown>;
}
