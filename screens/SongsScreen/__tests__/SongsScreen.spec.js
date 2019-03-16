import React from 'react';
import { shallow } from 'enzyme';
import { SongsScreen } from '../SongsScreen';
import {
  Input,
  Card,
  CardItem
} from 'native-base'; 

const props = {
  SongReducer: {
    loading: false,
    data: [],
    error: '',
  },
  LoadSearchSongAction: jest.fn()
};

let wrapper;
beforeEach(() => {
  wrapper = shallow(<SongsScreen {...props}/>);
});

test('Should render correctly', () => {
  expect(wrapper.find(Input)).toHaveLength(1);
  expect(wrapper.find(CardItem).length).toBeGreaterThan(0);
});

test('Should call search song API with the typed keyword', () => {
  wrapper.find(Input).simulate('changeText', 'Hola');

  expect(wrapper.state('keyword')).toEqual('Hola');
});