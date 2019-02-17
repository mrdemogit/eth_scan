import React, { Component } from 'react';
import SearchBar from '@components/SearchBar';
import styled from 'styled-components/macro';
import ethereumAddress from 'ethereum-address';
import AppLayout from '@layouts/AppLayout';
import { Link } from 'react-router-dom';

const TextLink = styled(Link)`
  background: inherit;
  color: #fff;
  cursor: pointer;
  outline: none;
  text-decoration: none;
`;

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

const GrayText = styled.div`
  color: gray;
  font-size: 0.8rem;
`;

interface Props {
  children: React.ReactNode;
}

interface State {
  error: string | null;
  address: string;
}

class Home extends Component<Props, State> {
  state = {
    error: null,
    address: '',
  };

  setAddress = (address: string) => {
    this.setState({ address });
  };

  validateSearch = (searchValue: string) => {
    if (searchValue && !ethereumAddress.isAddress(searchValue)) {
      this.setState({
        error: 'Invalid ethereum address',
      });
    }
  };

  render() {
    const { error, address } = this.state;
    return (
      <AppLayout>
        <SearchBarWrapper>
          <GrayText>
            (for testing: 0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae)
          </GrayText>
          <SearchBar
            placeholder="Your Ethereum Address"
            onChange={this.setAddress}
            onBlur={this.validateSearch}
          />
          <ErrorText>{error}</ErrorText>
        </SearchBarWrapper>
        <TextButtonWrapper>
          <TextLink to={`/${address}`}>Continue</TextLink>
        </TextButtonWrapper>
      </AppLayout>
    );
  }
}

export default Home;
