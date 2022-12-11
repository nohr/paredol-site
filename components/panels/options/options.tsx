"use client";

import React, { useState } from "react";
import { useSnapshot } from "valtio";
import { state } from "../../../common/state";
import { cloudPanel, statePanel } from "../panel.state";
import { Panel, Toggle } from "../panel.style";
import {
  SongInfo,
  useLayout,
  useOffset,
  usePadding,
  usePanelStyle,
} from "../panel.utils";
import {
  ColorIcon,
  DirectionIcon,
  ModeIcon,
  MuteIcon,
  ShowHideIcon,
} from "./opt.svg";

const toggleCanvas = () => {
  state.canvas = !state.canvas;
};

const toggleMute = () => {
  statePanel.muted = !statePanel.muted;
};

const toggleTheme = () => {
  state.theme = state.theme === "light" ? "dark" : "light";
};

const toggleDirection = () => {
  statePanel.direction = !statePanel.direction;
};

const Options = () => {
  const snap = useSnapshot(statePanel);
  const stat = useSnapshot(state);
  const clip = useSnapshot(cloudPanel);
  const { direction, muted, songIndex } = snap;
  const { canvas, theme } = stat;
  const { dragging, songs } = clip;

  const [song, setSong] = useState(
    `${songs[songIndex]?.artist} - ${songs[songIndex]?.name}`
  );
  const firstStyle = !direction ? { height: "75px" } : { height: "87px" };
  const secondStyle = !direction ? { height: "133px" } : { height: "161px" };
  const firstHeader = !direction
    ? { width: "62%" }
    : {
        width: "64%",
        gridColumnStart: 1,
        gridColumnEnd: 1,
        gridRowStart: 1,
        gridRowEnd: 1,
      };
  const secondHeader = !direction
    ? { width: "115%" }
    : {
        width: "64%",
        gridColumnStart: 2,
        gridColumnEnd: 2,
        gridRowStart: 1,
        gridRowEnd: 1,
      };

  return (
    <Panel
      className={dragging ? "glow" : ""}
      opt={usePanelStyle("opt")}
      left={useOffset("opt", "left")}
      top={useOffset("opt", "top")}
      padding={usePadding("opt")}
      layout={useLayout("opt")}
    >
      <p style={firstHeader} id="audiohead">
        Audio
      </p>
      <div
        className="audio"
        style={firstStyle}
        // onMouseEnter={() => {
        //   styleHeaders(headwidth, 1, "audiohead", true);
        // }}
        // onMouseLeave={() => {
        //   styleHeaders(headwidth, 1, "audiohead", false);
        // }}
      >
        <Toggle onClick={() => toggleMute()}>
          <MuteIcon />
          {!muted
            ? !direction
              ? "Mute SFX"
              : "Mute"
            : direction
            ? "Unmute SFX"
            : "Unmute"}
        </Toggle>
        <SongInfo song={song} />
      </div>
      <p style={secondHeader} id="displayhead">
        Display
      </p>
      <div
        className="display"
        style={secondStyle}
        // onMouseEnter={() => styleHeaders(headwidth, 2, "displayhead", true)}
        // onMouseLeave={() => styleHeaders(headwidth, 2, "displayhead", false)}
      >
        <Toggle
          onClick={() => {
            toggleCanvas();
            // select();
          }}
        >
          <ShowHideIcon />
          {canvas ? "Hide" : "Show"}
        </Toggle>
        <Toggle onClick={() => toggleTheme()}>
          <ModeIcon />
          {theme === "light" ? "Dark" : "Light"}
        </Toggle>
        <Toggle
        // onClick={() => {
        //   openWheel();
        //   select();
        // }}
        >
          <ColorIcon />
          Color
        </Toggle>
        <Toggle onClick={() => toggleDirection()}>
          <DirectionIcon />
          {direction ? "Row" : "Column"}
        </Toggle>
      </div>
    </Panel>
  );
};

export default Options;
