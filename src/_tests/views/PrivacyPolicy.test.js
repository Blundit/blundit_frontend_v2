import React from 'react';
import ReactDOM from 'react-dom';
import PrivacyPolicy from './../../views/PrivacyPolicy'

import { shallow } from 'enzyme'

it('PrivacyPolicy: displays', () => {
  const component = shallow(<PrivacyPolicy />)
  expect(component.length).toBe(1)
})