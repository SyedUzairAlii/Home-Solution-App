import React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import firebase from '../config/Firebase';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'
import { Input, Header, Divider, Button,Avatar } from 'react-native-elements';
import { DrawerActions } from 'react-navigation';
import { Constants, Location, Permissions } from 'expo';
import { red } from 'ansi-colors';
import www from '../../assets/nn.jpg'
import Mmm from '../../assets/kk.jpg'

import { Log_Out } from '../Store/actions/authAction'

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceSubmit: false
        };
    }
    // componentDidMount(){
    //     const {user} =this.props

    //     let currentUser = user
    //     if(user){
    //         firebase.database().ref('/Messages/').on('child_added', snapShot => {
    //             const Messages = snapShot.val();
    //             console.log(Messages,"check messages")
    //         })
    //     } 
    // }
    
    componentWillReceiveProps(props){
        const{user,me}= props
        // console.log(user,'logout')
        let currentUser = user
        if (user) {
            if (currentUser.name) {

                this.setState({
                    currentUser,
                    userLogin: true
                })
            }
        }
        if(me === null){
            this.setState({
                
                userLogin: false
            })
        }
    }
    static navigationOptions = {
        title: 'Menu',
        headerStyle: {
            backgroundColor: '#6699cc',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };
    service = () => {
        this.props.navigation.navigate('service')


    }
    notifiaction = () => {
        this.props.navigation.navigate('Notification')


    }
    Home = () => {

        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' }),
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }
    inbox = () => {

        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'inbox' }),
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }
    map = () => {

        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'map' }),
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }
    map = () => {

        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'map' }),
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }
    LogOut = () => {
        this.props.logout()

        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'LogIn' }),
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }

    render() {

        const { allUser, list, userLogin,currentUser} = this.state
        return (
            <View>
            <View style={styles.statusBar} />

            <ImageBackground source={www} style={{ width: '100%', height: '100%' }}>
                {userLogin ?
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        // justifyContent: 'space-between',
                        justifyContent: 'center',
                        alignItems: "center",
                        marginBottom:70
                    }}>
                        <View style={{ width: 250, height: 190,  overflow:'hidden', marginBottom:10 ,flexDirection:'column',justifyContent:'center'}} >
                            <ImageBackground source={Mmm} style={{ width: '100%', height: '100%' }}>
                             <View style={{ flexDirection:'column',justifyContent:'center',marginTop:70,padding:5}}>

                                   <View>
                               <Avatar
                                    size="large"
                                    rounded
                                    title="CR"
                                    // onPress={() => this.pickImage}
                                    activeOpacity={0.7}
                                    source={{
                                        uri: currentUser.photo
                                        
                                    }}
                                    
                                    />
                               </View>
                               <View style={{marginTop:5}}>

                                <Text style={{ fontSize: 20, color:'#d7eeef',fontWeight:'bold',}}>{currentUser.name}</Text>
                               </View>
                                    </View>
                            </ImageBackground>
                        </View>
                        <View style={{ width: 200, height: 80, borderRadius: 40 }} >
                            <Button
                                linearGradientProps={{
                                    colors: ['#E7E9BB', '#403B4A'],
                                    start: { x: 0, y: 0.5 },
                                    end: { x: 1, y: 0.5 },
                                }}
                                onPress={this.Home}

                                large
                                icon={{ name: 'home', type: 'octicon', }}
                                title='Home' />
                        </View>
                        <View style={{ width: 200, height: 80, borderRadius: 40 }} >

                            <Button
                                linearGradientProps={{
                                    colors: ['#E7E9BB', '#403B4A'],
                                    start: { x: 0, y: 0.5 },
                                    end: { x: 1, y: 0.5 },
                                }}
                                onPress={this.service}

                                large
                                icon={{ name: 'plus', type: 'octicon', }}
                                title='Add Service' />


                        </View>

                        <View style={{ width: 200, height: 80, borderRadius: 40 }} >
                            <Button
                                linearGradientProps={{
                                    colors: ['#E7E9BB', '#403B4A'],
                                    start: { x: 0, y: 0.5 },
                                    end: { x: 1, y: 0.5 },
                                }}
                                onPress={this.notifiaction}

                                large
                                icon={{ name: 'inbox', type: 'octicon', }}
                                title='Inbox' />
                        </View>


                        {/* <View style={{ width: 200, height: 80, borderRadius:40    }} >
                    <Button
                        linearGradientProps={{
                            colors: [ '#E7E9BB','#403B4A'],
                            start: { x: 0, y: 0.5 },
                            end: { x: 1, y: 0.5 },
                        }}
                        onPress={this.map}

                        large
                        icon={{ name: 'location', type: 'octicon', }}
                        title='Google Map ' />
                </View> */}
                        {/* <View style={{ width: 200, height: 80, borderRadius:40    }} >
                    <Button
                     linearGradientProps={{
                         colors: [ '#E7E9BB','#403B4A'],
                         start: { x: 0, y: 0.5 },
                        end: { x: 1, y: 0.5 },
                    }}
                    onPress={this.Setting}
                    
                        large
                        icon={{ name: 'settings', type: 'octicon', }}
                        title='Setting' />
                </View> */}
                        <View style={{ width: 200, height: 80, borderRadius: 80 }} >
                            <Button
                                linearGradientProps={{
                                    colors: ['#E7E9BB', '#403B4A'],
                                    start: { x: 0, y: 0.5 },
                                    end: { x: 1, y: 0.5 },
                                }}
                                onPress={this.LogOut}
                                large
                                icon={{ name: 'sign-in', type: 'octicon', }}
                                title='Log-Out' />
                        </View>



                    </View>
                    :
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        // justifyContent: 'space-between',
                        justifyContent: 'center',
                        alignItems: "center"
                    }}>

                        <Text style={{ fontSize: 25, fontWeight: "bold", color: '#f2f2f2' }}>Firs't SignUp</Text>

                    </View>
                }
            </ImageBackground>
            </View>
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
    statusBar: {
        backgroundColor: "#075e54",
        height: Constants.statusBarHeight,
    },


});

function mapStateToProp(state) {
    return ({
        user: state.authReducers.USER,
        allUser: state.authReducers.ALLUSER,
        me:state.authReducers.USER,
    })
}
function mapDispatchToProp(dispatch) {
    return ({

        logout: () => {
            dispatch(Log_Out())
        },

    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Menu);

