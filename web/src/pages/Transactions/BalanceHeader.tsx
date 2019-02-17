import React, { Component } from 'react';
import { formatEthValue } from '@utils/index';
import { CurrencyGroupType } from 'currencyTypes';
import { FormattedNumber } from 'react-intl';
import styled from 'styled-components/macro';
import { getCurrencyName } from '@utils/index';

const HeaderStyle = styled.div`
  position: relative;
`;

const ValueStyled = styled.span`
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
`;

const SelectStyled = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 150px;
  background: #f3f2f2;
  color: black;
  font-weight: normal;
  z-index: 1;
  border-radius: 5px;
`;

const OptionStyled = styled.div`
  position: relative;
  padding: 5px;
  cursor: pointer;
  background: ${({ selected }: { selected: boolean }) => selected && '#d4d4d4'};
  :hover {
    font-weight: bold;
  }
`;

const Arrow = styled.span`
  transform: ${({ isOpen }: { isOpen: boolean }) =>
    isOpen ? 'rotate(135deg)' : 'rotate(45deg)'};
  content: ' ';
  display: block;
  width: 6px;
  height: 6px;
  border: 2px solid #afafaf;
  border-bottom: none;
  border-left: none;
  margin-top: ${({ isOpen }: { isOpen: boolean }) => (isOpen ? '2px' : '4px')};
  margin-left: 8px;
`;

interface Props {
  error?: string;
  isFetching: boolean;
  balance: string;
  currenciesMap: CurrencyGroupType;
}

interface State {
  selectedCurrency: string;
  isToggleSelect: boolean;
}

class BalanceHeader extends Component<Props, State> {
  state = {
    selectedCurrency: 'SGD', //TODO hardcoded initial value
    isToggleSelect: false,
  };

  toogle = () => {
    this.setState(({ isToggleSelect }) => ({
      isToggleSelect: !isToggleSelect,
    }));
  };

  changeCurrency = (currency: string) => {
    this.setState({
      selectedCurrency: currency,
      isToggleSelect: false,
    });
  };

  render() {
    const { selectedCurrency, isToggleSelect } = this.state;
    const { balance, currenciesMap } = this.props;
    const ethBalance = formatEthValue(balance);

    const currencyBalance = currenciesMap[selectedCurrency] * ethBalance || 0;
    return (
      <HeaderStyle>
        <ValueStyled onClick={this.toogle}>
          <FormattedNumber
            value={currencyBalance}
            style="currency"
            currency={selectedCurrency}
            minimumFractionDigits={2}
            maximumFractionDigits={2}
          />
          <Arrow isOpen={isToggleSelect} />
        </ValueStyled>

        {isToggleSelect && (
          <SelectStyled>
            {Object.keys(currenciesMap).map(currency => (
              <OptionStyled
                key={currency}
                selected={selectedCurrency === currency}
                onClick={() => this.changeCurrency(currency)}
              >
                {getCurrencyName(currency)}
              </OptionStyled>
            ))}
          </SelectStyled>
        )}
      </HeaderStyle>
    );
  }
}

export default BalanceHeader;
