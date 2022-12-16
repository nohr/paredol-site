"use client";

import React, { memo, useRef } from "react";
import styles from "./nav.module.scss";
import Options from "../options/options";
import Projects from "../projects/projects";
import { HoverConsumer } from "../../../../common/hoverContext";
import { useSnapshot } from "valtio";
import { Panel, Header, Skew } from "../panel.style";
import { cloudPanel, statePanel } from "../panel.state";
import { usePanelStyle } from "../panel.utils";
import { HomeButton, Quote } from "./homeButton";
import NavControls from "./navControls";
import { useSpring, animated } from "react-spring";
import { useDrag } from "@use-gesture/react";
import { cloud } from "../../../../common/state";

const Navigator = () => {
  const snap = useSnapshot(statePanel);
  const clip = useSnapshot(cloudPanel);
  const { dragging, skew } = clip;
  const nav = useRef<any>();
  const header = useRef<any>();
  const pro = useRef<any>();
  const opt = useRef<any>();
  const wheel = useRef<any>();

  // Drag
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  useDrag(
    ({ down, offset: [mx, my], tap, xy, initial, dragging }) => {
      api.start({ x: mx, y: my, immediate: down });
      statePanel.navPosition = { x: xy[0], y: xy[1] };

      if (!snap.dragged)
        statePanel.initPosition = { x: initial[0], y: initial[1] };
      if (dragging) cloudPanel.dragging = true;
      if (!dragging) cloudPanel.dragging = false;
      if (tap) return;
      if (mx !== 0 && my !== 0) statePanel.dragged = true;
    },
    {
      bounds: typeof document !== "undefined" ? document.body : undefined,
      target: header,
      pointer: {
        capture: false,
      },
    }
  );

  const navStyle = usePanelStyle("nav");
  return (
    <HoverConsumer>
      {({ setHover }) => (
        <Skew
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          skew={skew ? `skew(3deg, 9deg)` : `skew(0deg, 0deg)`}
        >
          <animated.div style={{ x, y }}>
            <Panel ref={nav} className={dragging ? "glow" : ""} nav={navStyle}>
              <Header
                ref={header}
                className={styles.header}
                onMouseOver={() => tooltip(true)}
                onMouseOut={() => tooltip(false, quote)}
              >
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

let quote = cloud.quote;
let hoverTick = 0;
function tooltip(mouseover: boolean, quote?: string) {
  if (hoverTick < 3) {
    if (mouseover) {
      cloud.quote = "Click and drag this area to move the Navigator.";
    } else if (!mouseover && quote) {
      cloud.quote = quote;
      hoverTick++;
    }
  }
}
