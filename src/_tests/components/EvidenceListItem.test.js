import React from 'react';
import ReactDOM from 'react-dom';
import EvidenceListItem from './../../components/EvidenceListItem'

import { shallow } from 'enzyme'

it('EvidenceListItem: displays', () => {
  const component = shallow(<EvidenceListItem />)
  expect(component.length).toBe(1)
})