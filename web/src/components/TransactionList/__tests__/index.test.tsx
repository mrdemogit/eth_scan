import React from 'react';
import { render } from 'react-testing-library';
import TransactionList from '../index';

describe('TransactionList', () => {
  jest.mock('moment', () => () => ({
    format: () => '2018–01–30T12:34:56+00:00',
  }));

  const formatTime = () => 'time';
  it('Render empty TransactionList', () => {
    const { container } = render(
      <TransactionList error={null} transactions={[]} isFetching={false} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Render error TransactionList', () => {
    const { container } = render(
      <TransactionList
        error={'Error!!!!'}
        transactions={[]}
        isFetching={false}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Render Loading TransactionList', () => {
    const { container } = render(
      <TransactionList error={null} transactions={[]} isFetching={true} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Render Loading TransactionList', () => {
    const { container } = render(
      <TransactionList
        error={null}
        transactions={[
          {
            value: '3234',
            hash: 'grsg42t4$$24',
            timeStamp: 1550415453,
            from: 'fromaddress',
            to: 'toAddress',
          },
        ]}
        isFetching={false}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
