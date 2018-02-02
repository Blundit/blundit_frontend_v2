import React from 'react';
import ReactDOM from 'react-dom';
import PredictionHeader from './../../components/PredictionHeader'

import { shallow } from 'enzyme'

it('PredictionHeader: displays', () => {
  const component = shallow(<PredictionHeader />)
  expect(component.length).toBe(1)
})