import React from 'react';
import ReactDOM from 'react-dom';
import Register from './../../views/Register'

import { shallow } from 'enzyme'

it('Register: displays', () => {
  const component = shallow(<Register />)
  expect(component.length).toBe(1)
})