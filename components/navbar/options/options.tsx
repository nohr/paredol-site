"use client";

import React, { useState } from "react";
import { useSnapshot } from "valtio";
import { state } from "../../../common/state";
import { Panel, Toggle } from "../nav.style";
import { FFButton, PlayButton } from "./opt.utils";
import { ColorIcon, ModeIcon, MuteIcon } from "./opt.svg";
import { SongBox, MusicWrapper } from "./opt.style";

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
    <Panel className="options">
      <div className="group">
        <p>Audio</p>
        <ToolTray />
        {/* Add Music note icon */}
        <SongInfo song={song} />
        <Toggle onClick={() => toggleMute()}>
          <MuteIcon />
          {!muted ? "Mute SFX" : "Unmute SFX"}
        </Toggle>
      </div>
      <div className="group">
        <p>Display</p>
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
      </div>
    </Panel>
  );
};

export default Options;

export function SongInfo({ song }: { song: string }) {
  const { songIndex, songs, motion } = useSnapshot(state);
  return (
    <SongBox className="songinfo">
      <div>
        <p
          style={motion ? { animation: "none" } : undefined}
          onClick={() => {
            navigator.clipboard.writeText(song);
          }}
        >{`(${songIndex + 1}/${songs.length}) ${song}`}</p>
      </div>
    </SongBox>
  );
}

function ToolTray() {
  return (
    <MusicWrapper className="musicWrap">
      <PlayButton />
      {/* Song track */}
      <FFButton />
    </MusicWrapper>
  );
}
