import React from 'react';
import styled from 'styled-components/macro';
import { TransactionType } from 'transactionTypes';

const ListStyled = styled.div``;

const ErrorStyled = styled.div`
  color: red;
  padding: 1rem;
`;

const LoadingStyled = styled.div`
  padding: 1rem;
`;

interface Props {
  error?: string;
  fetching: boolean;
  transactions: TransactionType[];
}

const TransactionList: React.FC<Props> = ({ error, transactions }) => {
  if (error) {
    return <ErrorStyled>{error}</ErrorStyled>;
  }
  if (!transactions) {
    return <LoadingStyled>Loading...</LoadingStyled>;
  }
  return <ListStyled>gagea</ListStyled>;
};

export default TransactionList;
