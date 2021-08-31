import "styled-components";

export const styledTheme = {
  fontSizes: {
    xSmall: "10px",
    small: "12px",
    normalS: "14px",
    normal: "16px",
    normalL: "18px",
    large: "24px",
    xlarge: "32px",
  },
  colors: {
    primary: {
      black: "#2c2c2c",
      white: "#fff",
      gray: "#ABABAB",
      blue: "#80BDF7",
      red: "#FB5C5C",
      green: "#7FE2B2",
      link: "#3283FD",
    },
    secondary: {
      gray: "#2C2C2C",
    },
  },
} as const;

type AppTheme = typeof styledTheme;

declare module "styled-components" {
  interface DefaultTheme extends AppTheme {}
}
