import React from 'react';
import AppLayout from '@layouts/AppLayout';
import TransactionList from '@components/TransactionList';
import withTransactionData from '@pages/withTransactionData';
import withBalanceData from '@pages/withBalanceData';
import BalanceHeader from './BalanceHeader';

interface Props {
  match: {
    params: {
      address: string;
    };
  };
}

const TransactionListWithData = withTransactionData(TransactionList);
const BalanceHeaderWithData = withBalanceData(BalanceHeader);

const Transactions: React.FC<Props> = ({ match: { params } }) => {
  return (
    <AppLayout
      customHeader={<BalanceHeaderWithData address={params.address} />}
    >
      <TransactionListWithData transactionsParams={params} />
    </AppLayout>
  );
};

export default Transactions;
