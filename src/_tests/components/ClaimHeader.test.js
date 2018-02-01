import React from 'react';
import ReactDOM from 'react-dom';
import ClaimHeader from './../../components/ClaimHeader'

import { shallow } from 'enzyme'

it('ClaimHeader: displays', () => {
  const component = shallow(<ClaimHeader />)
  expect(component.length).toBe(1)
})