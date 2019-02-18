import React from 'react';
import { View, KeyboardAvoidingView, ScrollView, Image, InputAccessoryView, Text, TextInput, ImageBackground, StyleSheet, TouchableOpacity, ActivityIndicator, } from 'react-native';
import firebase from '../config/Firebase';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'
import { Input, Header, Divider, Avatar, Button } from 'react-native-elements';
import { DrawerActions } from 'react-navigation';
import { Constants, Location, Permissions, Contacts } from 'expo';
import www from '../../assets/inbox.png'
import Icon from 'react-native-vector-icons/FontAwesome';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            person: null,
            ok: false,
        };
    }

    static navigationOptions = {

        // title:, 
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
        const { navigation, user, chatMessages } = this.props;
        const person = navigation.getParam('receverDetails')
        this.setState({
            person,
            data: true
        })
        this.setState({
            currentUser: user,

        })
        console.log(chatMessages, 'chatMessages')
        console.log(person, 'receverUser')

        if (chatMessages) {
            const myData = chatMessages.sort((a, b) => {
                return a.date - b.date
            })
            console.log(myData,'myDtata')
        }

    }
    send = () => {
        const { text, person, currentUser } = this.state;
        var user = currentUser.UID
        var recever = person.uid
        var message = text
        if (text) {
            const obj = {
                message: message,
                senderUid: user,
                reciverUid: recever,
                date: Date.now()
            }
            firebase.database().ref('/Messages/').push(obj).then(() => {
                this.setState({
                    text: null,

                })
            })
            // console.log(obj,',....')
        }
    }
    componentWillReceiveProps(props) {
        const { navigation, user, chatMessages, flag } = props
        // var newMessage = [];
        if (chatMessages || flag) {
            var mm = chatMessages.pop();
            // newMessage.push(mm)
            console.log(mm, 'ubdatwe///')
        }
    }

    render() {
        const { person, data, text } = this.state
        // console.log(person, 'ssss')
        return (
            <ImageBackground source={www} style={{ width: '100%', height: '100%' }}>
                {/* <KeyboardAvoidingView behavior="position" enabled> */}

                <ScrollView>
                    <View style={{ flexGrow: 1 }}>

                    </View>
                </ScrollView>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
                    <View style={{ height: 40, backgroundColor: 'white', width: '75%', borderRadius: 40, justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 10 }}>
                        <ScrollView>

                            <TextInput
                                // style={{
                                //   width:'100%'
                                // }}
                                multiline={true}
                                placeholder={'Type a mesage '}
                                // inputAccessoryViewID={inputAccessoryViewID}
                                onChangeText={text => this.setState({ text })}
                                value={this.state.text}
                            />
                        </ScrollView>
                    </View>
                    <View styele={{ width: '20%', }}>
                        <Button
                            linearGradientProps={{
                                colors: ['#403B4A', '#E7E9BB'],
                                start: { x: 0, y: 0.5 },
                                end: { x: 1, y: 0.5 },
                            }}
                            onPress={this.send}

                            large
                            icon={{ name: 'arrow-small-right', type: 'octicon', }}
                        // title='Add Service'
                        />
                    </View>
                </View>
                {/* </KeyboardAvoidingView> */}



            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    img: {
        height: 160,
        width: 165,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardTitle: {
        paddingTop: 8,
        paddingBottom: 8,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#424c59'
    },
    titleName: {
        paddingTop: 6,
        paddingBottom: 3,
        fontSize: 14,
        fontWeight: '600',

    }

});

function mapStateToProp(state) {
    return ({
        user: state.authReducers.USER,
        allUser: state.authReducers.ALLUSER,
        chatMessages: state.authReducers.CHAT,
        flag: state.authReducers.FLAG

    })
}
function mapDispatchToProp(dispatch) {
    return ({



    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Chat);

