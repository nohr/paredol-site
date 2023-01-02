"use client";

import Link from "next/link";
import { getIntonation, getRoster } from "@api/info.api";
import { state } from "state";
import { useContext, useEffect, useState } from "react";
import { BsGithub, BsSpotify, BsLinkedin } from "react-icons/bs";
import { HiSpeakerWave } from "react-icons/hi2";
import { SiMaildotru } from "react-icons/si";
import { MemberBio } from "@ui/info/member/member.bio";
import { AudioContext } from "@context/audio.context";
import { useSnapshot } from "valtio";
import { CgSpinner } from "react-icons/cg";

export interface PageProps {
  params: { slug: string };
  searchParams?: any;
}

export default function Page({ params, searchParams }: PageProps) {
  const slug = params.slug;
  const id = searchParams?.id;
  // create a name variable and grab the name from the database using the slug
  const [member, setMember] = useState<any>();
  const { loading } = useSnapshot(state);

  useEffect(() => {
    (async () => setMember(await getRoster(slug)))();
  }, []);

  // get the intonation from the database and play it with the audio tag
  const play = async () => {
    const audio = new Audio(await getIntonation(slug));
    audio.play();
    audio.addEventListener("loadstart", () => (state.loading = true));
    audio.addEventListener("loadeddata", () => (state.loading = false));
  };

  const { reset } = useContext(AudioContext);
  return (
    <>
      {member && (
        <div className="flex w-full flex-col gap-y-8 pb-48 md:grid md:h-full md:grid-cols-[50%_50%] md:grid-rows-[100%] md:pb-0">
          <div className="flex flex-col items-center justify-center justify-items-center gap-y-4 md:w-fit">
            <img
              src={member && member?.photo}
              alt=""
              className="aspect-square h-auto !w-[160px] rounded-md shadow-md"
            />
            <div className="flex flex-col items-center justify-center gap-y-2">
              <div className="flex w-fit flex-row items-center justify-center gap-x-2">
                <h1 className="title !select-text whitespace-nowrap">
                  {member?.name}
                </h1>
                {member?.intonation ? (
                  !loading ? (
                    <HiSpeakerWave
                      className="link fill !h-auto !w-8  !cursor-pointer"
                      title="Pronounce"
                      onClick={() => {
                        play();
                        reset();
                      }}
                    />
                  ) : (
                    <CgSpinner className="!h-auto !w-8 animate-spin !cursor-wait self-center" />
                  )
                ) : null}
              </div>
              <p className="flex self-center font-thin italic">
                {member?.role}
              </p>
            </div>
            <div className="flex w-full  flex-col items-center justify-center gap-2 md:flex-row ">
              {member?.links && (
                <div className="flex w-full flex-row items-center justify-center gap-x-4 ">
                  {member?.links.map((link: any, index: number) => (
                    <GetIcon
                      className="fade-transition h-auto !w-8 hover:opacity-50"
                      link={link}
                      key={index}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="mx-12 flex flex-col gap-y-4 font-bold md:!mx-0 md:w-full md:justify-center lg:mx-0">
            {member.bio ? <p>{member.bio}</p> : <MemberBio slug={slug} />}
          </div>
        </div>
      )}
    </>
  );
}

function GetIcon({ link, className }: { link: string; className?: string }) {
  return (
    <Link
      href={link.includes("@") ? "mailto:" + link : link}
      target="_blank"
      className=""
    >
      {link.includes("github") ? (
        <BsGithub className={className} />
      ) : link.includes("linkedin") ? (
        <BsLinkedin className={className} />
      ) : link.includes("spotify") ? (
        <BsSpotify className={className} />
      ) : link.includes("@") ? (
        <SiMaildotru className={className} />
      ) : null}
    </Link>
  );
}
