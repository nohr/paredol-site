import React from "react";
import Quote from "../ui/home/quote";
import ProjectLink from "./ProjectLink";
import { getData } from "@api/api";

export default async function HomePage() {
  // scroll to the top when the component mounts
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);
  const data = await getData();

  // TODO: turn the date or each project into strings
  const dataString = JSON.stringify(data);
  console.log(dataString);

  return (
    <div className="mx-1 w-full pb-24 md:pb-6 lg:px-[10rem] xl:px-[20rem]">
      <Quote />
      {data.map((doc: any, index: number) => (
        <ProjectLink doc={doc} index={index} />
      ))}
    </div>
  );
}
