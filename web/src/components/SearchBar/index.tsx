import React, { ChangeEvent } from 'react';
import styled from 'styled-components/macro';

const SearchInputStyled = styled.input`
  padding: 1rem 0;
  background: #353535;
  border: none;
  box-shadow: inset 0 0 0.5px #f7f7f7;
  width: 100%;
  font-size: 1rem;
  text-align: center;
  color: #fff;
`;

interface Props {
  onChange: (e: string) => void;
  onBlur: (e: string) => void;
  placeholder: string;
}

const SearchBar: React.FC<Props> = ({ onChange, onBlur, ...props }) => (
  <SearchInputStyled
    {...props}
    onChange={e => onChange(e.target.value)}
    onBlur={e => onBlur(e.target.value)}
  />
);

export default SearchBar;