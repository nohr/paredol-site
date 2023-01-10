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
        className={`h-full bg-white text-blue-900 selection:bg-blue-900 selection:bg-opacity-60 selection:text-white dark:bg-black dark:text-blue-200 dark:selection:bg-blue-200 selection:dark:bg-opacity-60 dark:selection:text-black ${
          !state.motion
            ? "animate-[noise_0.1s_infinite_steps(200)] bg-[url('/watermarks/bg-noise.png')]"
            : "bg-none"
        }`}
      >
        <Init data={data}>
          <div className="flex h-full w-screen flex-col justify-start overflow-x-hidden  p-2 md:px-[10px] md:pb-2">
            <div className="h-full pt-0 md:py-20 md:pb-12">
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
