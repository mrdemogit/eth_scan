import React from 'react';
import styled from 'styled-components/macro';
import Header from '@components/Header';

interface Props {
  children: React.ReactNode;
}

const LayoutStyled = styled.div`
  margin-right: auto;
  margin-left: auto;
  max-width: 840px;
`;

const AppLayout: React.FC<Props> = ({ children }) => (
  <React.Fragment>
    <Header />
    <LayoutStyled>{children}</LayoutStyled>
  </React.Fragment>
);

export default AppLayout;
