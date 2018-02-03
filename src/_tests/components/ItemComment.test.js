import React from 'react';
import ReactDOM from 'react-dom';
import ItemComment from './../../components/ItemComment'

import { shallow } from 'enzyme'

it('ItemComment: displays', () => {
  const component = shallow(<ItemComment />)
  expect(component.length).toBe(1)
})