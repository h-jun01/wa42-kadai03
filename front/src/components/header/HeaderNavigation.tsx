import { FC } from "react";
import Link from "next/link";
import styled from "styled-components";

type Props = {
  item: string;
  link: string;
};

export const HeaderNavigation: FC<Props> = ({ item, link }) => {
  return (
    <List>
      <Link href={link}>
        <a>{item}</a>
      </Link>
    </List>
  );
};

const List = styled.li`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.normalS};
  margin-left: 32px;
`;
