import React from 'react';
import ReactDOM from 'react-dom';
import Expert from './../../views/Expert'

import { shallow } from 'enzyme'

it('Expert: displays', () => {
  const component = shallow(<Expert />)
  expect(component.length).toBe(1)
})