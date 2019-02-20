import React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import firebase from '../config/Firebase';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'
import { Input, Header, Divider, Icon, Button } from 'react-native-elements';
import { DrawerActions } from 'react-navigation';
import { Constants, Location, Permissions } from 'expo';
import www from '../../assets/nn.jpg';
import { Dropdown } from 'react-native-material-dropdown';
class OfferGiven extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    static navigationOptions = {
        title: "Give Offer",

        // headerLeft: (
        // <Icon
        //   raised
        //   name='bars'
        //   type='font-awesome'
        //   color='#f50'
        //   onPress= {
        //     this.props.navigation.navigate('Menu')
        // }
        //    />
        //   ),
        headerStyle: {
            backgroundColor: '#075e54',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };


    componentDidMount() {
        const { user,navigation } = this.props;
        const person = navigation.getParam('i')
        this.setState({
            currentUser:user,
            name: user.name,
            uid: user.UID,
        })
    }
    submit = () => {
        // const{ experience,category , uid} = this.state
        const { person, currentUser } = this.state
        if(!category){
          alert('Please Select a category')
        }else if(!experience){
          alert('please tell your experience ')
        }else{
            // console.log(person,'pesaon')
            const personUID = person.uid;
            const me = currentUser
            const obj = {
                status: 'Pending',
                data: me,
                sellerUid: personUID,
            }
            firebase.database().ref('/Request/' + personUID).push(obj).then(() => {
               
            })
         
          const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' }),
            ]
        })
        this.props.navigation.dispatch(resetAction)
        }
      }

    render() {
       
        let number = [{
            value: 'Monday',
        }, {
            value: 'Tuesday',
        },
        {
            value: 'Thursday',
        }, {
            value: 'Friday',
        }, {
            value: 'Saturday',
        }, {
            value: 'Sunday',
        }
        ];

        const { allUser, list, category, experience } = this.state
        return (
            <ImageBackground source={www} style={{ width: '100%', height: '100%' }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    // justifyContent: 'space-between',
                    // justifyContent: 'center',
                    alignItems: "center"
                }}>

                    <View style={{ width: 220, height: 50, marginBottom: 30, marginTop: 30 }} >
                        <Text style={{ paddingTop: 10, fontSize: 20, fontWeight: "bold", color: '#ccff33' }}>Cost</Text>
                        <TextInput
                                // style={{
                                //   width:'100%'
                                // }}
                                keyboardType='numeric'
                                maxLength={6}
                                // multiline={true}
                                placeholder={'0 PKR '}
                                // inputAccessoryViewID={inputAccessoryViewID}
                                onChangeText={text => this.setState({ text })}
                                value={this.state.text + ' PKR'}
                            />
                        
                    </View>
                    <View style={{ width: 220, height: 50, marginBottom: 50, marginTop: 30 }} >

                        <Text style={{ paddingTop: 10, fontSize: 20, fontWeight: "bold", color: '#80ff80' }}>Service Day</Text>
                        {/* <TextInput
                            style={{ backgroundColor: '#ccff99', paddingBottom: 10, paddingTop: 10, fontSize: 20, fontWeight: "bold", color: '#80ff80' }}
                            keyboardType='numeric'
                            onChangeText={(e) => this.setState({ experience: e })}
                            value={experience}
                            placeholder={'1'}
                        /> */}
                        <Dropdown
                            data={number}
                            baseColor={'#ccff33'}
                            textColor={'#ffff99'}
                            itemColor={'#00e6e6'}
                            selectedItemColor={'#ff00aa'}
                            onChangeText={e => this.setState({ experience: e })}
                        />


                    </View>
                    <View style={{ width: 220, height: 50, marginTop: 20 }} >

                        <Button
                            linearGradientProps={{
                                colors: ['#4da6ff', '#80ff80'],
                                start: { x: 0, y: 0.5 },
                                end: { x: 1, y: 0.5 },
                            }}
                            onPress={this.submit}

                            large
                            title='Submit' />

                    </View>


                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    someButtonStyle: {
        flex: 1,
        // backgroundColor: '#7FB3D5',
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 20,
        // opacity:0.9
        color: "#f0f"
    },


});

function mapStateToProp(state) {
    return ({
        user: state.authReducers.USER,
        allUser: state.authReducers.ALLUSER
    })
}
function mapDispatchToProp(dispatch) {
    return ({



    })
}

export default connect(mapStateToProp, mapDispatchToProp)(OfferGiven);

