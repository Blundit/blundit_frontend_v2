import React from 'react';
import ReactDOM from 'react-dom';
import AddExpertToItem from './../../components/AddExpertToItem'

import { shallow } from 'enzyme'

it('AddExpertToItem: displays', () => {
  const component = shallow(<AddExpertToItem />)
  expect(component.length).toBe(1)
})