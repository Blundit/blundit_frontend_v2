import React from 'react';
import ReactDOM from 'react-dom';
import Home from './../../views/Home'

import { shallow } from 'enzyme'

it('Home: displays', () => {
  const component = shallow(<Home />)
  expect(component.length).toBe(1)
})