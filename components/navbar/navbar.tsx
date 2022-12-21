import { useSnapshot } from "valtio";
import Options from "./options/options";
import { HomeButton } from "./logo/home";
import { Links, Nav, Panel, Path, Toggle } from "./nav.style";
import { useTheme } from "styled-components";
import { usePathname } from "next/navigation";
import { Search } from "./search/search";
import { useUser } from "../../api/firebase.api";
import { state } from "../../common/state";
import { MenuButton } from "./nav.svg";
import { useEffect, useState } from "react";

function Link({ ...props }) {
  const { ui } = useTheme();
  const activeOriginal = `border-color: ${ui.secondary} !important;`;
  const path = usePathname();
  let { href, active } = props;
  return (
    <Path
      onClick={() => (state.menu = false)}
      active={
        path?.substring(1) === `${href.toLowerCase()}`
          ? active
            ? active
            : activeOriginal
          : undefined
      }
      href={`/${href.toLowerCase()}`}
    >
      {href}
    </Path>
  );
}

function NavLinks() {
  const { ui } = useTheme();
  const active = `border-color: ${ui.secondary} !important;`;
  const { options } = useSnapshot(state);

  return (
    <Links>
      <Link href="Info" />
      <Link href="Store" />
      <Toggle
        className="toggle"
        active={options ? active : undefined}
        tabIndex={-1}
        onClick={() => (state.options = !options)}
      >
        Options
      </Toggle>
    </Links>
  );
}

function Menu() {
  const user = useUser();
  const { options } = useSnapshot(state);
  const { ui } = useTheme();
  const active = `background-color: ${ui.secondary} !important;
  color: ${ui.background} !important;
  `;

  return (
    <Panel className="menu">
      {options ? <Options /> : null}
      <Links className="mobile-links">
        {user && <Link href="Editor" active={active} />}
        <Link href="Info" active={active} />
        <Toggle
          className="option-toggle"
          active={options ? active : undefined}
          tabIndex={-1}
          onClick={() => (state.options = !options)}
        >
          Options
        </Toggle>
        <Link href="Store" active={active} />
      </Links>
    </Panel>
  );
}

export default function Navbar() {
  const { options, mobile, menu } = useSnapshot(state);
  const [area, setArea] = useState<JSX.Element>(<NavLinks />);
  const user = useUser();
  useEffect(() => {
    if (mobile) {
      setArea(<MenuButton />);
    } else {
      setArea(<NavLinks />);
    }
  }, [mobile]);

  if (!menu && mobile) state.options = false;

  return (
    <>
      <Nav>
        <div className="logo-area">
          <HomeButton />
          {user && !mobile ? <Link href="Editor" /> : null}
        </div>
        <Search />
        {area}
      </Nav>
      {options && !mobile ? <Options /> : null}
      {menu ? <Menu /> : null}
    </>
  );
}
