"use client";

import React from "react";
import { useSnapshot } from "valtio";
import ProjectsCollection from "../../../firebase/Collection";
import { cloudPanel, statePanel } from "../panel.state";
import { Panel } from "../panel.style";
import {
  useLayout,
  useOffset,
  usePadding,
  usePanelStyle,
} from "../panel.utils";

const Projects = () => {
  const snap = useSnapshot(statePanel);
  const clip = useSnapshot(cloudPanel);
  const { isPro } = snap;
  const { dragging } = clip;

  return (
    <Panel
      className={dragging ? "glow" : ""}
      pro={usePanelStyle("pro")}
      left={useOffset("pro", "left")}
      top={useOffset("pro", "top")}
      padding={usePadding("pro")}
      // layout={useLayout("pro")}
    >
      {isPro ? <ProjectsCollection /> : null}
    </Panel>
  );
};

export default Projects;
