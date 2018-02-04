import React from 'react';
import ReactDOM from 'react-dom';
import NewClaim from './../../views/NewClaim'

import { shallow } from 'enzyme'

it('NewCLaim: displays', () => {
  const component = shallow(<NewClaim />)
  expect(component.length).toBe(1)
})