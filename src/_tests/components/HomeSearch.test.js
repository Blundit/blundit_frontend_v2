import React from 'react';
import ReactDOM from 'react-dom';
import HomeSearch from './../../components/HomeSearch'

import { shallow } from 'enzyme'

it('HomeSearch: displays', () => {
  const component = shallow(<HomeSearch />)
  expect(component.length).toBe(1)
})