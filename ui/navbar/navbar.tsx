import { useSnapshot } from "valtio";
import Options from "./options/options";
import { HomeButton } from "./logo/home";
import { usePathname } from "next/navigation";
import { Search } from "./search";
import { useUser } from "@api/firebase.api";
import { state } from "state";
import Link from "next/link";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaShoppingBasket } from "react-icons/fa";
import { BsFillGearFill } from "react-icons/bs";
import { useContext, useEffect, useRef, useState } from "react";
import { Squash as Hamburger } from "hamburger-react";
import { SFXContext } from "@context/sfx.context";
import { TfiAngleLeft } from "react-icons/tfi";
import { DocumentData } from "firebase/firestore/lite";

function Path({ ...props }) {
  const path = usePathname();
  let { href, style } = props;
  const { select } = useContext(SFXContext);

  return (
    <Link
      onClick={() => {
        state.menu = false;
        select();
      }}
      className={`link my-1 flex md:!border-transparent md:hover:!border-current md:dark:!border-transparent md:dark:hover:!border-current ${
        style === "md" ? "hidden md:flex" : ""
      }  ${
        path?.includes(href.toLowerCase())
          ? `bg-blue-900 text-white dark:bg-blue-200 dark:text-black`
          : ""
      }`}
      href={`/${href.toLowerCase()}`}
    >
      {href}
      {href === "Info" ? (
        <BsFillInfoCircleFill
          className={`fade-transition m-0 h-3  ${
            path?.includes(href.toLowerCase())
              ? "text-white dark:text-black"
              : "fill-blue-900 p-0 dark:fill-blue-200"
          } `}
        />
      ) : href === "Store" ? (
        <FaShoppingBasket
          className={`fade-transition m-0 h-3  ${
            path?.includes(href.toLowerCase())
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
      } h-full w-full flex-row items-center justify-evenly gap-x-1 md:flex lg:!gap-x-6`}
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
        onClick={() => {
          state.options = !options;
        }}
        ref={optionsBtn}
      >
        Options
        <BsFillGearFill
          className={`fade-transition m-0 h-3 ${
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

  ref.current?.addEventListener(
    "touchmove",
    (e: any) => {
      e.preventDefault();
    },
    { passive: true }
  );

  return (
    <div
      ref={ref}
      className={`${menu ? "" : "!hidden"} z-50 h-fit w-screen md:hidden`}
    >
      <Options
        className={`${options && mobile ? "grid" : "!hidden"} !mb-4`}
        // optionsBtn={optionsBtn}
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
          onClick={() => {
            state.options = !options;
          }}
        >
          Options
          <BsFillGearFill
            className={`fade-transition m-0 h-3 ${
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

export default function Navbar({ data }: DocumentData) {
  const { options, mobile } = useSnapshot(state);
  const user = useUser();
  const optionsBtn = useRef(null);
  const ref = useRef<any>(null);
  const { open, close } = useContext(SFXContext);

  ref.current?.addEventListener(
    "touchmove",
    (e: any) => {
      e.preventDefault();
    },
    { passive: false }
  );

  const [toggle, setToggle] = useState(false);
  const path = usePathname();

  useEffect(() => {
    return () => setToggle(false);
  }, [path]);

  // write a function that returns EST time in military time
  // const time = new Date().toLocaleTimeString("en-US", {
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   hour12: false,
  // });

  const { select } = useContext(SFXContext);
  return (
    <>
      <Options
        className={`${
          options && !mobile ? "flex flex-col gap-y-2" : "!hidden"
        }`}
      />
      <div className="fade-transition fixed bottom-0 z-50 h-min bg-white bg-opacity-70 backdrop-blur-lg dark:bg-black dark:bg-opacity-70 md:top-0 md:bottom-[unset] md:bg-transparent md:hover:bg-white md:hover:bg-opacity-70 md:dark:bg-transparent md:hover:dark:bg-black md:hover:dark:bg-opacity-70">
        <MobileMenu optionsBtn={optionsBtn} />
        {/* navbar */}
        <div
          ref={ref}
          className={`grid h-min w-screen grid-cols-[1fr_2fr_1fr] grid-rows-[min-content] items-center justify-items-center p-3 md:grid-cols-[35%_30%_35%]  lg:grid-cols-[1fr_2fr_1fr]`}
        >
          <div className="m-0 flex h-full flex-row items-center justify-between gap-0 p-0 md:w-full">
            <HomeButton />
            <Link
              href="/info"
              onClick={() => select()}
              className={`fill link hidden ${
                path?.includes("info/") ? "md:flex" : "md:hidden"
              } !w-min flex-row`}
            >
              <TfiAngleLeft className="fade-transition h-3 w-auto" />
              Back
            </Link>
            {/* time */}
            {/* <p className="font-thin">{time}</p> */}
            {user ? <Path href="Editor" style={"md"} /> : null}
          </div>
          <Search data={data} />
          <div className="contents md:hidden">
            <Hamburger
              label="Show menu"
              duration={0.2}
              distance="sm"
              rounded
              toggled={toggle}
              toggle={setToggle}
              onToggle={(toggled) => {
                if (toggled) {
                  state.menu = true;
                  open();
                } else {
                  state.menu = false;
                  state.options = false;
                  close();
                }
              }}
            />
          </div>
          <DesktopLinks optionsBtn={optionsBtn} />
        </div>
      </div>
    </>
  );
}
