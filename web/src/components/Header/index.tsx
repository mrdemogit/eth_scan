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

interface Props {
  balance: boolean;
}

class Header extends Component<Props> {
  render() {
    const { balance } = this.props;
    return (
      <WrapperStyled>
        <HeaderStyled>My Portfolio</HeaderStyled>
        <HeaderInfo>
          {balance ? '4411eth' : 'Enter an Ethereum address to get started'}
        </HeaderInfo>
      </WrapperStyled>
    );
  }
}

export default Header;
