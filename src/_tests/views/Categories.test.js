import React from 'react';
import ReactDOM from 'react-dom';
import Categories from './../../views/Categories'

import { shallow } from 'enzyme'

it('Categories: displays', () => {
  const component = shallow(<Categories />)
  expect(component.length).toBe(1)
})