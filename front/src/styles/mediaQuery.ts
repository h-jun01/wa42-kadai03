import {
  css,
  CSSObject,
  FlattenSimpleInterpolation,
  SimpleInterpolation,
} from "styled-components";

type Media = "xs" | "sm" | "md" | "lg" | "xl";

type Breakpoints = {
  [T in Media]: number;
};

const breakpoints: Breakpoints = {
  xs: 400,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1024,
};

export const mediaQuery = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (
    first: TemplateStringsArray | CSSObject,
    ...interpolations: SimpleInterpolation[]
  ): FlattenSimpleInterpolation => css`
    @media (max-width: ${breakpoints[label]}px) {
      ${css(first, ...interpolations)}
    }
  `;

  return acc;
}, {} as { [T in Media]: Function });
