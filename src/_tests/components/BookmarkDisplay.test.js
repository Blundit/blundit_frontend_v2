import React from 'react';
import ReactDOM from 'react-dom';
import BookmarkDisplay from './../../components/BookmarkDisplay'

import { shallow } from 'enzyme'

it('BookmarkDisplay: displays', () => {
  const component = shallow(<BookmarkDisplay />)
  expect(component.length).toBe(1)
})