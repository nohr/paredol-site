"use client";

import styles from "./nav.module.scss";
import { usePathname } from "next/navigation";
import React, { memo } from "react";
import { useSnapshot } from "valtio";
import { Search } from "./search/search";
import { useTheme } from "styled-components";
import { Path, Toggle, TrayWrapper } from "../panel.style";
import { FFButton, PlayButton, ResetPosButton } from "./nav.utils";
import { statePanel } from "../panel.state";

let i: number = 0;
function NavControls() {
  const pathname = usePathname();
  const theme = useTheme();

  const active = `background-color: ${theme.ui.active};
  color: #ebebeb;
  -webkit-box-shadow: 0px 2px 10px 1px ${theme.ui.active};
  -moz-box-shadow: 0px 2px 10px 1px ${theme.ui.active};
  box-shadow: 0px 2px 10px 1px ${theme.ui.active};
  text-shadow: 1px 1px 3px #ebebeb;`;

  const activeT = `
  font-style: italic;
  outline: 1px solid ${theme.ui.secondary};`;

  const snap = useSnapshot(statePanel);
  return (
    <div className={styles.grid}>
      <Search />
      <ToolTray />
      <Path
        active={pathname?.substring(1) === "info" ? active : undefined}
        // onClick={() => {
        //   select();
        // }}
        href="/info"
        style={{ transform: "rotate(-2deg)" }}
      >
        Info
      </Path>
      <Path
        active={pathname?.substring(1) === "store" ? active : undefined}
        // onClick={() => {
        //   select();
        // }}
        href="/store"
        style={{ transform: "rotate(2deg)" }}
      >
        Store
      </Path>
      <Toggle
        className="toggle"
        active={snap.isPro ? activeT : undefined}
        tabIndex={-1}
        style={{ justifySelf: "flex-end", transform: "rotate(-2deg)" }}
        onClick={() => (statePanel.isPro = !snap.isPro)}
      >
        Projects
        {/* {snap.isPro ? <SideArrow /> : <Arrow />} */}
      </Toggle>
      <Toggle
        className="toggle"
        active={snap.isOpt ? activeT : undefined}
        tabIndex={-1}
        style={{ justifySelf: "flex-start", transform: "rotate(2deg)" }}
        onClick={() => (statePanel.isOpt = !snap.isOpt)}
      >
        Options
        {/* {snap.isOpt ? <SideArrow /> : <Arrow />} */}
      </Toggle>
    </div>
  );
}
export default memo(NavControls);

function ToolTray() {
  return (
    <TrayWrapper className="trayWrap">
      <ResetPosButton />
      <PlayButton />
      <FFButton />
    </TrayWrapper>
  );
}
