import React, { Component } from 'react';
import styled from 'styled-components/macro';

const WrapperStyled = styled.div`
  border-bottom: 0.01rem solid #979797;
  padding: 1rem;
`;

const HeaderStyled = styled.header`
  font-size: 2rem;
  padding: 1rem;
`;

const HeaderInfo = styled.div`
  font-size: 1rem;
  font-weight: 100;
`;

class Header extends Component {
  render() {
    return (
      <WrapperStyled>
        <HeaderStyled>My Portfolio</HeaderStyled>
        <HeaderInfo>Enter an Ethereum address to get started</HeaderInfo>
      </WrapperStyled>
    );
  }
}

export default Header;
