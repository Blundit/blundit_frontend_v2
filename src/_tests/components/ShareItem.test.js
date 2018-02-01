import React from 'react';
import ReactDOM from 'react-dom';
import ShareItem from './../../components/ShareItem'

import { shallow } from 'enzyme'

it('ShareItem: displays', () => {
  const component = shallow(<ShareItem />)
  expect(component.length).toBe(1)
})