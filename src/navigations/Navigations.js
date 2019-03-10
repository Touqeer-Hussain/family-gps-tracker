import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer, createStackNavigator, createMaterialTopTabNavigator, createBottomTabNavigator} from "react-navigation";
import Login from '../screen/login/Login'
// import Home from '../screen/home/Index'
import MyCircle from '../screen/home/front/myCircle/Mycircle'
import OtherCircle from '../screen/home/front/otherCircle/Othercircle'

import Create from '../screen/home/create/Create'
import Profile from '../screen/home/profile/Profile'
import CodeScreen from '../screen/home/codescreen/Codescreen'

import Detailedcircle from '../screen/home/front/detailedcircle/Detailedcircle'
import Track from '../screen/home/front/track/Track'

import firebase from '../../Config/firebase'

// const CircleNavigator = createMaterialTopTabNavigator({
//     Detailedcircle,
//     Track
// }, {
//     navigationOptions: {
//         title: 'Circle'
//     }
// })

const TopNavigator = createMaterialTopTabNavigator({
    MyCircle,
    OtherCircle
})

const TabNavigator = createBottomTabNavigator({
    TopNavigator: {
        screen: TopNavigator,
        navigationOptions: {
            title: 'Circles'
        }
    },
    Create: {
        screen: Create,
    },
    Profile: {
        screen: Profile
    }
})

const MainStackNavigation = createAppContainer(createStackNavigator({
    TabNavigator: {
        screen: TabNavigator,
        navigationOptions: {
            title: 'Home'
        }
    },
    Login,
    CodeScreen:{
        screen: CodeScreen,
        navigationOptions: {
            title: 'Send Code'
        }
        
    },
    Detailedcircle,
    Track


},{
    initialRouteName: firebase.auth().currentUser ? 'TabNavigator' : 'Login'
}
))

export default MainStackNavigation