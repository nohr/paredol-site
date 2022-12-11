import { DefaultTheme } from "styled-components";
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: string;

    colors: {
      main: string;
      secondary: string;
      hover: string;
      active: string;
      tertiary: string;
      background: string;
      surface: string;
    };
  }
}

export const light: DefaultTheme = {
  borderRadius: "5px",

  colors: {
    main: `#151515`,
    secondary: `hsl(209, 100%, 20%)`,
    hover: `hsla(209, 100%, 20%, 0.67)`,
    active: `#5e5e5e67`,
    tertiary: `#C1C2C267`,
    background: `#ffffff`,
    surface: `hsla(209, 100%, 80%, 1)`,
  },
};

export const dark: DefaultTheme = {
  borderRadius: "5px",

  colors: {
    main: `#C1C2C2`,
    secondary: `hsl(209, 31%, 80%)`,
    hover: `hsla(209, 31%, 80%, 0.67)`,
    active: `#ebebeb67`,
    tertiary: `#C1C2C267`,
    background: `#000000`,
    surface: `hsla(209, 31%, 70%, 1)`,
  },
};
