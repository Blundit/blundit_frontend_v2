import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './../../components/Footer'

import { shallow } from 'enzyme'

it('Footer: displays', () => {
  const component = shallow(<Footer />)
  expect(component.length).toBe(1)
})