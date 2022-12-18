import { useSnapshot } from "valtio";
import Options from "./options/options";
import { HomeButton } from "./logo/home";
import { Links, Nav, Panel, Path, Toggle } from "./nav.style";
import { useTheme } from "styled-components";
import { usePathname } from "next/navigation";
import { Search } from "./search/search";
import { useUser } from "../../firebase/api";
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
  const user = useUser();

  return (
    <Links>
      {user && <Link href="Editor" />}
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
      <Toggle
        className="option-toggle"
        active={options ? active : undefined}
        tabIndex={-1}
        onClick={() => (state.options = !options)}
      >
        Options
      </Toggle>
      {options ? <Options /> : null}
      <Links className="mobile-links">
        {user && <Link href="Editor" />}
        <Link href="Info" active={active} />
        <Link href="Store" active={active} />
      </Links>
    </Panel>
  );
}

export default function Navbar() {
  const { options, mobile } = useSnapshot(state);
  const [area, setArea] = useState<JSX.Element>(<NavLinks />);
  const [menu, setMenu] = useState<boolean>(false);
  useEffect(() => {
    if (mobile) {
      setArea(<MenuButton setMenu={setMenu} />);
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
        </div>
        <Search />
        {area}
      </Nav>
      {options ? <Options /> : null}
      {menu ? <Menu /> : null}
    </>
  );
}
