import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  AsyncStorage
} from 'react-native';

import MapView, { Marker, ProviderPropType } from 'react-native-maps';
import { Avatar, Divider, Input, Text, Button, Icon  } from 'react-native-elements';
import { Constants, Location, Permissions } from 'expo';
import firebase from '../../../../../Config/firebase'




const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 24.8789349;
const LONGITUDE = 67.0644417;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

function log(eventName, e) {
  console.log(eventName, e.nativeEvent);
}

class Track extends React.Component {
  static navigationOptions = {
    title: 'Track'
  };
  
  constructor(props) {
    super(props);

    this.state = {
      a: {
        latitude: LATITUDE + SPACE,
        longitude: LONGITUDE + SPACE,
      },
      usr: [],
      done: null,
      profile: {},
      circle: {},
      members: []
    };
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log(status)
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location)
    if(location){
        this.setState({ a: {
            latitude: location.coords.latitude + SPACE,
            longitude: location.coords.longitude + SPACE
          } });
    }
    

    
    
  };

 async componentDidMount(){
    //  this._getLocationAsync()

     this.willFocusListener = this.props.navigation.addListener(
        'didFocus',
        () => {
          this.state.usr.length = 0,
          this.setState({
            a: {
              latitude: LATITUDE + SPACE,
              longitude: LONGITUDE + SPACE,
            },
            usr: [],
            done: null,
            profile: {}
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
      let members = this.props.navigation.getParam('members')
      
      this.setState({profile, members, circle})
      


      
        


   this.setState({profile}, async () => {
       this.state.members.map((l, i) => {

       })
       firebase.database().ref(`users`).on('child_added', snap => {
           
            
                if(snap.val() && snap.val().uid != profile.uid && this.state.members.includes(snap.val().uid)){
                    this.state.usr.push({[snap.key]: snap.val()})
                    console.log(this.state.usr)
                    this.setState({
                        done: true
                    })
                }
       })

       firebase.database().ref(`users`).on('child_changed', snap => {
           
            
                if(snap.val() && snap.val().uid != profile.uid && this.state.members.includes(snap.val().uid)){
                    this.state.usr.length = 0
                    this.state.usr.push({[snap.key]: snap.val()})
                    console.log(this.state.usr)
                    this.setState({
                        done: true
                    })
                }
       })
    
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log('Postions', status)
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    
   
        await Location.watchPositionAsync({
            distanceInterval: 1,
            accuracy: 6
            
        },(e) => {
            if(e.coords){
                this.setState({
                    a: {
                        latitude: e.coords.latitude,
                        longitude: e.coords.longitude
                    }    
              },() => {

                  firebase.database().ref(`users/${profile.uid}/coords`).update({
                    latitude: e.coords.latitude,
                    longitude: e.coords.longitude
                  })
              })
            }
              
          
          
          
        })
        
    
   })
}

  render() {
    return (

      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
      }}>
        <View style={{flex: 1}} >
        <MapView
          provider={this.props.provider}
          style={styles.map}
          region={{
            latitude: this.state.a.latitude,
            longitude: this.state.a.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          z
        >
        <Marker.Animated
                
                coordinate={this.state.a}
              >
              <Avatar
                rounded
                source={{
                        uri:
                            this.state.profile.photoURL,
  }}
/>
              </Marker.Animated>
        {
            this.state.done && this.state.usr.map((l, i) => {
                
                var coords = l[Object.keys(l)[0]].coords
                if(coords){
                    return <Marker.Animated
                    coordinate={coords}
                  >

                <Avatar
                        rounded
                        source={{
                        uri:
                        l[Object.keys(l)[0]].photoURL,
                        }}
/>
                  </Marker.Animated>
                }
                
            })
        }
          
        </MapView></View>
      </View>

    );
  }
}



const styles = StyleSheet.create({
  // container: {
  //   ...StyleSheet.absoluteFillObject,
  //   flex: 1,
  //   flexDirection: 'column',
  //   justifyContent: 'flex-end',
  // },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Track