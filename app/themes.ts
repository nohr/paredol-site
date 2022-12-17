import { DefaultTheme } from "styled-components";
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    ui: {
      main: string;
      secondary: string;
      hover: string;
      active: string;
      tertiary: string;
      background: string;
    };
    canvas: {
      env: string;
      cd: {
        color: string;
        roughness: number;
      }
      fog: {
        color: string;
        far: number;
      }
      surface: {
        color: string;
        roughness: number;
        mirror: number;
      };
      spotlight: string;
      rectIntensity: number;
      spotIntensity: number;
      ambIntensity: number;
    };
  }
}

export const light: DefaultTheme = {
  ui: {
    main: `#151515`,
    secondary: `hsl(209, 100%, 20%)`,
    hover: `hsla(209, 100%, 20%, 0.67)`,
    active: `#5e5e5ed6`,
    tertiary: `#C1C2C267`,
    background: `#ffffff`,
  },
  canvas: {
    env:"/hdri/puresky.hdr",
    cd: {
      color: `hsla(14, 31%, 84%, 1)`,
      roughness: 0.3,
  },
    fog: {
      color: `#ffffff`,
      far: 25,
  },
    surface: {
      color: `hsla(209, 100%, 80%, 1)`,
      roughness: 0,
      mirror: 0.15,
  },
    spotlight: `#ffffff`,
    rectIntensity: 2,
    spotIntensity: 0.6,
    ambIntensity: 0.3,
  },
};

export const dark: DefaultTheme = {
  ui: {
    main: `#C1C2C2`,
    secondary: `hsl(209, 31%, 80%)`,
    hover: `hsla(209, 31%, 80%, 0.67)`,
    active: `#ebebeb97`,
    tertiary: `#C1C2C267`,
    background: `#000000`,
  },
  canvas: {
    env: "/hdri/moonless.hdr",
    cd: {
      color: `hsla(0, 0%, 14%, 1)`,
      roughness: 0.1389,
  },
    fog: {
      color: `#000000`,
      far: 20,
  },
    surface: {
      color: `hsla(209, 31%, 40%, 1)`,
      roughness: 30,
      mirror: 0.28,
  },
    spotlight: `hsla(209, 31%, 70%, 1)`,
    rectIntensity: 0.5,
    spotIntensity: 0.5,
    ambIntensity: 0.8,
  },
};
