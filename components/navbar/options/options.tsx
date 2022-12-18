"use client";

import React, { useState } from "react";
import { useSnapshot } from "valtio";
import { state } from "../../../common/state";
import { Panel, Toggle } from "../nav.style";
import { FFButton, PlayButton } from "./opt.utils";
import { ColorIcon, ModeIcon, MuteIcon } from "./opt.svg";
import { SongBox, TrayWrapper } from "./opt.style";

const toggleMute = () => {
  state.muted = !state.muted;
};
const toggleMotion = () => {
  state.motion = !state.motion;
};

const toggleTheme = () => {
  state.theme = state.theme === "light" ? "dark" : "light";
};

const Options = () => {
  const { muted, songIndex, songs, theme, motion } = useSnapshot(state);

  const [song, setSong] = useState(
    `${songs[songIndex]?.artist} - ${songs[songIndex]?.name}`
  );

  return (
    <Panel>
      <p id="audiohead">Audio</p>
      <ToolTray />
      {/* Add Music note icon */}
      <SongInfo song={song} />
      <Toggle onClick={() => toggleMute()}>
        <MuteIcon />
        {!muted ? "Mute SFX" : "Unmute SFX"}
      </Toggle>
      <br />
      <p id="displayhead">Display</p>
      <Toggle onClick={() => toggleTheme()}>
        <ModeIcon />
        {theme === "light" ? "Dark Theme" : "Light Theme"}
      </Toggle>
      <Toggle
        onClick={() => {
          toggleMotion();
          // select();
        }}
      >
        {/* <ColorIcon /> */}
        {!motion ? "Reduce Motion" : "Enable Motion"}
      </Toggle>
      <Toggle
      // onClick={() => {
      //   openWheel();
      //   select();
      // }}
      >
        <ColorIcon />
        Change Color
      </Toggle>
    </Panel>
  );
};

export default Options;

export function SongInfo({ song }: { song: string }) {
  return (
    <SongBox className="songinfo li">
      <textarea
        readOnly
        // type="text"
        value={`(${state.songIndex + 1}/${state.songs.length}) ${song}`}
        onSelect={() => {
          navigator.clipboard.writeText(song);
        }}
      ></textarea>
    </SongBox>
  );
}

function ToolTray() {
  return (
    <TrayWrapper className="trayWrap">
      <PlayButton />
      <FFButton />
    </TrayWrapper>
  );
}
