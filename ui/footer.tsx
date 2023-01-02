"use client";

import { state } from "state";
import Link from "next/link";
import { IoIosArrowBack, IoIosMail } from "react-icons/io";
import { useSnapshot } from "valtio";
import { useContext, useEffect, useState } from "react";
import { getEmail } from "@api/info.api";
import { CgSpinner } from "react-icons/cg";
import { usePathname } from "next/navigation";
import { AudioContext } from "@context/audio.context";

export function Footer() {
  const { email } = useSnapshot(state);
  const path = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (path?.includes("/info/")) setShow(true);
    else setShow(false);
  }, [path]);

  useEffect(() => {
    (async () => (state.email = await getEmail()))();
  }, []);

  const { select } = useContext(AudioContext);
  return (
    <div
      className={`fixed top-3 !flex w-screen ${
        show ? "justify-evenly" : "justify-center"
      } px-3`}
    >
      {/* back bar */}
      {show ? (
        <div className=" flex h-min w-full md:top-[unset] md:hidden">
          <Link
            href="/info"
            onClick={() => select()}
            className="fill link flex !w-min flex-row"
          >
            <IoIosArrowBack />
            Back
          </Link>
        </div>
      ) : null}
      <Link
        href={`mailto:${email}`}
        className="link fill !flex !w-fit gap-x-2 border-[1px] md:fixed  md:bottom-3 md:left-3 md:!border-blue-900 md:dark:!border-blue-200"
      >
        <IoIosMail />
        <>
          {email !== "..." ? (
            <> {email}</>
          ) : (
            <CgSpinner className="animate-spin self-center" />
          )}
        </>
      </Link>
    </div>
  );
}
