import { VFC, useState } from "react";
import { ContentWrapper } from "@src/components/wrapper/ContentWrapper";
import { HeaderNavigation } from "@src/components/header/HeaderNavigation";
import { noScroll, retrunScroll } from "@src/utils/controlScrolling";
import { mediaQuery } from "@src/styles/mediaQuery";
import styled, { css } from "styled-components";
import Link from "next/link";

export const SiteHeader: VFC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navMenu = [
    { link: "/featuredBlog", navigationItem: "注目記事" },
    { link: "/studentBlog", navigationItem: "生徒ブログ" },
    { link: "/teacherBlog", navigationItem: "教師ブログ" },
  ] as const;

  return (
    <>
      <ContentWrapper>
        <Header>
          <SiteLogo>
            <Link href="/">
              <a>
                <img src="/images/HAL.webp" alt="logo" />
              </a>
            </Link>
          </SiteLogo>
          <Navigation>
            <ul>
              <HeaderNavigation item="注目記事" link="/featuredBlog" />
              <HeaderNavigation item="生徒ブログ" link="/studentBlog" />
              <HeaderNavigation item="教師ブログ" link="/teacherBlog" />
            </ul>
          </Navigation>
        </Header>
      </ContentWrapper>
      <SpSiteHeader aria-expanded={isOpen}>
        <SpSiteHeaderMenu
          aria-expanded={isOpen}
          onClick={() => {
            setIsOpen(!isOpen);
            isOpen ? retrunScroll() : noScroll();
          }}
        >
          <MemuBackground isOpen={isOpen}>
            <HamburgerImage
              src="/images/hamburger.png"
              alt="hamburger"
              isOpen={isOpen}
            />
            <CloseImage
              src="/images/close.png"
              alt="hamburger"
              isOpen={isOpen}
            />
          </MemuBackground>
        </SpSiteHeaderMenu>

        <SpNavigation
          className="site-header__sp-navigation"
          aria-expanded={isOpen}
        >
          <SpNavigationContainer>
            {navMenu.map((value, index) => (
              <li key={index}>
                <Link href={value.link}>
                  <a
                    onClick={() => {
                      setIsOpen(!isOpen), retrunScroll();
                    }}
                  >
                    {value.navigationItem}
                  </a>
                </Link>
              </li>
            ))}
          </SpNavigationContainer>
        </SpNavigation>
      </SpSiteHeader>
    </>
  );
};

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88px;
  ${mediaQuery.md`
    display: none;
  `}
`;

const SiteLogo = styled.h1`
  width: 180px;
  line-height: 1.5px;
`;

const Navigation = styled.nav`
  > ul {
    display: flex;
  }
`;

const SpSiteHeader = styled.header`
  display: none;
  ${mediaQuery.md`
    width: 100%;
    display: block;
    position: absolute;
  `}
`;

const SpSiteHeaderMenu = styled.div`
  position: relative;
  top: 8px;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 1.5rem;
  transition: 0.3s;
  z-index: 101;
`;

const MemuBackground = styled.div<{ isOpen: boolean }>`
  ${({ isOpen }) =>
    isOpen
      ? css`
          position: relative;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin: 0 0 0 auto;
          display: grid;
          place-items: center;
          transition: 0.3s;
          img {
            position: absolute;
            transition: 0.3s;
            width: 20px;
          }
        `
      : css`
          position: relative;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin: 0 0 0 auto;
          display: grid;
          place-items: center;
          transition: 0.3s;
          img {
            position: absolute;
            transition: 0.3s;
            width: 20px;
          }
        `}
`;

const HamburgerImage = styled.img<{ isOpen: boolean }>`
  ${({ isOpen }) =>
    isOpen
      ? css`
          opacity: 0;
        `
      : css`
          opacity: 1;
        `}
`;

const CloseImage = styled.img<{ isOpen: boolean }>`
  ${({ isOpen }) =>
    isOpen
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0;
        `}
`;

const SpNavigation = styled.nav`
  display: flex;
  align-items: center;
  margin: 0 0 0 auto;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  &[aria-expanded="false"] {
    visibility: hidden;
    opacity: 0;
    transition: 0.3s;
    background-color: ${({ theme }) => theme.colors.primary.white};
  }
  &[aria-expanded="true"] {
    width: 100%;
    visibility: visible;
    opacity: 1;
    transition: 0.3s;
    background-color: ${({ theme }) => theme.colors.primary.gray};
  }
`;

const SpNavigationContainer = styled.ul`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.normalL};
  color: ${({ theme }) => theme.colors.primary.white};
  width: 75%;
  height: 100%;
  margin: 0 auto;
  padding: 40% 0;
  li {
    width: 100%;
    margin-bottom: 40px;
    margin-left: 0;
    a {
      width: 100%;
      display: inline-block;
    }
  }
`;
