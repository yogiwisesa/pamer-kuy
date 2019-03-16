import React from 'react';
import { shallow } from 'enzyme';
import { StatusScreen } from '../StatusScreen';
import { Button, Card, Textarea } from 'native-base';

test('Should render StatusScreen correctly', () => {
  const wrapper = shallow(<StatusScreen/>);

  expect(wrapper.find(Card)).toHaveLength(1);
  expect(wrapper.find(Textarea)).toHaveLength(1);
  expect(wrapper.find(Button)).toHaveLength(2);
});