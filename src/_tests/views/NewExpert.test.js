import React from 'react';
import ReactDOM from 'react-dom';
import NewExpert from './../../views/NewExpert'

import { shallow } from 'enzyme'

it('NewExpert: displays', () => {
  const component = shallow(<NewExpert />)
  expect(component.length).toBe(1)
})