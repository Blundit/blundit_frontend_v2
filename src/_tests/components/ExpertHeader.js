import React from 'react';
import ReactDOM from 'react-dom';
import ExpertHeader from './../../components/ExpertHeader'

import { shallow } from 'enzyme'

it('ExpertHeader: displays', () => {
  const component = shallow(<ExpertHeader />)
  expect(component.length).toBe(1)
})