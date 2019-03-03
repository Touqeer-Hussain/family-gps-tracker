import React from 'react';
import {createAppContainer, createMaterialTopTabNavigator} from 'react-navigation';
import Mycircle from '../front/myCircle/Mycircle'

class Home extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (<TabNavigator screenProps={{
      rootNav: this.props.navigation
    }}/>);
  }
}

const TabNavigator = createAppContainer(createMaterialTopTabNavigator({
  Mycircle
}, {initialRouteName: "Mycircle"}));

export default Home