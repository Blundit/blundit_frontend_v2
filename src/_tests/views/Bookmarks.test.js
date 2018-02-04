import React from 'react';
import ReactDOM from 'react-dom';
import Bookmarks from './../../views/Bookmarks'

import { shallow } from 'enzyme'

it('Bookmark: displays', () => {
  const component = shallow(<Bookmarks />)
  expect(component.length).toBe(1)
})