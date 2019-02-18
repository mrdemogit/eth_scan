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
  address: string;
  error?: string;
  isFetching: boolean;
  transactions: TransactionType[];
}

const TransactionList: React.FC<Props> = ({
  address,
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
    <InfinityList address={address} transactions={transactions}>
      {transactions =>
        transactions.map(transaction => (
          <TransactionItem
            key={transaction.hash}
            address={address}
            {...transaction}
          />
        ))
      }
    </InfinityList>
  );
};

export default TransactionList;
