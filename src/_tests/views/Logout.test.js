import React from 'react';
import ReactDOM from 'react-dom';
import Logout from './../../views/Logout'

import { shallow } from 'enzyme'

it('Logout: displays', () => {
  const component = shallow(<Logout />)
  expect(component.length).toBe(1)
})