"use client";

import React, { useEffect } from "react";
import Quote from "../ui/home/quote";
import Projects from "../ui/home/projects";

export default function HomePage() {
  // scroll to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="mx-1 pb-24 md:pb-0 lg:px-[10rem] xl:px-[20rem] ">
      <Quote />
      <Projects />
    </div>
  );
}
