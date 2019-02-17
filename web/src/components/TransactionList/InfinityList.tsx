import React, { Component } from 'react';
import styled from 'styled-components/macro';
import { TransactionType } from 'transactionTypes';
import InfiniteScroll from 'react-infinite-scroller';
import { OFFSET } from '../../Datasource';

const ListStyled = styled.div`
  background: #353535;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

interface Props {
  transactions: TransactionType[];
  children: (values: TransactionType[]) => React.ReactNode;
}

interface State {
  renderedTransactions: TransactionType[];
}

class InfinityList extends Component<Props, State> {
  state = {
    renderedTransactions: this.props.transactions,
  };

  loadMore = (page: number) => {
    console.log('fired', page);
    const { transactions } = this.props;
    const start = page * OFFSET;
    const end = start + OFFSET;
    this.setState(({ renderedTransactions }) => ({
      renderedTransactions: [
        ...renderedTransactions,
        ...transactions.slice(start, end),
      ],
    }));
  };

  render() {
    const { renderedTransactions } = this.state;
    const { children, transactions } = this.props;
    return (
      <ListStyled>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMore}
          hasMore={renderedTransactions.length !== transactions.length}
          loader={<div key={0}>Loading ...</div>}
        >
          {children(renderedTransactions)}
        </InfiniteScroll>
      </ListStyled>
    );
  }
}

export default InfinityList;
