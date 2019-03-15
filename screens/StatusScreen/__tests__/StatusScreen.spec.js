import React from 'react';
import { shallow } from 'enzyme';
import { StatusScreen } from '../StatusScreen';
import { View } from 'react-native';

test('Should render StatusScreen correctly', () => {
  const wrapper = shallow(<StatusScreen/>);

  expect(wrapper.find(View)).toHaveLength(1);
});