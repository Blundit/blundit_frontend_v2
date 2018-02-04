import React from 'react';
import ReactDOM from 'react-dom';
import EditProfile from './../../views/EditProfile'

import { shallow } from 'enzyme'

it('EditProfile: displays', () => {
  const component = shallow(<EditProfile />)
  expect(component.length).toBe(1)
})