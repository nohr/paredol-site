export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "only-no-store",
  runtime = "nodejs",
  preferredRegion = "auto";

import React from "react";
import Quote from "../ui/home/quote";
import ProjectLink from "./ProjectLink";
import { getData } from "@api/api";
import LogoCanvas from "@ui/navbar/logo/logo.comp";
import { FiChevronsDown } from "react-icons/fi";

export default async function HomePage() {
  const data = await getData();

  return (
    <div className="mx-1 w-full pb-24 md:px-[10rem] md:pb-6 xl:px-[20rem]">
      <Quote />
      <LogoCanvas
        style={{
          width: "70%",
          height: "auto",
          aspectRatio: "1 / 1",
          position: "fixed",
          pointerEvents: "none",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: -100,
        }}
        text="paredol"
      />
      <p className="mt-6 mb-6 inline-flex items-center text-2xl font-bold">
        Check out some of our projects
        <FiChevronsDown className="h-4 w-auto stroke-2" />
      </p>
      {data.map((doc: any, index: number) => (
        <ProjectLink doc={doc} index={index} key={index} />
      ))}
    </div>
  );
}
