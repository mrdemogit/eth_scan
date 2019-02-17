import React from 'react';
import { render } from 'react-testing-library';
import SearchBar from '../index';

describe('SearchBar', () => {
  it('Render default SearchBar', () => {
    const { container } = render(
      <SearchBar
        placeholder="placeholder"
        onChange={() => {}}
        onBlur={() => {}}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
