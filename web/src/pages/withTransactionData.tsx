import React, { PureComponent } from 'react';
import {
  TransactionsParamsType,
  TransactionMapType,
  TransactionGroupType,
} from 'transactionTypes';
import { fetchTransactions } from '../Datasource';
// @ts-ignore
import { mergeLeft } from 'ramda';

interface Props {
  transactionsParams: TransactionsParamsType;
}

interface State {
  transactionsMap: TransactionMapType | null;
  error: string | null;
  order: string[];
}

function withData(WrappedComponent: any) {
  class ComponentWithData extends PureComponent<Props, State> {
    state = {
      transactionsMap: {},
      error: null,
      order: [],
    };

    componentDidMount() {
      const { transactionsParams } = this.props;
      fetchTransactions(transactionsParams).subscribe(
        data => this.setTransactions(data.response),
        data => this.setError(data.response.error),
      );
    }

    setTransactions = (transactionsGroup: TransactionGroupType) => {
      this.setState(({ transactionsMap: prevTransactions }) => ({
        transactionsMap: mergeLeft(
          prevTransactions,
          transactionsGroup.transactionsMap,
        ),
        order: transactionsGroup.order,
        error: null,
      }));
    };

    setError = (error: string) => {
      this.setState({ error });
    };

    render() {
      const { order, transactionsMap, error } = this.state;
      const transactions = order.map(id => transactionsMap[id]);
      return (
        <WrappedComponent
          error={error}
          transactions={transactions}
          {...this.props}
        />
      );
    }
  }
  return ComponentWithData;
}

export default withData;
