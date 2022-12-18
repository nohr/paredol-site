// "use client";

import { useEffect } from "react";
import { state } from "./state";

export const useSearch = (projects: any, query: any) => {
  if (query === "") return projects;
  return projects.filter((item: { [x: string]: { toString: () => string } }) =>
    Object.keys(item).some((key) =>
      key === "cover" || key === "published"
        ? false
        : item[key].toString().toLowerCase().includes(query.toLowerCase())
    )
  );
};

export function Theme() {
  // Check for dark mode preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      state.theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
  }, []);

  if (typeof window !== "undefined") {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        state.theme = event.matches ? "dark" : "light";
      });
  }
}

export function useMobile() {
  if (typeof window !== "undefined") {
    state.mobile = window.matchMedia("(max-width: 768px)").matches;
  }
}

export function useMotion() {
  if (typeof window !== "undefined") {
    state.motion = window.matchMedia(
      `(prefers-reduced-motion: reduce)`
    ).matches;
  }
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
