import React from 'react';
import ReactDOM from 'react-dom';
import Claim from './../../views/Claim'

import { shallow } from 'enzyme'

it('Claim: displays', () => {
  const component = shallow(<Claim />)
  expect(component.length).toBe(1)
})