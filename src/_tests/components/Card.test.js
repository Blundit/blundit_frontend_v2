import React from 'react';
import ReactDOM from 'react-dom';
import Card from './../../components/Card'

import { shallow } from 'enzyme'

it('Card: displays', () => {
  const component = shallow(<Card />)
  expect(component.length).toBe(1)
})