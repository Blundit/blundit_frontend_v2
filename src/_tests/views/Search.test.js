import React from 'react';
import ReactDOM from 'react-dom';
import Search from './../../views/Search'

import { shallow } from 'enzyme'

it('Search: displays', () => {
  const component = shallow(<Search />)
  expect(component.length).toBe(1)
})