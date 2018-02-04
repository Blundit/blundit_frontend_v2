import React from 'react';
import ReactDOM from 'react-dom';
import Contact from './../../views/Contact'

import { shallow } from 'enzyme'

it('Contact: displays', () => {
  const component = shallow(<Contact />)
  expect(component.length).toBe(1)
})