import React from 'react';
import { Header, Left, Button, Icon, Title, Body } from 'native-base';

/**
 *
 * @param {*} props
 * @props {
 *  title
 *  backButton
 *  navigation
 * }
 */
const Appbar = props => (
  <Header>
    {props.backButton && 
      <Left>
        <Button transparent onPress={props.navigation.goBack()}>
          <Icon name="arrow-back" />
        </Button>
      </Left>
    }
    <Body>
      <Title>{props.title}</Title>
    </Body>
  </Header>
);

export default Appbar;
