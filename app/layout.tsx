import "../globals.css";
import React from "react";
import { Footer } from "@ui/footer";
import Backdrop from "@ui/home/backdrop";
import { Init } from "./init";
// import Load from "../components/container/loader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-full  bg-white text-blue-900 selection:bg-blue-900 selection:bg-opacity-60 selection:text-white dark:bg-black dark:text-blue-200 dark:selection:bg-blue-200 selection:dark:bg-opacity-60 dark:selection:text-black ">
        <Init>
          <div className="flex h-full w-screen flex-col justify-start overflow-x-hidden  p-2 md:px-[10px] md:pb-2">
            <div className="h-full py-20 md:pb-6">{children}</div>
          </div>
        </Init>
        <Backdrop />
        <Footer />
      </body>
    </html>
  );
}
