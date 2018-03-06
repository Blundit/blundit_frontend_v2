import React from 'react';
import ReactDOM from 'react-dom';
import SearchExperts from './../../components/SearchExperts'

import { shallow } from 'enzyme'

it('SearchExperts: displays', () => {
  const component = shallow(<SearchExperts />)
  expect(component.length).toBe(1)
})