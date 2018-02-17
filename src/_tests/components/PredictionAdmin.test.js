import React from 'react';
import ReactDOM from 'react-dom';
import PredictionAdmin from './../../components/PredictionAdmin'

import { shallow } from 'enzyme'

it('PredictionAdmin: displays', () => {
  const component = shallow(<PredictionAdmin />)
  expect(component.length).toBe(1)
})