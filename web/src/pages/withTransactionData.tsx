import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { TransactionsParamsType, TransactionState } from 'transactionTypes';
import { GlobalState } from 'store';
import { fetchTransactions } from '@store/transaction/actions';

interface Props extends TransactionState {
  transactionsParams: TransactionsParamsType;
  fetchTransactions: (params: TransactionsParamsType) => void;
}

function withData(WrappedComponent: any) {
  class ComponentWithData extends PureComponent<Props> {
    componentDidMount() {
      const { transactionsParams, fetchTransactions } = this.props;
      fetchTransactions(transactionsParams);
    }

    render() {
      const {
        order,
        transactionsMap,
        error,
        isFetching,
        transactionsParams: { address },
      } = this.props;
      const transactions = order.map((id: string) => transactionsMap[id]);
      return (
        <WrappedComponent
          address={address}
          error={error}
          transactions={transactions}
          order={order}
          isFetching={isFetching}
        />
      );
    }
  }
  return connect(
    ({ transaction: { balance, ...restTransaction } }: GlobalState) => ({
      ...restTransaction,
    }),
    { fetchTransactions },
  )(ComponentWithData);
}

export default withData;
