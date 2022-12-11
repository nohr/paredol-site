"use client";

import React from "react";
import { useSnapshot } from "valtio";
import ProjectsCollection from "../../../app/Collection";
import { cloudPanel } from "../panel.state";
import { Panel } from "../panel.style";
import { useOffset, usePadding, usePanelStyle } from "../panel.utils";

const Projects = () => {
  const clip = useSnapshot(cloudPanel);
  const { dragging } = clip;

  return (
    <Panel
      className={dragging ? "glow" : ""}
      pro={usePanelStyle("pro")}
      left={useOffset("pro", "left")}
      top={useOffset("pro", "top")}
      padding={usePadding("pro")}
    >
      <ProjectsCollection />
    </Panel>
  );
};

export default Projects;
