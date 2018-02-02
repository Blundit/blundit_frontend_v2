import React from 'react';
import ReactDOM from 'react-dom';
import ClaimsListItem from './../../components/ClaimsListItem'

import { shallow } from 'enzyme'

it('ClaimsListItem: displays', () => {
  const component = shallow(<ClaimsListItem />)
  expect(component.length).toBe(1)
})