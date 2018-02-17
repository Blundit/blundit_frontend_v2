import React from 'react';
import ReactDOM from 'react-dom';
import ClaimAdmin from './../../components/ClaimAdmin'

import { shallow } from 'enzyme'

it('ClaimAdmin: displays', () => {
  const component = shallow(<ClaimAdmin />)
  expect(component.length).toBe(1)
})