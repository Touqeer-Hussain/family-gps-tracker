import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import MainStackNavigation from './src/navigations/Navigations'
import firebase from './Config/firebase'

export default class App extends React.Component {
    constructor(){
      super();
      this.state ={
          
      }
    }

    async componentDidMount(){
     

    }

     

  render() {
    return (
      <MainStackNavigation />
    );
  }
}

