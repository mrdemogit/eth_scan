import React from 'react';
import AppLayout from '@layouts/AppLayout';
import TransactionList from '@components/TransactionList';
import withTransactionData from '@pages/withTransactionData';

interface Props {
  match: {
    params: {
      address: string;
    };
  };
}

const TransactionListWithData = withTransactionData(TransactionList);

const Transactions: React.FC<Props> = ({ match: { params } }) => {
  return (
    <AppLayout balance>
      <TransactionListWithData transactionsParams={params} />
    </AppLayout>
  );
};

export default Transactions;
