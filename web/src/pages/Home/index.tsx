import React, { Component } from 'react';
import SearchBar from '@components/SearchBar';
import styled from 'styled-components/macro';
import { TextButton } from '@components/buttons';
import ethereumAddress from 'ethereum-address';

interface Props {
  children: React.ReactNode;
}

const SearchBarWrapper = styled.div`
  padding-top: 1rem;
`;

const TextButtonWrapper = styled.div`
  padding: 1rem;
`;

const ErrorText = styled.div`
  padding: 0.2rem;
  color: red;
`;

class Home extends Component {
  state = {
    error: null,
  };

  validateSearch = (searchValue: string) => {
    if (searchValue && !ethereumAddress.isAddress(searchValue)) {
      this.setState({
        error: 'Invalid ethereum address',
      });
    }
  };

  render() {
    const { error } = this.state;
    return (
      <React.Fragment>
        <SearchBarWrapper>
          <SearchBar
            placeholder="Your Ethereum Address"
            onChange={value => console.log(value)}
            onBlur={this.validateSearch}
          />
          <ErrorText>{error}</ErrorText>
        </SearchBarWrapper>
        <TextButtonWrapper>
          <TextButton>Continue</TextButton>
        </TextButtonWrapper>
      </React.Fragment>
    );
  }
}

export default Home;
