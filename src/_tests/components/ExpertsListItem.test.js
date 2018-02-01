import React from 'react';
import ReactDOM from 'react-dom';
import ExpertsListItem from './../../components/ExpertsListItem'

import { shallow } from 'enzyme'

it('ExpertsListItem: displays', () => {
  const component = shallow(<ExpertsListItem />)
  expect(component.length).toBe(1)
})