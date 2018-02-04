import React from 'react';
import ReactDOM from 'react-dom';
import Login from './../../views/Login'

import { shallow } from 'enzyme'

it('Login: displays', () => {
  const component = shallow(<Login />)
  expect(component.length).toBe(1)
})