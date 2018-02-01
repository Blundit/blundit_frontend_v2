import React from 'react';
import ReactDOM from 'react-dom';
import ItemComments from './../../components/ItemComments'

import { shallow } from 'enzyme'

it('ItemComments: displays', () => {
  const component = shallow(<ItemComments />)
  expect(component.length).toBe(1)
})