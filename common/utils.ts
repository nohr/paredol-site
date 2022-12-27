// "use client";

import { useEffect, useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { getSongs } from "../api/firebase.api";
import { state } from "./state";

export const useSearch = (projects: any, query: any) => {
  if (query === "") return projects;
  return (
    projects &&
    projects.filter((item: { [x: string]: { toString: () => string } }) =>
      Object.keys(item).some((key) =>
        key === "cover" || key === "published"
          ? false
          : item[key].toString().toLowerCase().includes(query.toLowerCase())
      )
    )
  );
};

export const useTheme = () => {
  if (typeof window !== "undefined") {
    // Check for dark mode preference
    const userTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (userTheme === "dark" || (!userTheme && systemDark)) {
      document.documentElement.classList.add("dark");
      state.theme = "dark";
      return;
    }
  }
};

export const toggleTheme = (theme?: string) => {
  if (typeof document !== "undefined") {
    if (
      document.documentElement.classList.contains("dark") ||
      theme === "light"
    ) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      state.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      state.theme = "dark";
    }
  }
};

export function useMobile() {
  if (typeof window !== "undefined") {
    state.mobile = window.matchMedia("(max-width: 768px)").matches;
  }
}

export function useMotion() {
  if (typeof window !== "undefined") {
    // Check for reduced motion preference
    const userMotion = localStorage.getItem("motion");
    const systemMotion = window.matchMedia(
      `(prefers-reduced-motion: reduce)`
    ).matches;

    if (userMotion === "true" || systemMotion) {
      state.motion = true;
      return;
    }
  }
}

export function useSong() {
  const { songIndex } = useSnapshot(state);
  const songs = useRef<any>([]);
  const [song, setSong] = useState("");

  useEffect(() => {
    getSongs().then((res) => {
      songs.current = res;

      setSong(
        `${songs.current[songIndex]?.artist} - ${songs.current[songIndex]?.name}`
      );
    });
  }, [songIndex]);

  return [song, songs.current, setSong];
}

// export function useWindowDimensions() {
//   let dimensions: any;
//   useEffect(() => {
//     function getWindowDimensions() {
//       if (typeof window === "undefined") {
//         let { innerWidth: width, innerHeight: height } = window;
//         return {
//           width,
//           height,
//         };
//       }
//     }
//     const [windowDimensions, setWindowDimensions] = useState(
//       getWindowDimensions()
//     );

//     function handleResize() {
//       setWindowDimensions(getWindowDimensions());
//     }

//     if (typeof window !== "undefined")
//       window.addEventListener("resize", handleResize);
//     dimensions = windowDimensions;
//     return () => {
//       if (typeof window !== "undefined")
//         window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return dimensions;
// }
