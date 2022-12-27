import React, { memo } from "react";
import Quote from "../components/home/quote";
import Projects from "../components/home/projects";
import Backdrop from "../components/home/backdrop";

function HomePage() {
  return (
    <>
      <Quote />
      <Backdrop />
      <Projects />
    </>
  );
}

export default memo(HomePage);
