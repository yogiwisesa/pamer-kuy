import React from 'react';
import { shallow } from 'enzyme';
import { SongsScreen } from '../SongsScreen';
import { track_search } from './__mocks__/MockData'
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
  LoadSearchSongAction: jest.fn(),
  GenerateNewActivity: jest.fn()
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

test('Should generate correct activity', () => {

  const newProps= {
    ...props,
    SongReducer: {
      ...props.SongReducer,
      data: track_search
    }
  };

  wrapper.setProps(newProps);
  wrapper.instance().handleGenerateActivity(0);
  expect(wrapper.state('generatedActivity')).toEqual({
    type: 'song',
    text: `🎵 ${track_search[0].name} by ${track_search[0].artist}`
  })

});