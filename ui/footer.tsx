"use client";

import { state } from "state";
import Link from "next/link";
import { IoIosMail } from "react-icons/io";
import { useSnapshot } from "valtio";
import { useEffect } from "react";
import { getEmail } from "@api/info.api";
import { CgSpinner } from "react-icons/cg";

export function Footer() {
  const { email } = useSnapshot(state);

  useEffect(() => {
    (async () => (state.email = await getEmail()))();
  }, []);

  return (
    <>
      <Link
        href={`mailto:${email}`}
        className="link fill fixed top-3 !flex !w-fit gap-x-2 self-center justify-self-center border-[1px] !underline-offset-1 md:top-[unset] md:bottom-3 md:left-3 md:!border-blue-900 md:dark:!border-blue-200"
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
    </>
  );
}
