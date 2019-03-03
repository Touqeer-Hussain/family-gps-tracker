import React, { Component } from 'react';
import {
  View,
  ScrollView,
  AsyncStorage
} from 'react-native';
import firebase from '../../../../../Config/firebase'
import { Avatar, Divider, Input, Text, Button, Icon, ListItem, Image  } from 'react-native-elements';
 

 

class DetailedCircle  extends Component {
  static navigationOptions = {
        title: 'Members'
  };
  constructor(props){
    super(props);
    this.state = {
        profile: {},
        circle: {},
        list: [],
        usr: [],
        conts: [],
        done: null,
        circleId: '',
        circleData: {},
        temp: null,
        panicList: []
      
    }
  }

  
  async componentWillMount() {

    
    

  this.willFocusListener = this.props.navigation.addListener(
    'didFocus',
    () => {
      this.state.usr.length = 0,
      this.setState({
          done: null
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
    let circle = this.props.navigation.getParam('circle')
    let circleData = this.props.navigation.getParam('circleData')

    console.log(circleData)
    this.setState({profile, circle, circleData}, () =>{

        
              
            console.log('step 1')
          
            
              firebase.database().ref(`circles/${circle}/members`).on('child_added', shot => {
                  console.log('ssss', shot.val())
                
                  console.log('step 3')
                    this.state.usr.push({[shot.key] :shot.val()})
                    this.state.panicList.push(shot.val().uid)
                    console.log(this.state.usr)
                    this.setState({
                        done: true
                    })
      
                
                
      
              })
      
              
            })
            console.log(this.state.usr)
      
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
        leftAvatar={{ source: { uri: l[Object.keys(l)[0]].photoURL } }}
        title={l[Object.keys(l)[0]].name}
        rightElement={() => {
            if(l[Object.keys(l)[0]].type){
                    
                return <Avatar size='small' rounded source={require('../../../../../assets/admin.png')} />
            }else{
                
                    if(l[Object.keys(l)[0]].uid == this.state.profile.uid){
                        return <Avatar size='small' rounded source={require('../../../../../assets/axe.png')} />
                    }else{
                        if(l[Object.keys(l)[0]].uid != this.state.profile.uid){
                                return    
                        }
                    }
                return <Avatar size='small' rounded source={require('../../../../../assets/axe.png')} />
            }   
        }}
        
      />
    })
  }
      
        
 

        </ScrollView>


        <View  >
            {
                console.log('dsdsdsdsadasdsadasd',this.state.done && this.state.circleData.cId, this.state.profile.uid)
            }
        {this.state.done && this.state.circleData.cId == this.state.profile.uid && <Button
          onPress={(e) => {
            this.props.navigation.navigate('CodeScreen', {
                circle: {
                  cId: this.state.profile.uid,
                  name: this.state.circleData.name,
                  code: this.state.circleData.code,
      
                }
              })
            }}
          title="Add Member"
          />}
          <Button buttonStyle={{backgroundColor: 'red'}}
          onPress={(e) => {
            this.state.panicList.map((l, i) => {
                console.log('apnic',l)
                if(this.state.profile.uid){    
                    firebase.database().ref(`users/${l}`).once('value' , snap => {
                            
                        if(snap.val().token){
                            fetch('https://exp.host/--/api/v2/push/send', {
                                mode: 'no-cors',
                                method: 'POST',
                                headers: {
                                    "Accept":'application/json',
                                    "Content-Type": 'application/json'
                                    },
                                body: JSON.stringify({
                                to: `${snap.val().token}`, body: `Emergency!!!`, title: this.state.profile.name
                              })
                              
                            })            
                        }
                        
                    })
                }
                
            })
                
            
            }}
          title="Panic Button"
          />
        </View>
      


        </View>
      

      
      
 
 
    );
  }
}


export default DetailedCircle