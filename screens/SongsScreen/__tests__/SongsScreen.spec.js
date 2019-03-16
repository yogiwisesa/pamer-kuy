import React from 'react';
import { shallow } from 'enzyme';
import { SongsScreen } from '../SongsScreen';
import {
  Input,
} from 'native-base'; 

test('Should render correctly', () => {
  const wrapper = shallow(<SongsScreen />);

  expect(wrapper.find(Input)).toHaveLength(1);
});