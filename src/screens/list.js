import React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity , ImageBackground} from 'react-native';
import firebase from '../config/Firebase';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'
import { Input, Header, Divider, Button } from 'react-native-elements';
import { DrawerActions } from 'react-navigation';
import { Constants, Location, Permissions } from 'expo';
import { red } from 'ansi-colors';
import www from '../../assets/nn.jpg'
import { Log_Out } from '../Store/actions/authAction'

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceSubmit:false
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
        const {user} =props
        let currentUser = user
        if(user){
            if(currentUser.category){

               this.setState({
                   serviceSubmit:true
               })
            }
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
    contact = () => {

        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'contact' }),
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

        const { allUser, list ,serviceSubmit} = this.state
        return (
            <ImageBackground  source= {www} style={{width: '100%', height: '100%'}}>
            <View style={{
                flex: 1,
                flexDirection: 'column',
                // justifyContent: 'space-between',
                justifyContent: 'center',
                alignItems: "center"
            }}>
                  <View style={{ width: 200, height: 80, borderRadius:40  }} >
                   
                    <Button
                        linearGradientProps={{
                            colors: [ '#E7E9BB','#403B4A'],
                            start: { x: 0, y: 0.5 },
                            end: { x: 1, y: 0.5 },
                        }}
                    onPress={this.service}

                        large
                        icon={{ name: 'plus', type: 'octicon', }}
                        title='Add Service' />
                        
                        
                </View>
                <View style={{ width: 200, height: 80, borderRadius:40   }} >
                    <Button
                        linearGradientProps={{
                            colors: [ '#E7E9BB','#403B4A'],
                            start: { x: 0, y: 0.5 },
                            end: { x: 1, y: 0.5 },
                        }}
                    onPress={this.contact}

                        large
                        icon={{ name: 'person', type: 'octicon', }}
                        title='Contact User' />
                </View>
                <View style={{ width: 200, height: 80, borderRadius:40    }} >
                    <Button
                        linearGradientProps={{
                            colors: [ '#E7E9BB','#403B4A'],
                            start: { x: 0, y: 0.5 },
                            end: { x: 1, y: 0.5 },
                        }}
                    onPress={this.notifiaction}

                        large
                        icon={{ name: 'inbox', type: 'octicon', }}
                        title='Inbox' />
                </View>
               
              
                <View style={{ width: 200, height: 80, borderRadius:40    }} >
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
                </View>
                <View style={{ width: 200, height: 80, borderRadius:40    }} >
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
                </View>
                <View style={{ width: 200, height: 80, borderRadius:80    }} >
                    <Button
                        linearGradientProps={{
                            colors: [ '#E7E9BB','#403B4A'],
                            start: { x: 0, y: 0.5 },
                            end: { x: 1, y: 0.5 },
                        }}
                        onPress={this.LogOut}
                        large
                        icon={{ name: 'sign-in', type: 'octicon', }}
                        title='Log-Out' />
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

        logout: () => {
            dispatch(Log_Out())
        },

    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Menu);

