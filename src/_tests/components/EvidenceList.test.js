import React from 'react';
import ReactDOM from 'react-dom';
import EvidenceList from './../../components/EvidenceList'

import { shallow } from 'enzyme'

it('EvidenceList: displays', () => {
  const component = shallow(<EvidenceList />)
  expect(component.length).toBe(1)
})