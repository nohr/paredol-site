"use client";

import { state } from "state";
import Link from "next/link";
import { useSnapshot } from "valtio";
import { TfiArrowCircleRight } from "react-icons/tfi";
import { CgSpinner } from "react-icons/cg";
import { useContext } from "react";
import { AudioContext } from "@context/audio.context";

export default function Roster() {
  const { roster } = useSnapshot(state);
  const { confirm } = useContext(AudioContext);

  // reorder roster by name
  const orderedRoster = Object.keys(roster)
    .map((key) => ({ key, ...roster[key] }))
    .sort((a, b) => (a.index > b.index ? 1 : -1));

  return (
    <div className="flex flex-col gap-y-2 p-3">
      <h1 className="title self-center md:self-start">The crew...</h1>
      <div className="flex flex-col justify-start gap-y-4">
        {roster !== "..." ? (
          orderedRoster.map((member) => (
            <Link
              key={member.key}
              onClick={() => confirm()}
              href={member.url ? member.url : `/info/${member.key}`}
              target={member.url ? "_blank" : "_self"}
              className="link fill !flex !w-full flex-row gap-x-3 self-center justify-self-center border-[1px] !p-3 !underline-offset-1 md:self-start md:!border-blue-900 md:dark:!border-blue-200"
            >
              <div
                style={{
                  backgroundImage: `url(${member.photo})`,
                  backgroundSize: "120%",
                  backgroundPosition: "center",
                }}
                className="aspect-square w-20 rounded-full"
              ></div>
              <div className="flex flex-col gap-y-1">
                <p className="h-fit w-full font-bold">{member.name}</p>
                <p className="h-fit w-full text-xs italic">{member.role}</p>
              </div>
              <TfiArrowCircleRight className="h-6 w-auto" />
            </Link>
          ))
        ) : (
          <CgSpinner className="h-8 w-auto animate-spin self-center" />
        )}
      </div>
    </div>
  );

  // return (
  //   <div className="flex flex-col gap-y-2 p-3">
  //     <h1 className="title">The roster...</h1>
  //     {/* map roster */}

  //     {orderedRoster &&
  //       orderedRoster.map((key) => (
  //         <div key={key} className="flex flex-col justify-center">
  //           <Link
  //             href={`info/${key}`}
  //             className="link flex !w-[75%] flex-row items-center gap-x-3 !p-2"
  //           >
  //             {orderedRoster[key]?.photo && (
  //               <div
  //                 style={{
  //                   backgroundImage: `url(${orderedRoster[key]?.photo})`,
  //                   backgroundSize: "120%",
  //                   backgroundPosition: "center",
  //                 }}
  //                 className={`flex aspect-square w-20 rounded-full`}
  //               ></div>
  //             )}
  //             <p className="h-fit w-full font-bold">
  //               {orderedRoster[key]?.name}
  //             </p>
  //           </Link>
  //           {/* <p>{orderedRoster[key].bio}</p> */}
  //         </div>
  //       ))}
  //   </div>
  // );
}
