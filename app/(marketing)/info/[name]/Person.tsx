"use client";

import Link from "next/link";
import { state } from "state";
import { useContext, useEffect } from "react";
import { SFXContext } from "@context/sfx.context";
import { BsGithub, BsSpotify, BsLinkedin } from "react-icons/bs";
import { SiMaildotru } from "react-icons/si";
import { MemberBio } from "@ui/info/member/member.bio";
import { useSnapshot } from "valtio";
import { CgSpinner } from "react-icons/cg";
import Image from "next/image";
import { Intonation } from "./Intonation";

export function Person({ name, member }: any) {
  const { loading } = useSnapshot(state);
  const { reset } = useContext(SFXContext);

  useEffect(() => {
    state.loading = false;
  }, []);
  return (
    <div className="flex h-full w-full flex-col gap-8 md:flex-row md:pb-0 lg:mx-24 2xl:!mx-96">
      <div className="flex flex-col items-center justify-items-center gap-y-4 md:justify-start lg:justify-center">
        <div className="relative aspect-square h-auto !w-[160px] overflow-hidden rounded-md shadow-lg">
          <Image
            src={member.photo}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
            fill
            alt={member.name}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-y-2">
          <div className="flex w-fit flex-row items-center justify-center gap-x-2">
            <h1 className="title w-min !select-text">{member?.name}</h1>

            {member.intonation ? (
              !loading ? (
                <div onClick={() => reset()}>
                  <Intonation intonation={member.intonation} name={name} />
                </div>
              ) : (
                <CgSpinner className="!h-auto !w-8 animate-spin !cursor-wait self-center" />
              )
            ) : null}
          </div>
          <p className="flex self-center font-thin italic">{member?.role}</p>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2 md:flex-row ">
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
      <div className="flex h-full flex-col gap-y-4 overflow-y-scroll font-bold md:w-[65ch] md:justify-start md:pb-0 lg:mx-0 lg:justify-center">
        <h3 className="subTitle">Bio</h3>
        {member.bio ? <p>{member.bio}</p> : <MemberBio name={name} />}
      </div>
    </div>
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
