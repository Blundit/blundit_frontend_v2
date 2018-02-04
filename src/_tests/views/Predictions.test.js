import React from 'react';
import ReactDOM from 'react-dom';
import Predictions from './../../views/Predictions'

import { shallow } from 'enzyme'

it('Predictions: displays', () => {
  const component = shallow(<Predictions />)
  expect(component.length).toBe(1)
})