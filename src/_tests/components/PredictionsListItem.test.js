import React from 'react';
import ReactDOM from 'react-dom';
import PredictionsListItem from './../../components/PredictionsListItem'

import { shallow } from 'enzyme'

it('PredictionsListItem: displays', () => {
  const component = shallow(<PredictionsListItem />)
  expect(component.length).toBe(1)
})