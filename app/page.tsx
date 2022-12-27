import React from "react";
import Quote from "../components/home/quote";
import Projects from "../components/home/projects";
import Backdrop from "../components/home/backdrop";

export default function HomePage() {
  return (
    <>
      <Quote />
      <Backdrop />
      <Projects />
    </>
  );
}
