import React from 'react';
import { View,KeyboardAvoidingView, Image, ScrollView, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import firebase from '../config/Firebase';
import { StackActions, NavigationActions } from 'react-navigation';
import {connect} from 'react-redux';
import { ImagePicker } from 'expo';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input ,Header, Divider } from 'react-native-elements';
import { Constants } from 'expo';
import {  Location, Permissions, Contacts } from 'expo';


 class Phone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          number:"",
          name:""
        };
    }
componentDidMount(){
const {user} = this.props;
console.log("phone user props", user)
this.setState({
    name:user.name,
    uid:user.UID,
})
}
submit = () => {
  const{ number, image, uid} = this.state
  if(!(/^(?:\+\d{2})?\d{11}(?:,(?:\+\d{2})?\d{11})*$/.test(number))){
    alert('Please Fill Correct Phone number')
  }else if(!image){
    alert('please select Image')
  }else{
    const obj = {
      image : image,
      number : number,
    }
    firebase.database().ref('/UserData/'+ uid).update(obj);
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
          NavigationActions.navigate({ routeName: 'Home' }),
      ]
  })
  this.props.navigation.dispatch(resetAction)
  }
}
// pickImage = async () => {
//     // const{image}= this.state
//     let result = await ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//     });

//     console.log(result);

//     if (!result.cancelled) {
//       this.setState({ image: result.uri });
//     }
//   };
_pickImage = async () => {
  console.log('heelooo')
  await Permissions.askAsync(Permissions.CAMERA);
  await Permissions.askAsync(Permissions.CAMERA_ROLL);
  const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      // aspect: 1,
  });
  this.setState({ image: uri });
};

static navigationOptions = { header: null }
        render() {
            const { image, number,name } = this.state;
        
            return (
              <ScrollView>
                <KeyboardAvoidingView behavior="position" enabled>
                <View style={{ flex: 1, alignItems: 'center',  }}>
                <Header
  // leftComponent={{ icon: 'menu', color: '#fff' }}
  centerComponent={{ text: 'Wellcome'+ " "+name, style: { color: '#fff' } }}
/>
<View style={{ marginTop:30}}  >

              <Avatar
              size="xlarge"
              rounded
              title="CR"
              // onPress={() => this._pickImage}
              activeOpacity={0.7}
              source={{
                uri:
                image ? image : 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
              }}
              
/>
              </View>
              <View style={{  alignItems: 'center', justifyContent: 'center',marginTop:30 , marginBottom:30}}>
                <Button
                  title="Pick an image from camera roll"
                  onPress={()=>this._pickImage()}
                  />
                {/* {image &&
                  <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
            
              </View>
{/* <View style={{ flex: 1, alignItems: 'center', marginTop:30}}  > */}

              <Input
  placeholder='Phone number'
  onChangeText={(e) => this.setState({ number: e })}
  leftIcon={
    <Icon
      name='phone'
      size={24}
      color='black'
    />
    
  }
/>
{/* </View> */}
<View style={{ marginTop:30}}  >

<Button
onPress={this.submit}
  title="Submit"
  type="outline"
/>
</View>
                  </View>
                  </KeyboardAvoidingView>
                  </ScrollView>
            );
          }
        
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#7FB3D5',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 20,
    // opacity:0.9
  },
  statusBar: {
    backgroundColor: "#C2185B",
    height: Constants.statusBarHeight,
  },

});

function mapStateToProp(state){
    return({
        user: state.authReducers.USER
    })
}
function mapDispatchToProp(dispatch){
    return({
        
        
        
    })
}

export default connect(mapStateToProp,mapDispatchToProp)(Phone);
