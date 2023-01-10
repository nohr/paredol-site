"use client";

import Link from "next/link";
import { IoIosArrowBack, IoIosMail } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
// import { CgSpinner } from "react-icons/cg";
import { usePathname } from "next/navigation";
import { SFXContext } from "@context/sfx.context";
// import { doc, getDoc } from "firebase/firestore/lite";
// import { db } from "@api/firebase.config";

// export a function that fetches the site email from firestore
// async function getEmail() {
//   const docSnap = await getDoc(doc(db, "info", "site"));
//   if (docSnap.exists()) {
//     return docSnap.data().email;
//   }
// }

export function Footer() {
  const path = usePathname();
  const [show, setShow] = useState(false);
  // const [email, setEmail] = useState("...");

  useEffect(() => {
    if (path?.includes("/info/")) setShow(true);
    else setShow(false);
  }, [path]);

  // useEffect(() => {
  //   (async () => setEmail(await getEmail()))();
  // }, []);

  const { select } = useContext(SFXContext);
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
        href={`mailto:info@paredol.com`}
        className="fill link hidden !w-fit gap-x-2 border-[1px] md:fixed md:bottom-3  md:left-3 md:flex md:!border-blue-900 md:dark:!border-blue-200"
      >
        <IoIosMail />
        {/* <>
          {email !== "..." ? (
            <> {email}</>
          ) : (
            <CgSpinner className="animate-spin self-center" />
          )}
        </> */}
        info@paredol.com
      </Link>
    </div>
  );
}
