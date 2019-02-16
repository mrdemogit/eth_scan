import React, { PureComponent } from 'react';
import { TransactionsParamsType, TransactionType } from 'transactionTypes';
import { fetchTransactions } from '../Datasource';

interface Props {
  transactionsParams: TransactionsParamsType;
}

interface State {
  transactions: TransactionType[] | null;
  error: string | null;
}

function withData(WrappedComponent: any) {
  class ComponentWithData extends PureComponent<Props, State> {
    state = {
      transactions: null,
      error: null,
    };

    componentDidMount() {
      const { transactionsParams } = this.props;
      fetchTransactions(transactionsParams).subscribe(
        data => this.setTransactions(data.response.result),
        data => this.setError(data.response.error),
      );
    }

    setTransactions = (transactions: TransactionType[]) => {
      this.setState({ transactions, error: null });
    };

    setError = (error: string) => {
      this.setState({ error });
    };

    render() {
      return <WrappedComponent {...this.state} {...this.props} />;
    }
  }
  return ComponentWithData;
}

export default withData;
