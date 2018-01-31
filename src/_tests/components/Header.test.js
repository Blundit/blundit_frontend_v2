import React from 'react';
import ReactDOM from 'react-dom';
import Header from './../../components/Header'

import { shallow } from 'enzyme'

it('Header: displays', () => {
  const component = shallow(<Header />)
  expect(component.length).toBe(1)
})