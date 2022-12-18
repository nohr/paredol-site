import { useSnapshot } from "valtio";
import Options from "./options/options";
import { HomeButton } from "./logo/home";
import { Links, Nav, Path, Toggle } from "./nav.style";
import { useTheme } from "styled-components";
import { usePathname } from "next/navigation";
import { Search } from "./search/search";
import { useUser } from "../../firebase/api";
import { state } from "../../common/state";

export default function Navbar() {
  const { options } = useSnapshot(state);
  const { ui } = useTheme();
  const path = usePathname();
  const active = `border-color: ${ui.secondary} !important;`;
  const user = useUser();
  return (
    <>
      <Nav>
        <div className="logo-area">
          <HomeButton />
        </div>
        <Search />
        <Links>
          <Path
            active={path?.substring(1) === "info" ? active : undefined}
            href="/info"
          >
            Info
          </Path>
          <Path
            active={path?.substring(1) === "store" ? active : undefined}
            href="/store"
          >
            Store
          </Path>
          {user && (
            <Path
              active={path?.substring(1) === "login" ? active : undefined}
              href="/login"
            >
              Editor
            </Path>
          )}
          <Toggle
            className="toggle"
            active={options ? active : undefined}
            tabIndex={-1}
            onClick={() => (state.options = !options)}
          >
            Options
          </Toggle>
        </Links>
      </Nav>
      {options ? <Options /> : null}
    </>
  );
}
