import { FC, useMemo } from "react";
import { ContentWrapper } from "@src/components/wrapper/ContentWrapper";
import { mediaQuery } from "@src/styles/mediaQuery";
import styled from "styled-components";

export const SiteFooter: FC = () => {
  const fullYear: number = useMemo<number>(() => {
    const d: Date = new Date();

    return d.getFullYear();
  }, []);

  return (
    <FooterContainer>
      <ContentWrapper>
        <Copyright>©{fullYear} HAL Blog</Copyright>
      </ContentWrapper>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  position: relative;
  height: 200px;
`;

const Copyright = styled.small`
  position: absolute;
  left: 50%;
  bottom: 40px;
  transform: translateX(-50%);
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary.black};
  ${mediaQuery.sm`
    bottom: 32px;
  `}
`;
