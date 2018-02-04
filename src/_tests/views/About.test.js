import React from 'react';
import ReactDOM from 'react-dom';
import About from './../../views/About'

import { shallow } from 'enzyme'

it('About: displays', () => {
  const component = shallow(<About />)
  expect(component.length).toBe(1)
})