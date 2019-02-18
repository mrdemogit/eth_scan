import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { TransactionsParamsType, TransactionState } from 'transactionTypes';
import { GlobalState } from 'store';
import { fetchTransactions } from '@store/transaction/actions';

interface PropsFromState extends TransactionState {}

interface PropsFromDispatch {
  fetchTransactions: typeof fetchTransactions;
}

interface OwnProps {
  transactionsParams: TransactionsParamsType;
}

interface AllProps extends PropsFromState, PropsFromDispatch, OwnProps {}

function withData(WrappedComponent: any) {
  class ComponentWithData extends PureComponent<AllProps> {
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
  return connect<PropsFromState, PropsFromDispatch, OwnProps, GlobalState>(
    ({ transaction: { balance, ...restTransaction } }) => ({
      ...restTransaction,
    }),
    { fetchTransactions },
  )(ComponentWithData);
}

export default withData;
