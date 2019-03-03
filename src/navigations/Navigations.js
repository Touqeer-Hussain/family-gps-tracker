import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer, createStackNavigator, createMaterialTopTabNavigator, createBottomTabNavigator} from "react-navigation";
import Login from '../screen/login/Login'
// import Home from '../screen/home/Index'
import MyCircle from '../screen/home/front/myCircle/Mycircle'
import OtherCircle from '../screen/home/front/otherCircle/Othercircle'

import Create from '../screen/home/create/Create'
import CodeScreen from '../screen/home/codescreen/Codescreen'

import Detailedcircle from '../screen/home/front/detailedcircle/Detailedcircle'
import Track from '../screen/home/front/track/Track'

const CircleNavigator = createMaterialTopTabNavigator({
    Detailedcircle,
    Track
}, {
    navigationOptions: {
        title: 'Circle'
    }
})

const TopNavigator = createMaterialTopTabNavigator({
    MyCircle,
    OtherCircle
})

const TabNavigator = createBottomTabNavigator({
    TopNavigator,
    Create: {
        screen: Create,
        title: 'Create Circle'
    },   
},{
    navigationOptions: {
        title: 'Home'
    }
})

const MainStackNavigation = createAppContainer(createStackNavigator({
    TabNavigator,
    Login,
    CodeScreen:{
        screen: CodeScreen,
        navigationOptions: {
            title: 'Send Code'
        }
        
    },
    CircleNavigator


},{
    initialRouteName: 'TabNavigator'
}
))

export default MainStackNavigation