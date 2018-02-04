import React from 'react';
import ReactDOM from 'react-dom';
import NotFound from './../../views/NotFound'

import { shallow } from 'enzyme'

it('NotFound: displays', () => {
  const component = shallow(<NotFound />)
  expect(component.length).toBe(1)
})