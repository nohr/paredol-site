// "use client";

// import { useEffect, useState } from "react";

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

export const useSearch = (projects: any, query: any) => {
  if (query === "") return projects;
  return projects.filter((item: { [x: string]: { toString: () => string } }) =>
    Object.keys(item).some((key) =>
      key === "cover"
        ? false
        : item[key].toString().toLowerCase().includes(query.toLowerCase())
    )
  );
};
