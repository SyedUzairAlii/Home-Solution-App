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
class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    static navigationOptions = {
        title: "Add Service's",

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
            backgroundColor: '#6699cc',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };


    componentDidMount() {
        const { user ,allUser} = this.props;
        console.log("Service user props <><><><><><><>", allUser)
        this.setState({
            name: user.name,
            uid: user.UID,
        })
    }
    submit = () => {
        const{ experience,category , uid} = this.state
        if(!category){
          alert('Please Select a category')
        }else if(!experience){
          alert('please tell your experience ')
        }else{
          const obj = {
            category : category,
            experience : experience,
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

    render() {
        let data = [{
            value: 'Plumber',
        }, {
            value: 'Electricion',
        },
        {
            value: 'Carpainter',
        }, {
            value: 'A.c Repair',
        }, {
            value: 'Painter',
        }, {
            value: 'Car Mechanic',
        }, {
            value: 'Fumigation',
        }, {
            value: 'Towing van'
        }
        ];
        let number = [{
            value: '1',
        }, {
            value: '2',
        },
        {
            value: '3',
        }, {
            value: '4',
        }, {
            value: '5',
        }, {
            value: '5+',
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
                        <Text style={{ paddingTop: 10, fontSize: 20, fontWeight: "bold", color: '#ccff33' }}>Select Service</Text>

                        <Dropdown
                            label='Select Service'
                            data={data}
                            baseColor={'#ccff33'}
                            textColor={'#ffff99'}
                            itemColor={'#00e6e6'}
                            selectedItemColor={'#ff00aa'}
                            onChangeText={e => this.setState({ category: e })}
                        />

                    </View>
                    <View style={{ width: 220, height: 50, marginBottom: 50, marginTop: 30 }} >

                        <Text style={{ paddingTop: 10, fontSize: 20, fontWeight: "bold", color: '#80ff80' }}>Field Exprience</Text>
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

export default connect(mapStateToProp, mapDispatchToProp)(Menu);

