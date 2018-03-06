import React from 'react';
import ReactDOM from 'react-dom';
import SearchClaims from './../../components/SearchClaims'

import { shallow } from 'enzyme'

it('SearchClaims: displays', () => {
  const component = shallow(<SearchClaims />)
  expect(component.length).toBe(1)
})