import React from "react";
import Quote from "../ui/home/quote";
import ProjectLink from "./ProjectLink";
import { getData } from "@api/api";

export default async function HomePage() {
  const data = await getData();

  return (
    <div className="mx-1 w-full pb-24 md:px-[10rem] md:pb-6 xl:px-[20rem]">
      <Quote />
      <p className="mt-12 mb-6 text-2xl font-bold">
        Check out some of our projects
      </p>
      {data.map((doc: any, index: number) => (
        <ProjectLink doc={doc} index={index} key={index} />
      ))}
    </div>
  );
}
