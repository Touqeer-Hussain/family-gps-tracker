import React from 'react';

import { StyleSheet, View, AsyncStorage} from 'react-native';
import firebase from '../../../../Config/firebase';
import { Avatar, Divider, Input, Text, Button, Icon, Rating  } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';

export default class Profile extends React.Component {
static navigationOptions = {
    title: 'Profile',
  };
  
constructor(props) {
    super(props);

    this.state = {

      profile: {
        
        photoURL: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'
     
      }
    }
  }
  
  
async componentWillMount() {

    this.getProfile()
  }

  getProfile = async () => {
    let ss = await AsyncStorage.getItem('profile')
    let profile = await JSON.parse(ss)
    this.setState({profile})
    
}
    

    
        
    
    
    
    
  render() {
      const { profile } = this.state
      
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          
          }}>
      
      
      <View style={{
     
      alignItems: 'center'
      
      }}>
      
      <Avatar
      size={200}
      rounded
      source={{
          uri: profile.photoURL
      }}
/>    
<Text h4>{profile.name}</Text>  
</View>
<View style={{
    alignItems: 'flex-start'
}}>



<View style={{ flexDirection: 'row'}}><Text style={{fontSize: 20}}>E-Mail: </Text><Text h4>{profile.email}</Text></View>






</View>


<View style={{
          
          flexDirection: "row",
          justifyContent: "center",
          
          }}>




</View>
<View>
<Button buttonStyle={{
  backgroundColor: 'red'
}}
  onPress= {() => {
    firebase.auth().signOut().then(async () => {
      await AsyncStorage.removeItem('profile')
      this.props.navigation.replace('Login')
    })
    
    console.log('logout')
    
    
  }}
  title="Sign Out"
/></View>

       </View>
    );
  }
}

