import React from 'react';
import ReactDOM from 'react-dom';
import NewPrediction from './../../views/NewPrediction'

import { shallow } from 'enzyme'

it('NewPrediction: displays', () => {
  const component = shallow(<NewPrediction />)
  expect(component.length).toBe(1)
})