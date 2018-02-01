import React from 'react';
import ReactDOM from 'react-dom';
import VoteForItem from './../../components/VoteForItem'

import { shallow } from 'enzyme'

it('VoteForItem: displays', () => {
  const component = shallow(<VoteForItem />)
  expect(component.length).toBe(1)
})