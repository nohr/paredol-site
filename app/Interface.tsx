import React, { CSSProperties } from "react";
import styles from "../styles/ui.module.scss";
import Navigator from "../components/panels/navigator/navigator";
import { HoverConsumer, HoverProvider } from "../common/hoverContext";
import { cloudPanel } from "../components/panels/panel.state";
import { useSnapshot } from "valtio";

function Interface({ children }: { children: React.ReactNode }) {
  const { dragging } = useSnapshot(cloudPanel);

  const fade: CSSProperties = { opacity: "25%", transition: "0.6s" };
  const hide: CSSProperties = { opacity: 0, pointerEvents: "none" };

  return (
    <HoverProvider>
      <div className={styles.Interface}>
        <Navigator />
        <HoverConsumer>
          {({ hover }: { hover: boolean }) => (
            <div style={hover ? (dragging ? hide : fade) : { opacity: 1 }}>
              {children}
            </div>
          )}
        </HoverConsumer>
      </div>
    </HoverProvider>
  );
}

export default Interface;
