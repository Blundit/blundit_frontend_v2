import React from 'react';
import ReactDOM from 'react-dom';
import InsideSearch from './../../components/InsideSearch'

import { shallow } from 'enzyme'

it('InsideSearch: displays', () => {
  const component = shallow(<InsideSearch />)
  expect(component.length).toBe(1)
})