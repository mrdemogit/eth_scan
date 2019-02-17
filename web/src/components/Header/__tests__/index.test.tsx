import React from 'react';
import { render } from 'react-testing-library';
import Header from '../index';

describe('Header', () => {
  it('Render default header', () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });

  it('Render custom header', () => {
    const { container } = render(<Header custom={<div>My Header</div>} />);
    expect(container).toMatchSnapshot();
  });
});
