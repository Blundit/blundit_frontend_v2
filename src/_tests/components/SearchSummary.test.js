import React from 'react';
import ReactDOM from 'react-dom';
import SearchSummary from './../../components/SearchSummary'

import { shallow } from 'enzyme'

it('SearchSummary: displays', () => {
  const component = shallow(<SearchSummary />)
  expect(component.length).toBe(1)
})