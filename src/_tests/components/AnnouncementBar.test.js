import React from 'react';
import ReactDOM from 'react-dom';
import AnnouncementBar from './../../components/AnnouncementBar'

import { shallow } from 'enzyme'

it('AnnouncementBar: displays', () => {
  const component = shallow(<AnnouncementBar />)
  expect(component.length).toBe(1)
})