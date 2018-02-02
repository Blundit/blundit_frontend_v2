import React from 'react';
import ReactDOM from 'react-dom';
import AddExpertToItem from './../../components/AddItemToExpert'

import { shallow } from 'enzyme'

it('AddItemToExpert: displays', () => {
  const component = shallow(<AddItemToExpert />)
  expect(component.length).toBe(1)
})