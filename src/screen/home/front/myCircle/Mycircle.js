import React, { Component } from 'react';
import {
  View,
  ScrollView,
  AsyncStorage
} from 'react-native';
import firebase from '../../../../../Config/firebase'
import { Avatar, Divider, Input, Text, Button, Icon, ListItem  } from 'react-native-elements';
import { Permissions, Notifications } from 'expo'

 

 

class MyCircle  extends Component {
  static navigationOptions = {
    title: 'My Circles'
  };
  constructor(props){
    super(props);
    this.state = {
        list: [],
        usr: [],
        conts: [],
        done: null
      
    }
  }

  
  async componentWillMount() {

    
  

  this.willFocusListener = this.props.navigation.addListener(
    'didFocus',
    () => {
      this.setState({
        usr: []
      })
      this.getProfile()
    }
  )
}

componentWillUnmount() {
  this.willFocusListener.remove()
}

  getProfile = async () => {
    let ss = await AsyncStorage.getItem('profile')
let profile = await JSON.parse(ss)


   this.setState({profile}, async () =>{
    firebase.database().ref(`circles`).on('child_added', snap =>{
      
      
    if(profile.uid == snap.val().cId){
        console.log(snap.key, snap.val())
        this.state.usr.push({[snap.key] :snap.val()})
        this.setState({
          done: true
        })
      }
  })
  
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  console.log('token****', token);
  firebase.database().ref(`users/${profile.uid}`).update({
      token
  })
  
   })
}
 
  render() {
      console.log('screeen')
    return (
      
      
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
      }}>
        <ScrollView style={{flex: 1, alignSelf: 'stretch'}} >
 {
    this.state.done && this.state.usr.map((l, i) => {
  
      
     return  <ListItem
        key={i}
        bottomDivider={true}
        title={l[Object.keys(l)[0]].name}
        // subtitle={`Job Type: ` + l[Object.keys(l)[0]].jobType +  `\n` + 'Status: ' + l[Object.keys(l)[0]].status}
        onPress= {() => {
          
          this.props.navigation.navigate('Detailedcircle',{
            circle: Object.keys(l)[0],
            circleData: l[Object.keys(l)[0]]

          })
        }}
        
      />
    })
  }
      
        
 

        </ScrollView>
        </View>
        // <View  >
        // <Button
        //   onPress={(e) => {
        //       console.log()
        //     }}
        //   title="Next"
        //   />
        // </View>
      

      
      
 
 
    );
  }
}


export default MyCircle