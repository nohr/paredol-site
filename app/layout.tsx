import "../globals.css";
import React from "react";
import { Footer } from "@ui/footer";
// import Backdrop from "@ui/home/backdrop";
import { Init } from "./init";
import { getData } from "@api/api";
import { AnalyticsWrapper } from "@ui/analytics";
import { state } from "state";
// import Load from "../components/container/loader";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let data = await getData();

  return (
    <html lang="en">
      <body
        className={`h-full bg-white text-blue-900 selection:bg-blue-900 selection:text-white dark:bg-black dark:text-blue-200 dark:selection:bg-blue-200 dark:selection:text-black 
        `}
      >
        <Init data={data}>
          <div className="flex h-full w-screen flex-col justify-start overflow-x-hidden  p-2 md:px-[10px] md:pb-2">
            <div className="flex h-full flex-col items-center justify-start pt-0 md:py-20 md:pb-12">
              {children}
              <AnalyticsWrapper />
            </div>
          </div>
        </Init>
        {/* <Backdrop /> */}
        <Footer />
      </body>
    </html>
  );
}
