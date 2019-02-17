import React from 'react';
import styled from 'styled-components/macro';
import HeaderComponent from '@components/Header';

const LayoutStyled = styled.div`
  margin-right: auto;
  margin-left: auto;
`;

interface Props {
  customHeader?: React.ReactNode;
  children: React.ReactNode;
  balance?: boolean;
}

const AppLayout: React.FC<Props> = ({ children, customHeader }) => (
  <React.Fragment>
    <HeaderComponent custom={customHeader} />
    <LayoutStyled>{children}</LayoutStyled>
  </React.Fragment>
);

export const Header = {
  BALANCE: 'BALANCE',
};

export default AppLayout;
