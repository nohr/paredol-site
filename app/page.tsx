import React from "react";
import Quote from "../ui/home/quote";
import ProjectLink from "./ProjectLink";
import { getData } from "@api/api";

export default async function HomePage() {
  const data = await getData();

  // Serialize the date object to a string to prevent the error
  data.map((doc: any) => {
    const { date } = doc;
    date.seconds = date.seconds.toString();
    date.nanoseconds = date.nanoseconds.toString();
    console.log(date);
  });

  return (
    <div className="mx-1 w-full pb-24 md:pb-6 lg:px-[10rem] xl:px-[20rem]">
      <Quote />
      {data.map((doc: any, index: number) => (
        <ProjectLink doc={doc} index={index} />
      ))}
    </div>
  );
}
