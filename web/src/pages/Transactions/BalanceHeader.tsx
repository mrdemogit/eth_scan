import React from 'react';
import { formatEthValue } from '@utils/index';

interface Props {
  error?: string;
  isFetching: boolean;
  balance: string;
}

const BalanceHeader: React.FC<Props> = ({ balance }) => {
  return <React.Fragment>{formatEthValue(balance)} ETH</React.Fragment>;
};

export default BalanceHeader;
