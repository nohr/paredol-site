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
export const toggleMotion = (motion?: string) => {
  if (motion === "reduce") {
    state.motion = true;
    localStorage.setItem("motion", `true`);
    return;
  }

  if (state.motion) {
    document.body.classList.add("animate-[noise_0.1s_infinite_steps(200)]");
  } else {
    document.body.classList.remove("animate-[noise_0.1s_infinite_steps(200)]");
  }
  state.motion = !state.motion;
  localStorage.setItem("motion", `${state.motion}`);
};

export function useColor() {
  let [value, setValue] = useState(parseColor("hsl(209, 98%, 20%)"));
  useEffect(() => {
    state.hue = value.getChannelValue("hue");
  }, [value]);

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
    const docTheme: HTMLMetaElement | null = document.querySelector(
      "meta[name='theme-color']"
    );

    if (userTheme === "dark" || (!userTheme && systemDark)) {
      document.documentElement.classList.add("dark");
      if (docTheme) docTheme.content = "#101010";
      state.theme = "dark";
      return;
    } else {
      if (docTheme) docTheme.content = "#ebebeb";
      state.theme = "light";
    }
  }
};

export const toggleTheme = (theme?: string) => {
  if (typeof document !== "undefined") {
    const docTheme: HTMLMetaElement | null = document.querySelector(
      "meta[name='theme-color']"
    );
    if (
      document.documentElement.classList.contains("dark") ||
      theme === "light"
    ) {
      document.documentElement.classList.remove("dark");
      if (docTheme) docTheme.content = "#ebebeb";
      localStorage.setItem("theme", "light");
      state.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      if (docTheme) docTheme.content = "#101010";
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
      document.body.classList.remove(
        "animate-[noise_0.1s_infinite_steps(200)]"
      );
      state.motion = true;
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
