import { useSnapshot } from "valtio";
import Options from "./options/options";
import { HomeButton } from "./logo/home";
import { usePathname } from "next/navigation";
import { Search } from "./search/search";
import { useUser } from "@api/firebase.api";
import { state } from "state";
import Link from "next/link";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaShoppingBasket } from "react-icons/fa";
import { BsFillGearFill } from "react-icons/bs";
import { useRef } from "react";
import { Squash as Hamburger } from "hamburger-react";

function Path({ ...props }) {
  const path = usePathname();
  let { href, style } = props;
  return (
    <Link
      onClick={() => (state.menu = false)}
      className={`link my-1 flex md:!border-transparent md:hover:!border-current  md:dark:!border-transparent md:dark:hover:!border-current ${
        style === "md" ? "hidden md:flex" : ""
      }  ${
        path?.substring(1) === `${href.toLowerCase()}`
          ? `bg-blue-900 text-white dark:bg-blue-200 dark:text-black`
          : ""
      }`}
      href={`/${href.toLowerCase()}`}
    >
      {href}
      {href === "Info" ? (
        <BsFillInfoCircleFill
          className={`m-0 h-3 ${
            path?.substring(1) === `${href.toLowerCase()}`
              ? "text-white dark:text-black"
              : "fill-blue-900 p-0 dark:fill-blue-200"
          } `}
        />
      ) : href === "Store" ? (
        <FaShoppingBasket
          className={`m-0 h-3 ${
            path?.substring(1) === `${href.toLowerCase()}`
              ? "text-white dark:text-black"
              : "fill-blue-900 p-0 dark:fill-blue-200"
          } `}
        />
      ) : null}
    </Link>
  );
}

function DesktopLinks({ ...props }) {
  const { options } = useSnapshot(state);
  const { optionsBtn } = props;
  return (
    <div
      className={`m-0 hidden ${
        options ? "border-blue-900 dark:border-blue-200" : ""
      } h-full w-full flex-row items-center justify-end gap-x-1 md:flex lg:!gap-x-6`}
    >
      <Path href="Info" />
      <Path href="Store" />
      <div
        className={`my-1 flex h-min w-fit cursor-pointer select-none items-center rounded-xl border-[1px] border-transparent px-[6px] py-[4px] font-thin backdrop-blur-lg md:gap-x-2 md:hover:border-blue-900 md:hover:dark:border-blue-200 ${
          options
            ? "bg-blue-900 text-white dark:bg-blue-200 dark:text-black"
            : ""
        }`}
        tabIndex={-1}
        onClick={() => (state.options = !options)}
        ref={optionsBtn}
      >
        Options
        <BsFillGearFill
          className={`m-0 h-3 ${
            options
              ? "text-white dark:text-black"
              : "fill-blue-900 p-0 dark:fill-blue-200"
          } `}
        />
      </div>
    </div>
  );
}

function MobileMenu({ ...props }) {
  const user = useUser();
  const { optionsBtn } = props;
  const { options, menu, mobile } = useSnapshot(state);
  const ref = useRef<any>(null);

  ref.current?.addEventListener("touchmove", (e: any) => {
    e.preventDefault();
  });

  return (
    <div
      ref={ref}
      className={`${
        menu ? "" : "!hidden"
      } fixed bottom-28 z-50 h-fit w-screen md:hidden`}
    >
      <Options
        className={`${options && mobile ? "flex" : "!hidden"}`}
        optionsBtn={optionsBtn}
      />
      <div className="flex h-fit w-full flex-row items-center justify-evenly gap-x-3 p-3">
        {user && <Path href="Editor" />}
        <Path href="Info" />
        <div
          className={`m-0 flex h-min w-fit select-none items-center justify-between rounded-xl border-[1px] border-blue-900 px-[6px] py-[4px] font-thin backdrop-blur-lg dark:border-blue-200 md:w-fit md:border-transparent ${
            options
              ? "bg-blue-900 text-white dark:bg-blue-200 dark:text-black "
              : "bg-transparent text-blue-900 dark:text-blue-200 "
          }}`}
          ref={optionsBtn}
          tabIndex={-1}
          onClick={() => (state.options = !options)}
        >
          Options
          <BsFillGearFill
            className={`m-0 h-3 ${
              options
                ? "text-white dark:text-black"
                : "fill-blue-900 p-0 dark:fill-blue-200"
            } `}
          />
        </div>
        <Path href="Store" />
      </div>
    </div>
  );
}

export default function Navbar() {
  const { options, mobile } = useSnapshot(state);
  const user = useUser();
  const optionsBtn = useRef(null);
  const ref = useRef<any>(null);

  ref.current?.addEventListener(
    "touchmove",
    (e: any) => {
      e.preventDefault();
    },
    { passive: false }
  );

  return (
    <>
      <div
        ref={ref}
        className={`fixed bottom-4 z-50 grid h-min w-screen grid-cols-[0.2fr_0.6fr_0.2fr] grid-rows-[min-content] items-center justify-center justify-items-center p-3 backdrop-blur-lg md:top-0 md:grid-cols-[25%_50%_25%]`}
      >
        <div className="m-0 flex h-full flex-row items-center justify-between gap-0 p-0 md:w-full">
          <HomeButton />
          {user ? <Path href="Editor" style={"md"} /> : null}
        </div>
        <Search />
        <div className="contents md:hidden">
          <Hamburger
            label="Show menu"
            duration={0.2}
            distance="sm"
            rounded
            onToggle={(toggled) => {
              if (toggled) state.menu = true;
              else {
                state.menu = false;
                state.options = false;
              }
            }}
          />
        </div>
        <DesktopLinks optionsBtn={optionsBtn} />
      </div>
      <Options
        className={`${options && !mobile ? "flex" : "!hidden"}`}
        optionsBtn={optionsBtn}
      />
      <MobileMenu optionsBtn={optionsBtn} />
    </>
  );
}
