import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from './../../components/Pagination'

import { shallow } from 'enzyme'

it('Pagination: displays', () => {
  const component = shallow(<Pagination />)
  expect(component.length).toBe(1)
})