import React from 'react';
import ReactDOM from 'react-dom';
import SearchPredictions from './../../components/SearchPredictions'

import { shallow } from 'enzyme'

it('SearchPredictions: displays', () => {
  const component = shallow(<SearchPredictions />)
  expect(component.length).toBe(1)
})