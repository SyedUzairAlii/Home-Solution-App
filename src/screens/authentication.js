import React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
// import { black } from 'ansi-colors';
import firebase from '../config/Firebase';
import { StackActions, NavigationActions } from 'react-navigation';
// import Expo from 'expo';
import * as Expo from 'expo';
import { Constants } from 'expo';
import { current_User } from '../Store/actions/authAction'
import { connect } from 'react-redux';
import { User_Messages } from '../Store/actions/authAction'
// var provider = new firebase.auth.FacebookAuthProvider();
class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: '',
            Password: '',
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                // console.log(user);
                const userCurrent= user
                this.props.message(userCurrent)
                const currentUser = user
                this.props.user(currentUser)
                // const resetAction = StackActions.reset({
                //     index: 0,
                //     actions: [
                //         NavigationActions.navigate({ routeName: 'Home' }),
                //         // NavigationActions.navigate({ routeName: 'LogIn' }),
                //     ]
                // })
                // this.props.navigation.dispatch(resetAction)


            }
        })
    }
    static navigationOptions = {
        //  drawerLockMode: 'locked-closed',
        title: 'Home Solution ',
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
    componentWillReceiveProps(props) {
        const { currentUser, allUser } = props;
        if (currentUser) {

            if (currentUser.number) {

                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Home' }),
                    ]
                })
                this.props.navigation.dispatch(resetAction)
            } else {
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Phone' }),
                    ]
                })
                this.props.navigation.dispatch(resetAction)
            }
        }
    }

    async   Goolge() {
        googleAuthenticate = (idToken, accessToken) => {
            const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
            return firebase.auth().signInWithCredential(credential);
        };
    }
    _loginWithGoogle = async function () {
        try {
            const result = await Expo.Google.logInAsync({
                androidClientId: '603901528269-0cjj3nqci17lq1hg5chjst5fv810e4da.apps.googleusercontent.com',
                iosClientId: '603901528269-pglj42lqtlgivndd4gbo7avg4r43h471.apps.googleusercontent.com',
                scopes: ["profile", "email"]
            });
            if (result.type === 'success') {
                // this.props.navigation.navigate('Home', result)
                // console.log('Result-->', result);

                this.props.profilePic = result.photoUrl
                this.props.profileName = result.givenName
                const { idToken, accessToken } = result;
                const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
                firebase
                    .auth()
                    .signInAndRetrieveDataWithCredential(credential)
                    .then(success => {
                        // user res, create your user, do whatever you want
                        // console.log('success==>', success);
                        var currentUID = success.user.uid
                        var obj = {
                            name: success.user.displayName,
                            UID: success.user.uid,
                            photo: success.user.photoURL,
                            Token: accessToken
                        }
                        firebase.database().ref('/UserData/' + currentUID).update(obj);
                        this.props.Google_auth(currentUID, obj)
                        this.props.user(currentUID)
                    })
                    .catch(error => {
                        console.log("firebase cred err:", error);
                    });
                return result.accessToken;

            } else {
                // console.log('/////');
                return { cancelled: true };
            }

            //   if (result.type === "success") {
            //     const { idToken, accessToken } = result;
            //     const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
            //     firebase
            //       .auth()
            //       .signInAndRetrieveDataWithCredential(credential)
            //       .then(res => {
            //         // user res, create your user, do whatever you want
            //         console.log(res,"response")
            //       })
            //       .catch(error => {
            //         console.log("firebase cred err:", error);
            //       });
            //   } else {
            //     return { cancelled: true };
            //   }
        } catch (err) {
            console.log("err:", err);
        }
    };
    async logInFB() {

        const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
        } = await Expo.Facebook.logInWithReadPermissionsAsync('424874411381787', {
            permissions: ['public_profile'],
        });
        if (type === 'success') {
            const credential = firebase.auth.FacebookAuthProvider.credential(token)

            firebase.auth().signInAndRetrieveDataWithCredential(credential).then((success) => {

                console.log(success.additionalUserInfo.profile.name, 'success******');
                var currentUID = success.user.uid
                var obj = {
                    name: success.additionalUserInfo.profile.name,
                    UID: success.user.uid,
                    photo: success.user.photoURL,
                    Token: token
                }
                firebase.database().ref('/UserData/' + currentUID).update(obj);
            })
                .catch((error) => {
                    // console.log(error);


                })
            // console.log("fb login");
            // const resetAction = StackActions.reset({
            //     index: 0,
            //     actions: [
            //         NavigationActions.navigate({ routeName: 'Home' }),
            //     ]
            // })
            // this.props.navigation.dispatch(resetAction)
        } else {
            type === 'cancel'
        }

    }
    static navigationOptions = { header: null }
    render() {
        const { Email, Password } = this.state


        return (
            
            <View>

                    <View style={styles.statusBar} />
                    <View >

                        {/* <ScrollView style={styles.body} keyboardDismissMode="interactive"> */}
                            <Text style={styles.Heading}>Log In</Text>



                            <TouchableOpacity style={styles.buton} onPress={() => this.logInFB()}>
                           
                                <Text style={styles.ButtonText} >Facebook LogIn</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.google} onPress={() => this._loginWithGoogle()}>
                                
                                <Text style={styles.ButtonText} >Login google</Text>
                            </TouchableOpacity>


                        {/* </ScrollView> */}

                    </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db',
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 20
    },

    Heading: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginTop: 60,
        marginBottom: 85,
        fontSize: 50,
        // fontFamily: 'Helvetica',
        fontWeight: 'bold',
        color: '#ffff',
        textAlign: 'center'
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginBottom: 20,
        color: '#fff',
        height: 40,
        width: 300,
        paddingHorizontal: 10,
        fontSize: 18
    },
    buton: {
        alignItems: 'center',
        backgroundColor: '#0055ff',
        paddingVertical: 10,
        marginBottom: 20,
        width:220,
        // justifyContent: 'space-between',


    },
    google: {
        alignItems: 'center',
        backgroundColor: '#ff0000',
        paddingVertical: 10,
        marginBottom: 20,
        width:220,
        // justifyContent: 'space-between',


    },
    ButtonText: {
        fontWeight: 'bold',
        color: "#ffff",
        // alignItems:'center'
        fontSize: 20
    },
    statusBar: {
        backgroundColor: "#C2185B",
        height: Constants.statusBarHeight,
    },

});
function mapStateToProps(states) {
    return ({
        profilePic: states.authReducers.PROFILEPIC,
        profileName: states.authReducers.PROFILENAME,
        currentUser: states.authReducers.USER,
        allUser: states.authReducers.ALLUSER
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        user: (currentUser) => {
            dispatch(current_User(currentUser))
        },
        message: (userCurrent) => {
            dispatch(User_Messages(userCurrent))
        },
        // fb_User: (type, token) => {
        //     dispatch(fb_Action(type, token))
        // },
        // Google_auth: (currentUID, obj) => {
        //     dispatch(Google_Action(currentUID, obj))
        // },
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);