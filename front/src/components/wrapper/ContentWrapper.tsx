import { FC, ReactNode } from "react";
import { mediaQuery } from "@src/styles/mediaQuery";
import styled from "styled-components";

type Props = {
  children: ReactNode;
};

export const ContentWrapper: FC<Props> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 2.5rem;
  ${mediaQuery.md`
    padding: 0 1.5rem;
  `}
`;
