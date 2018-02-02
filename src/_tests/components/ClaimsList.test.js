import React from 'react';
import ReactDOM from 'react-dom';
import ClaimsList from './../../components/ClaimsList'

import { shallow } from 'enzyme'

it('ClaimsList: displays', () => {
  const component = shallow(<ClaimsList />)
  expect(component.length).toBe(1)
})