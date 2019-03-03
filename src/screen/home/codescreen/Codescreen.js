import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Button, Input, Text, Divider } from 'react-native-elements'
import firebase from '../../../../Config/firebase'

export default class CodeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      profile: {},
      circle: {},
      email: ''
    }
  }

  async componentDidMount(){
      this.getProfile()
      
  }

  getProfile = async () => {
    let ss = await AsyncStorage.getItem('profile')
    let profile = await JSON.parse(ss)
    console.log('profile agaya', profile)

    let circle = this.props.navigation.getParam('circle')
    this.setState({
        circle,
        profile
    })

 
}

  
  render() {
    const { profile, circle } = this.state
    return (
      <View style={styles.container}>

        <Text h4>Enter Email to Send Link:</Text>

        <Text h2>{circle.code}</Text>
        <Input
            placeholder='Email..'
            onChangeText={e => {
              console.log(e)
              this.setState({
                email: e
              })
            }}
          />
        
        <Button onPress={() => {
            firebase.database().ref(`users`).on('child_added', snap => {
                if(snap.val().email == this.state.email){
                    fetch('https://exp.host/--/api/v2/push/send', {
                        mode: 'no-cors',
                        method: 'POST',
                        headers: {
                            "Accept":'application/json',
                            "Content-Type": 'application/json'
                            },
                        body: JSON.stringify({
                        to: `${snap.val().token}`, body: `Invitation Code: ${circle.code}`, title: profile.name
                      })
                      
                    })
                }
            })
          
        }}


          title="Send Link"
          />
            <Divider />
            <Divider />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
