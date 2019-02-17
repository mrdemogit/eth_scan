import React from 'react';
import styled from 'styled-components/macro';
import { TransactionType } from 'transactionTypes';
import TransactionItem from './TransactionItem';
import InfinityList from './InfinityList';

const ErrorStyled = styled.div`
  color: red;
  padding: 1rem;
`;

const LoadingStyled = styled.div`
  padding: 1rem;
`;

interface Props {
  error?: string;
  isFetching: boolean;
  transactions: TransactionType[];
}

const TransactionList: React.FC<Props> = ({
  error,
  transactions,
  isFetching,
}) => {
  if (error) {
    return <ErrorStyled>{error}</ErrorStyled>;
  }
  if (isFetching) {
    return <LoadingStyled>Loading...</LoadingStyled>;
  }
  return (
    <InfinityList transactions={transactions}>
      {transactions =>
        transactions.map(transaction => (
          <TransactionItem key={transaction.hash} {...transaction} />
        ))
      }
    </InfinityList>
  );
};

export default TransactionList;
