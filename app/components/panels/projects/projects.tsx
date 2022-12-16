"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { useTheme } from "styled-components";
import { UrlObject } from "url";
import { useSnapshot } from "valtio";
import { cloud } from "../../../../common/state";
import { cloudPanel, statePanel } from "../panel.state";
import { Panel, Path } from "../panel.style";
import {
  useLayout,
  useOffset,
  usePadding,
  usePanelStyle,
} from "../panel.utils";

const Projects = () => {
  const snap = useSnapshot(statePanel);
  const clip = useSnapshot(cloudPanel);
  const { projects } = useSnapshot(cloud);
  const { isPro } = snap;
  const { dragging } = clip;
  const pathname = usePathname();
  const theme = useTheme();

  const active = `background-color: ${theme.ui.active};
  color: #ebebeb;
  -webkit-box-shadow: 0px 2px 10px 1px ${theme.ui.active};
  -moz-box-shadow: 0px 2px 10px 1px ${theme.ui.active};
  box-shadow: 0px 2px 10px 1px ${theme.ui.active};
  // text-shadow: 1px 1px 3px #ebebeb;
  `;

  return (
    <Panel
      className={dragging ? "glow" : ""}
      pro={usePanelStyle("pro")}
      left={useOffset("pro", "left")}
      top={useOffset("pro", "top")}
      padding={usePadding("pro")}
      layout={useLayout("pro")}
    >
      {/* {error && (
            <p>
              <strong>Error: {JSON.stringify(error)}</strong>
            </p>
          )}
          {loading && (
            <div className="htmlSpinner">
              <div className="gugmu9vdpaw">
                <div></div>
              </div>
            </div>
          )} */}
      {projects && (
        <>
          <p id="audiohead" style={{ width: "65%" }}>
            Website
          </p>
          {projects.map(
            (
              doc: { name: string; lot: string },
              index: React.Key | null | undefined
            ) => (
              <Path
                key={index}
                href={doc.lot}
                active={pathname?.substring(1) === doc.lot ? active : undefined}
              >
                {doc.name}
              </Path>
            )
          )}
        </>
      )}
    </Panel>
  );
};

export default Projects;
