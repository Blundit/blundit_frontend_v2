import React from 'react';
import ReactDOM from 'react-dom';
import PredictionsList from './../../components/Predictionslist'

import { shallow } from 'enzyme'

it('PredictionsList: displays', () => {
  const component = shallow(<PredictionsList />)
  expect(component.length).toBe(1)
})