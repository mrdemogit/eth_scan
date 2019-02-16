import React from 'react';
import styled from 'styled-components';
import Header from '@components/Header';

interface Props {
  children: React.ReactNode;
}

const LayoutStyled = styled.div`
  color: red;
`;

const Layout: React.FC<Props> = ({ children }) => (
  <LayoutStyled>
    <Header />
    {children}
  </LayoutStyled>
);

export default Layout;
