import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { GlobalState } from 'store';
import { fetchBalance } from '@store/transaction/actions';

interface Props {
  balance: string | null;
  isFetching: boolean;
  address: string;
  fetchBalance: (address: string) => void;
}

function withData(WrappedComponent: any) {
  class ComponentWithData extends PureComponent<Props> {
    componentDidMount() {
      const { address, fetchBalance } = this.props;
      fetchBalance(address);
    }

    render() {
      const { balance, isFetching } = this.props;
      return <WrappedComponent balance={balance} isFetching={isFetching} />;
    }
  }
  return connect(
    (state: GlobalState) => ({
      isFetching: state.transaction.isFetchingBalance,
      balance: state.transaction.balance,
    }),
    { fetchBalance },
  )(ComponentWithData);
}

export default withData;
