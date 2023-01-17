// "use client";

import {
  useEffect,
  useRef,
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { useSnapshot } from "valtio";
import { getSongs } from "@api/firebase.api";
import { state } from "state";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@api/firebase.config";
import { parseColor } from "@react-stately/color";

// search

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

export function handleChange(
  e: ChangeEvent<HTMLInputElement>,
  chatMode: boolean,
  setSearchText: Dispatch<SetStateAction<string>>,
  setChatText: Dispatch<SetStateAction<string>>
) {
  if (!state.colorBar) {
    if (!chatMode) {
      setSearchText(e.target.value);
    } else {
      setChatText(e.target.value);
    }
  }
}

// Options
export const toggleMute = () => {
  state.muted = !state.muted;
};
export const toggleEnableMotion = (enableMotion?: string) => {
  if (enableMotion === "reduce") {
    state.enableMotion = true;
    localStorage.setItem("enableMotion", `true`);
    return;
  }

  if (state.enableMotion) {
    document.body.classList.add("animate-[noise_0.1s_infinite_steps(200)]");
  } else {
    document.body.classList.remove("animate-[noise_0.1s_infinite_steps(200)]");
  }
  state.enableMotion = !state.enableMotion;
  localStorage.setItem("enableMotion", `${state.enableMotion}`);
};

export function useColor() {
  let [value, setValue] = useState(parseColor("hsl(209, 98%, 20%)"));
  let light = useRef("hsl(209, 98%, 20%)");
  let dark = useRef("hsl(209, 60%, 61%)");
  useEffect(() => {

    state.hue = value.getChannelValue("hue");
    light.current = `hsl(${state.hue}, 98%, 20%)`;
    dark.current = `hsl(${state.hue}, 60%, 61%)`;
    // console.log(dark.current);
  }, [value]);

  // useEffect(() => {
  //   if (state.theme === "light") {
  //     const lighttext = document.querySelectorAll(".text-blue-900");
  //     lighttext.forEach((element: any) => {
  //       element.style.color = light.current;
  //     });
  //     const lightborder = document.querySelectorAll(".border-blue-900");
  //     lightborder.forEach((element: any) => {
  //       element.style.borderColor = light.current;
  //     });
  //     const lightbg = document.querySelectorAll(".bg-blue-900");
  //     lightbg.forEach((element: any) => {
  //       element.style.backgroundColor = light.current;
  //     });
  //     const lightshadow = document.querySelectorAll(".shadow-blue-900");
  //     lightshadow.forEach((element: any) => {
  //       element.style.boxShadow = `0 0 0 3px light.current`;
  //     });
  //     const lightinputField = document.querySelectorAll(".inputField");
  //     lightinputField.forEach((element: any) => {
  //       element.style.borderColor = light.current;
  //     });
  //     const lightfill = document.querySelectorAll(".fill-blue-900");
  //     lightfill.forEach((element: any) => {
  //       element.style.fill = light.current;
  //     });
  //     const fill = document.querySelectorAll(".fill");
  //     fill.forEach((element: any) => {
  //       element.style.backgroundColor = light.current;
  //     });
  //     const lightlink = document.querySelectorAll(".border-blue-900");
  //     lightlink.forEach((element: any) => {
  //       element.style.borderColor = light.current;
  //     });
  //   }
  //   // Dark
  //   const darktext = document.querySelectorAll(".text-blue-200");
  //   darktext.forEach((element: any) => {
  //     element.style.color = dark.current;
  //   });
  //   const darkborder = document.querySelectorAll(".dark .border-blue-200");
  //   darkborder.forEach((element: any) => {
  //     element.style.borderColor = dark.current;
  //   });
  //   const darkbg = document.querySelectorAll(".dark .bg-blue-200");
  //   darkbg.forEach((element: any) => {
  //     element.style.backgroundColor = dark.current;
  //   });
  //   const darkshadow = document.querySelectorAll(".dark .shadow-blue-200");
  //   darkshadow.forEach((element: any) => {
  //     element.style.boxShadow = `0 0 0 3px ${dark.current}`;
  //   });
  //   const darkinputField = document.querySelectorAll(".dark .inputField .link");
  //   darkinputField.forEach((element: any) => {
  //     element.style.borderColor = dark.current;
  //   });
  //   const darkfill = document.querySelectorAll(".dark .fill-blue-200");
  //   darkfill.forEach((element: any) => {
  //     element.style.fill = dark.current;
  //   });
  //   const fill = document.querySelectorAll(".dark .fill");
  //   fill.forEach((element: any) => {
  //     element.style.backgroundColor = dark.current;
  //   });
  //   const darklink = document.querySelectorAll(".dark .border-blue-200");
  //   darklink.forEach((element: any) => {
  //     element.style.borderColor = dark.current;
  //   });
  // }, [value, state.options])



  return [value, setValue] as any;
}

// UI
export function useMounted() {
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}

export const useTheme = () => {
  if (typeof window !== "undefined") {
    // Check for dark mode preference
    const userTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const meta = document.querySelector("meta[name=theme-color]");

    if (userTheme === "dark" || (!userTheme && systemDark)) {
      document.documentElement.classList.add("dark");
      if (meta)
        meta.setAttribute("content", "#101010");
      state.theme = "dark";
      return;
    } else {
      if (meta)
        meta.setAttribute("content", "#ebebeb");

      state.theme = "light";
    }
  }
};

export const toggleTheme = (theme?: string) => {
  if (typeof document !== "undefined") {
    const meta = document.querySelector("meta[name=theme-color]");

    if (
      document.documentElement.classList.contains("dark") ||
      theme === "light"
    ) {
      document.documentElement.classList.remove("dark");
      if (meta)
        meta.setAttribute("content", "#ebebeb");
      localStorage.setItem("theme", "light");
      state.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      if (meta)
        meta.setAttribute("content", "#101010");
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

export function useEnableMotion() {
  if (typeof window !== "undefined") {
    // Check for reduced enableMotion preference
    const userenableMotion = localStorage.getItem("enableMotion");
    const systemenableMotion = window.matchMedia(
      `(prefers-reduced-enableMotion: reduce)`
    ).matches;

    if (userenableMotion === "true" || systemenableMotion) {
      document.body.classList.remove(
        "animate-[noise_0.1s_infinite_steps(200)]"
      );
      state.enableMotion = true;
      return;
    } else {
      document.body.classList.add("animate-[noise_0.1s_infinite_steps(200)]");
      return;
    }
  }
}

export function useSong() {
  const { songIndex } = useSnapshot(state);
  const songs = useRef<any>([]);
  const [song, setSong] = useState("");

  useEffect(() => {
    getSongs().then((res) => (songs.current = res));
  }, []);

  useEffect(() => {
    getSongs().then((res) =>
      setSong(`${res[songIndex]?.artist} - ${res[songIndex]?.name}`)
    );
  }, [songIndex]);

  return [song, songs.current];
}

//AUDIO
export function loadSong(current: any, song: any) {
  state.loading = true;
  let audio = current.current;
  getDownloadURL(ref(storage, `info/songs/${song.name}.mp3`))
    .then((url) => {
      song.url = url;
      audio.setAttribute("src", url);
      state.loading = false;
      audio.play();
      state.playing = true;
    })
    .catch((error) => {
      console.log(error);
    });
}
export function toggleMusic(current: any, songs: any) {
  let audio = current.current;

  if (audio.src.length === 0) {
    loadSong(current, songs[state.songIndex]);
  } else {
    if (state.playing === false) {
      state.playing = true;
      audio.play();
    } else if (state.playing === true) {
      state.playing = false;
      audio.pause();
    }
  }
  audio.onended = () => nextSong(current, songs);
}
export function nextSong(current: any, songs: any) {
  function next() {
    let audio = current.current;

    state.playing = false;
    audio.pause();

    if (state.songIndex < songs.length - 1) {
      state.songIndex += 1;
    } else {
      state.songIndex = 0;
    }
    if (!songs[state.songIndex].url) {
      loadSong(current, songs[state.songIndex]);
    } else {
      audio.setAttribute("src", songs[state.songIndex].url);
      audio.play();
    }
  }
  next();
  current.current.onEnded = () => next();
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
