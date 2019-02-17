import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { GlobalState } from 'store';
import { fetchBalance } from '@store/transaction/actions';
import { fetchCurrencies } from '@store/currency/actions';
import { CurrencyGroupType } from 'currencyTypes';

interface Props {
  balance?: string | null;
  isFetching: boolean;
  address: string;
  currenciesMap: CurrencyGroupType;
  fetchBalance: (address: string) => void;
  fetchCurrencies: () => void;
}

function withData(WrappedComponent: any) {
  class ComponentWithData extends PureComponent<Props> {
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
  return connect(
    (state: GlobalState) => ({
      isFetching: state.transaction.isFetchingBalance,
      balance: state.transaction.balance,
      currenciesMap: state.currency.currenciesMap,
    }),
    { fetchBalance, fetchCurrencies },
  )(ComponentWithData);
}

export default withData;
