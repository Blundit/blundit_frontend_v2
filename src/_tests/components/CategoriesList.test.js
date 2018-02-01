import React from 'react';
import ReactDOM from 'react-dom';
import CategoriesList from './../../components/CategoriesList'

import { shallow } from 'enzyme'

it('CategoriesList: displays', () => {
  const component = shallow(<CategoriesList />)
  expect(component.length).toBe(1)
})