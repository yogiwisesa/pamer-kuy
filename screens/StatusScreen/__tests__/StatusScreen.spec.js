import React from 'react';
import { shallow } from 'enzyme';
import { View } from 'react-native';
import { StatusScreen } from '../StatusScreen';
import { Input, Button } from 'react-native-elements';

test('Should render StatusScreen correctly', () => {
  const wrapper = shallow(<StatusScreen/>);

  expect(wrapper.find(View)).toHaveLength(1);
  expect(wrapper.find(Input)).toHaveLength(1);
  expect(wrapper.find(Button)).toHaveLength(2);
});