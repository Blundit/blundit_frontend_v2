import React from 'react';
import ReactDOM from 'react-dom';
import Experts from './../../views/Experts'

import { shallow } from 'enzyme'

it('Experts: displays', () => {
  const component = shallow(<Experts />)
  expect(component.length).toBe(1)
})