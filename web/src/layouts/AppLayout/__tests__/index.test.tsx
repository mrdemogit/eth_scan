import React from 'react';
import { render } from 'react-testing-library';
import Header from '../index';

describe('AppLayout', () => {
  it('Render default layout', () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
