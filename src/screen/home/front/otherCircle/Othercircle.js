import React, { Component } from 'react';
import {
  View,
  ScrollView,
  AsyncStorage
} from 'react-native';
import firebase from '../../../../../Config/firebase'
import { Avatar, Divider, Input, Text, Button, Icon, ListItem, Overlay  } from 'react-native-elements';
 

 

class OtherCircle  extends Component {
  static navigationOptions = {
    title: 'Joined'
  };
  constructor(props){
    super(props);
    this.state = {
        list: [],
        usr: [],
        conts: [],
        done: null,
        isVisible: false,
        code: ''
      
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


   this.setState({profile}, () =>{
    firebase.database().ref(`circles`).on('child_added', snap =>{
              
      console.log('step 1')
    if(snap.val().members && profile.uid != snap.val().cId){
      console.log('step 2', snap.key)
        firebase.database().ref(`circles/${snap.key}/members`).on('child_added', shot => {
            console.log('ssss', shot.val())
          if(profile.uid == shot.val().uid){
            console.log('step 3')
              this.state.usr.push({[snap.key] :snap.val()})
              console.log(this.state.usr)
              this.setState({
                  done: true
              })

          }
          

        })

        
      }
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
        
        
        <View >
        <Button
          onPress={(e) => {
              console.log()
              this.setState({
                isVisible: true
              })
            }}
          title="Join Circle"
          />
        </View>
        <Overlay
            
            height="auto"
            isVisible={this.state.isVisible}
            onBackdropPress={() => this.setState({ isVisible: false })}
            >
            <Text h4>Enter Circle Code.</Text>
            <Input 
              placeholder='code'
              onChangeText={(e) => {
                this.setState({
                    code: e
                })
              } }
              />        
              <Button 
              onPress ={() => {
                console.log('ff')
                  firebase.database().ref(`circles`).on('child_added', snap => {
                    if(snap.val() && snap.val().cId != this.state.profile.uid && snap.val().code == this.state.code){
                          firebase.database().ref(`circles/${snap.key}/members/${this.state.profile.uid}`).set({
                                name: this.state.profile.name,
                                photoURL: this.state.profile.photoURL,
                                uid: this.state.profile.uid
                          })
                          this.setState({
                            isVisible: false
                          })
                    }
                  })
              }}
              title="Confirm"
              />
              </Overlay>
        </View>
        
      

      
      
 
 
    );
  }
}


export default OtherCircle