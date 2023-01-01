"use client";

import Link from "next/link";
import { getRoster } from "@api/info.api";
import { state } from "state";
import { useEffect, useState } from "react";
import { BsGithub, BsSpotify, BsLinkedin } from "react-icons/bs";
import { HiSpeakerWave } from "react-icons/hi2";

export interface PageProps {
  params?: { slug: string };
  searchParams?: any;
}

export default function Page({ params, searchParams }: PageProps) {
  const slug = params?.slug;
  const id = searchParams?.id;
  // create a name variable and grab the name from the database using the slug
  const [member, setMember] = useState<any>();

  useEffect(() => {
    (async () => setMember(await getRoster(slug)))();
  }, []);

  // get the intonation from the database and play it with the audio tag
  const play = () => {
    const audio = new Audio(member?.intonation);
    audio.play();
    audio.addEventListener("loadstart", () => (state.loading = true));
    audio.addEventListener("loadeddata", () => (state.loading = false));
  };

  return (
    <>
      {member && (
        <div className="flex flex-row gap-x-4">
          <div className="flex flex-col gap-y-4">
            <div className="flex w-fit flex-row items-center gap-x-2">
              <h1 className="title whitespace-nowrap">{member?.name}</h1>
              {member?.intonation ? (
                <HiSpeakerWave
                  className="link fill !h-auto !w-8  !cursor-pointer"
                  title="Pronounce"
                  onClick={() => play()}
                />
              ) : null}
            </div>
            <div className="flex flex-row gap-x-2">
              <div
                style={{
                  backgroundImage: `url(${member?.photo})`,
                  backgroundSize: "120%",
                  backgroundPosition: "center",
                }}
                className="aspect-square w-60 rounded-md shadow-md"
              ></div>
              <div className="flex flex-col gap-y-1">
                <p className="font-thin italic">{member?.role}</p>
                <p>{member?.email}</p>
                {member?.links && (
                  <div className="flex w-full flex-row items-center gap-x-2">
                    {member?.links.map((link: any) => (
                      <GetIcon
                        className="fade-transition hover:opacity-50"
                        link={link}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <p className="text-base font-thin">{member?.bio}</p>
        </div>
      )}
      {searchParams && <p>{searchParams.id}</p>}
    </>
  );
}

//export a function that accepts a link and returns the icon
function GetIcon({ link, className }: { link: string; className?: string }) {
  return (
    <Link href={link} target="_blank" className="">
      {link.includes("github") ? (
        <BsGithub className={className} />
      ) : link.includes("linkedin") ? (
        <BsLinkedin className={className} />
      ) : link.includes("spotify") ? (
        <BsSpotify className={className} />
      ) : null}
    </Link>
  );
}
