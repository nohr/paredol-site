"use client";

import React, { memo, useRef } from "react";
import styles from "./nav.module.scss";
import Options from "../options/options";
import Projects from "../projects/projects";
import { HoverConsumer } from "../../../common/hoverContext";
import { useSnapshot } from "valtio";
import { Panel, Header, Skew } from "../panel.style";
import { cloudPanel, statePanel } from "../panel.state";
import { usePanelStyle } from "../panel.utils";
import { HomeButton, Quote } from "./homeButton";
import NavControls from "./navControls";
import { useSpring, animated } from "react-spring";
import { useDrag, UserDragConfig } from "@use-gesture/react";

const Navigator = () => {
  const snap = useSnapshot(statePanel);
  const clip = useSnapshot(cloudPanel);
  const { dragging, skew } = clip;
  const nav = useRef<any>();
  const header = useRef<any>();
  const pro = useRef<any>();
  const opt = useRef<any>();
  const wheel = useRef<any>();
  const headwidth = {
    first: {
      max: snap.direction ? "100%" : "100%",
      min: snap.direction ? "62%" : "62%",
    },
    second: {
      max: snap.direction ? "115%" : "62%",
      min: snap.direction ? "62%" : "100%",
    },
  };

  // Drag
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  const dragOptions: UserDragConfig = {
    bounds: document.body,
    target: header,
    pointer: {
      capture: false,
    },
  };

  useDrag(({ down, offset: [mx, my], tap, xy, initial, dragging }) => {
    api.start({ x: mx, y: my, immediate: down });
    statePanel.navPosition = { x: xy[0], y: xy[1] };

    if (!snap.dragged)
      statePanel.initPosition = { x: initial[0], y: initial[1] };
    if (dragging) cloudPanel.dragging = true;
    if (!dragging) cloudPanel.dragging = false;
    if (tap) return;
    if (mx !== 0 && my !== 0) statePanel.dragged = true;
  }, dragOptions);

  return (
    <HoverConsumer>
      {({ setHover }) => (
        <Skew
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          skew={skew ? `skew(3deg, 9deg)` : `skew(0deg, 0deg)`}
        >
          <animated.div style={{ x, y }}>
            <Panel
              ref={nav}
              className={dragging ? "glow" : ""}
              nav={usePanelStyle("nav")}
            >
              <Header ref={header} className={styles.header}>
                <HomeButton dong={undefined} nabla={null} />
                <Quote />
              </Header>
              <NavControls />
            </Panel>
            <Projects />
            <Options />
          </animated.div>
        </Skew>
      )}
    </HoverConsumer>
  );
};

export default memo(Navigator);
