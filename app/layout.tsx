"use client";

import "../globals.css";
import React, { useEffect } from "react";
import Navbar from "@ui/navbar/navbar";
import { useTheme, useMobile, useMotion } from "utils";
import { getData } from "@api/firebase.api";
import { state } from "state";
import { Footer } from "@ui/footer";
// import Load from "../components/container/loader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    useTheme();
    useMobile();
    useMotion();
    getData()
      .then((data) => (state.data = data))
      .catch((error) => {
        throw error;
      });
  }, []);

  return (
    <html lang="en">
      <body className="overflow-x-hidden bg-white text-blue-900 selection:bg-blue-900 selection:bg-opacity-60 selection:text-white dark:bg-black dark:text-blue-200 dark:selection:bg-blue-200 selection:dark:bg-opacity-60 dark:selection:text-black ">
        <Navbar />
        <div className=" flex h-full w-full flex-col justify-start p-[10px] py-20 md:px-[10px] md:py-[70px]">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
