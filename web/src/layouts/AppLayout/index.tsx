import React from 'react';
import styled from 'styled-components/macro';
import HeaderComponent from '@components/Header';

const LayoutStyled = styled.div`
  margin-right: auto;
  margin-left: auto;
  max-width: 840px;
`;

interface Props {
  children: React.ReactNode;
  balance?: boolean;
}

const AppLayout: React.FC<Props> = ({ children, balance = false }) => (
  <React.Fragment>
    <HeaderComponent balance={balance} />
    <LayoutStyled>{children}</LayoutStyled>
  </React.Fragment>
);

export const Header = {
  BALANCE: 'BALANCE',
};

export default AppLayout;
