import 'react-native';
import React from 'react';
import { MonoText } from '../StyledText';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
it('renders correctly', () => {
  // const tree = renderer.create(<MonoText>Snapshot test!</MonoText>).toJSON();

  const wrapper = shallow(<MonoText>Snapshot test!</MonoText>);
  expect(toJson(wrapper)).toMatchSnapshot();
});
