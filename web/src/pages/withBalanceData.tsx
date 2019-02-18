import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { GlobalState } from 'store';
import { fetchBalance } from '@store/transaction/actions';
import { fetchCurrencies } from '@store/currency/actions';
import { CurrencyGroupType } from 'currencyTypes';

interface PropsFromState {
  balance?: string | null;
  isFetching: boolean;
  currenciesMap: CurrencyGroupType;
}

interface PropsFromDispatch {
  fetchBalance: typeof fetchBalance;
  fetchCurrencies: typeof fetchCurrencies;
}

interface OwnProps {
  address: string;
}

interface AllProps extends PropsFromState, PropsFromDispatch, OwnProps {}

function withData(WrappedComponent: any) {
  class ComponentWithData extends PureComponent<AllProps> {
    componentDidMount() {
      const { address, fetchBalance, fetchCurrencies } = this.props;
      fetchCurrencies();
      fetchBalance(address);
    }

    render() {
      const { balance, isFetching, currenciesMap } = this.props;
      return (
        <WrappedComponent
          currenciesMap={currenciesMap}
          balance={balance}
          isFetching={isFetching}
        />
      );
    }
  }
  return connect<PropsFromState, PropsFromDispatch, OwnProps, GlobalState>(
    state => ({
      isFetching: state.transaction.isFetchingBalance,
      balance: state.transaction.balance,
      currenciesMap: state.currency.currenciesMap,
    }),
    { fetchBalance, fetchCurrencies },
  )(ComponentWithData);
}

export default withData;
