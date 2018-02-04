import React from 'react';
import ReactDOM from 'react-dom';
import Prediction from './../../views/Prediction'

import { shallow } from 'enzyme'

it('Prediction: displays', () => {
  const component = shallow(<Prediction />)
  expect(component.length).toBe(1)
})