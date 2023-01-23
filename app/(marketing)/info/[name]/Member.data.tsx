"use client";

import { SFXContext } from "context/sfx";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { BsGithub, BsLinkedin, BsSpotify } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { SiMaildotru } from "react-icons/si";
import { state } from "state";
import { useSnapshot } from "valtio";
import { Intonation } from "./Intonation";

export function MemberData({ member, name }: any) {
  const { loading } = useSnapshot(state);
  const { reset } = useContext(SFXContext);
  useEffect(() => {
    state.loading = false;
  }, []);

  return (
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
