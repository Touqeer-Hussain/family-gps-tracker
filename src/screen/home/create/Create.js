import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Button, Input, Text, Divider } from 'react-native-elements'
import firebase from '../../../../Config/firebase'

export default class Create extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      profile: {},
      code: '',
      circelName: ''
    }
  }

  async componentDidMount(){
      this.getProfile()
  }

  getProfile = async () => {
    let ss = await AsyncStorage.getItem('profile')
    let profile = await JSON.parse(ss)
    console.log('profile agaya', profile)

 this.setState({profile})
 }


  
  render() {
    const { profile, code, circelName } = this.state
    return (
      <View style={styles.container}>

        <Text h4>Enter Your Circle Name:</Text>
        
        <Input
            placeholder='Circle Name..'
            onChangeText={e => {
              
              this.setState({
                circelName: e
              })
            }}
          />
        
        <Button onPress={() => {
          console.log(this.state.profile.uid)
          var code = Date.now().toString().substring(9)
          var uid = this.state.profile.uid.toString().substring(this.state.profile.uid.length - 4)
          var f = uid+code
          console.log(f)
          this.setState({
            code: f
          }, () => {

            firebase.database().ref(`circles`).push().set({
              cId: profile.uid,
              name: circelName,
              code: this.state.code,
              members: {
                [profile.uid]: {
                  name: profile.name,
                  photoURL: profile.photoURL,
                  uid: profile.uid,
                  type: 'Owner'
                }
              }
    
            })
            this.props.navigation.navigate('CodeScreen', {
              circle: {
                cId: profile.uid,
                name: circelName,
                code: this.state.code,
    
              }
            })

          })
          
        }}


          title="Create Circle"
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
