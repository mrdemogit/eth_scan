import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { TransactionType } from 'transactionTypes';
import moment from 'moment';
import { formatEthValue } from '@utils/index';

const formatTime = (timeStamp: number) => {
  const txTime = moment(timeStamp * 1000);
  const weekLimit = moment().add(-1, 'week');
  const currentYear = moment().year();
  const txYear = txTime.year();
  if (currentYear !== txYear) {
    return txTime.format('MMM YYYY');
  }
  return txTime.isBefore(weekLimit)
    ? txTime.format('MMM DD')
    : txTime.fromNow();
};

const ItemStyled = styled.div`
  display: flex;
  padding: 20px 0;
  margin: 0 20px;
  max-width: 480px;
  border-bottom: 1px solid #5f5f5f;
  width: 100%;
  text-align: left;
`;

const CurrencyStyled = styled.div`
  border-radius: 3rem;
  background: linear-gradient(#baa8a8, #958686);
  padding: 13px 0;
  font-size: 17px;
  min-width: 45px;
  height: 19px;
  margin: 0.3rem 1rem;
  text-align: center;
`;

const ContentStyled = styled.div`
  width: calc(100% - 90px);
`;

const ValueStyled = styled.div`
  font-size: 20px;
`;

const AddressStyled = styled.div`
  text-transform: uppercase;
  margin: 0.2rem 0;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding-right: 10px;
`;

const ValueAndTime = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TimeStyled = styled.div`
  color: #a5a5a5;
  font-size: 14px;
`;

const Arrow = styled.span`
  transform: rotate(45deg);
  content: ' ';
  display: block;
  width: 8px;
  height: 8px;
  float: right;
  border: 2px solid #afafaf;
  border-bottom: none;
  border-left: none;
  margin-top: 3px;
  margin-left: 8px;
`;

const TransactionItem: React.FC<TransactionType> = ({
  value,
  hash,
  timeStamp,
  from,
  to,
}) => (
  <ItemStyled>
    <CurrencyStyled>ETH</CurrencyStyled>
    <ContentStyled>
      <ValueAndTime>
        <ValueStyled>{formatEthValue(value)} ETH</ValueStyled>
        <TimeStyled>
          {formatTime(parseInt(timeStamp, 10))} <Arrow />
        </TimeStyled>
      </ValueAndTime>
      {hash === from ? (
        <React.Fragment>
          <AddressStyled>Sent to</AddressStyled>
          <AddressStyled>{to}</AddressStyled>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <AddressStyled>Received from</AddressStyled>
          <AddressStyled>{from}</AddressStyled>
        </React.Fragment>
      )}
    </ContentStyled>
  </ItemStyled>
);

export default memo(TransactionItem);
