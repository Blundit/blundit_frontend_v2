import React from 'react';
import ReactDOM from 'react-dom';
import ExpertsList from './../../components/ExpertsList'

import { shallow } from 'enzyme'

it('ExpertsList: displays', () => {
  const component = shallow(<ExpertsList />)
  expect(component.length).toBe(1)
})