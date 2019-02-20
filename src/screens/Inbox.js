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
import { Delet_Messages } from '../Store/actions/authAction'
// import { User_New_Messages } from '../Store/actions/authAction'
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            person: null,
            ok: false,
            
        };
    }

    static navigationOptions = {

        title:"Home Solution", 
        headerRight: (
        <Icon
         
          raised
          name='search'
          type='font-awesome'
          color='#f50'
         
           />
          ),
        headerStyle: {
            backgroundColor: '#075e54',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };
    componentDidMount() {
        const { navigation, user, chatMessages } = this.props;
        const person = navigation.getParam('receverDetails')
        // var chat = []
        this.setState({
            person,
            data: true
        })
        this.setState({
            currentUser: user,

        })
        var fgh = []
        if (user) {
            console.log(user)

            firebase.database().ref('/Messages/').on('child_added', snapShot => {
                const Messages = snapShot.val();



                if (Messages.senderUid === user.UID|| Messages.reciverUid === user.UID) {
                    // console.log("user", snapShot.val())
                    fgh.push(Messages)


                }
            })
            // console.log(fgh, "ye jo kuch beh wo did mount me cha hy bus ")
        }
            if (chatMessages) {
                const currentUser = user
                const receverPerson = person
                var chat = []
                // const messg = chatMessages
                fgh.map((i) => {
                    if (i.senderUid === currentUser.UID && i.reciverUid === receverPerson.uid)   {
                        chat.push(i)
                    }
                    else if(i.reciverUid === currentUser.UID && i.senderUid === receverPerson.uid) {
                        chat.push(i)
                    }
                })

                this.setState({
                    chatMesg: chat
                })
                // console.log(chat,'>>>>>>>>>>>>>>')
            }
        
        // setTimeout(()=>{

        //     if (chat) {
        //         const myData = chat.sort((a, b) => {
        //             return a.date - b.date
        //         })
        //         console.log(myData, 'myDtata')
                
        //         this.setState({
        //             chatMesg: myData
        //         })
        //     }
            
        // },10000)
        // this.props.delet()



        // console.log(chatMessages, 'chatMessages')
        // console.log(person, 'receverUser')
        // if (chatMessages) {
        //     const currentUser = user
        //     var chat = []
        //     // const messg = chatMessages
        //     chatMessages.map((i) => {
        //         if (i.senderUid === currentUser.UID || i.reciverUid === currentUser.UID) {
        //             chat.push(i)
        //         }
        //     })
        //     this.setState({
        //         chatMesg: chat
        //     })
        //     // console.log('state ky chat ',chat)
        // }
        // if (chatMessages) {
        //     const myData = chatMessages.sort((a, b) => {
        //         return a.date - b.date
        //     })
        //     console.log(myData, 'myDtata')
        // }

    }
    send = () => {
        const { text, person, currentUser, chatMesg } = this.state;
        var user = currentUser.UID
        var recever = person.uid
        var message = text
        if(chatMesg){
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

        } else {
            if (text) {
                const obj = {
                    message: message,
                    senderUid: user,
                    reciverUid: recever,
                    date: Date.now(),
                    id: 1,
                    sender: currentUser,
                    reciver: person,


                }
                firebase.database().ref('/Messages/').push(obj).then(() => {
                    this.setState({
                        text: null,

                    })
                })
            }
        }
    }
    componentWillReceiveProps(props) {
        const { navigation, user, chatMessages, flag } = props
        const { chatMesg, currentUser,person} = this.state
        // const currentUser = currentUser
        const receverPerson = person
        var newMessage=[]
        if(chatMesg){

             newMessage = chatMesg.slice(0)
        }
        
        if (chatMessages || flag) {
            var mm = chatMessages.pop();
            // newMessage.push(mm)
            

                if (mm.senderUid === currentUser.UID && mm.reciverUid === receverPerson.uid)   {
                    newMessage.push(mm)
                }
                else if(mm.reciverUid === currentUser.UID && mm.senderUid === receverPerson.uid) {
                    newMessage.push(mm)
                }
           

            console.log(mm, 'ubdatwe///')

            this.setState({
                chatMesg: newMessage
            })
        }

    }

    render() {
        const { person, data, text,chatMesg,currentUser } = this.state
        // console.log(chatMesg,"reder chalny per state")
        // console.log(person, 'ssss')
        return (
            <ImageBackground source={www} style={{ width: '100%', height: '100%' }}>
                {/* <KeyboardAvoidingView behavior="position" enabled> */}
               
                <ScrollView>
                            <View style={{ flexDirection:'column',justifyContent:'center',marginTop:50,justifyContent:'space-between',flexGrow:1}}>
                    {
                        chatMesg && chatMesg.map((i)=>{
                            console.log(i,"map")
                            if(i.senderUid === currentUser.UID ){
                                return(
                                    <View key={i.uid}style={{backgroundColor:'#E3FDCB',width:200, marginLeft:110 ,borderRadius:20 ,justifyContent:'center',marginBottom:5,marginTop:5,justifyContent:'flex-end'}}>
                                        <Text style={{justifyContent:'center',padding:10}}>{i.message}</Text>
                                    </View>
                                )
                            }else if(i.senderUid === person.uid){
                                return(

                                <View key={i.uid}style={{backgroundColor:'white',width:200, borderRadius:20,paddingLeft:10,justifyContent:'center',marginBottom:5,marginTop:5,justifyContent:'flex-start'}}>
                                <Text>{i.message}</Text>
                            </View>
                                )
                            }
                            
                        })
                    }

                    </View>
                </ScrollView>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
                    <View style={{ height: 40, backgroundColor: 'white', width: '75%', borderRadius: 40, justifyContent: 'center', paddingHorizontal: 18, paddingVertical: 10 }}>
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
                    <View styele={{ width: '25%', height:14,width:'29%'}}>
                        <Button
                            linearGradientProps={{
                                colors: ['#4c669f', '#3b5998', '#192f6a'],
                                start: { x: 0, y: 0.5 },
                                end: { x: 1, y: 0.5 },
                            }}
                            onPress={this.send}

                            large
                            // icon={{ name: 'arrow-small-right', type: 'octicon', }}
                        title='send'
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

        delet: () => {
            dispatch(Delet_Messages())
        },

    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Chat);

