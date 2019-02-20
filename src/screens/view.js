import React from 'react';
import { View, ScrollView, Image, Text, TextInput, ImageBackground, StyleSheet, TouchableOpacity, ActivityIndicator, } from 'react-native';
import firebase from '../config/Firebase';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'
import { Input, Header, Divider, Avatar, Button } from 'react-native-elements';
import { DrawerActions } from 'react-navigation';
import { Constants, Location, Permissions, Contacts } from 'expo';
import www from '../../assets/nn.jpg'
import Icon from 'react-native-vector-icons/FontAwesome';

// import {  User_New_Messages } from '../Store/actions/authAction'



class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            person: null,
            ok: false,
        };
    }

    static navigationOptions = {
        //  drawerLockMode: 'locked-closed',
        title: 'User Information',
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
        const { navigation, user } = this.props;
        // if(user){
        //     const userCurrent= user
        //     this.props.message(userCurrent)
        // }
        const person = navigation.getParam('i')
        // console.log("perams>>",person)
        this.setState({
            person,
            data: true
        })
        setTimeout(() => {
            this.setState({

                loading: true
            })
        }, 1000)
        // const { user, allUser } = this.props;
        // console.log("phone user props", user)
        this.setState({
            currentUser: user,

        })
        console.log(user, 'userprops')

        const personUID = person.uid;
        console.log(personUID, 'userprops')

        const UID = user.UID
        firebase.database().ref('/Request/' + UID).on('child_changed', (snapShot) => {
            if (snapShot.val().data.UID === 'personUID') {
                console.log(snapShot.val(), '=====///>>')
                if (snapShot.val().status === 'Accept') {
                    this.setState({ Accept: true, Panding: false, ok: true, loading: true })
                    console.log('accepteed')
                } else if (snapShot.val().status === 'pending') {
                    this.setState({ Panding: true, request: true, loading: true })
                    console.log('pending')

                }
            }


        })



        firebase.database().ref('/Request/' + UID).on('child_added', (snapShot) => {
            if (snapShot.val().data.UID === personUID) {
                console.log(snapShot.val(), '=====///>>')
                if (snapShot.val().status === 'Accept') {
                    this.setState({ Accept: true, Panding: false, ok: true, request: true, })
                    console.log('accepteed')
                } else if (snapShot.val().status === 'pending') {
                    this.setState({ Panding: true, request: true, })
                    console.log('pending')

                }
            }

        })


    }

    componentWillReceiveProps(props) {

    }

    Offer = () => {
        const { person, currentUser } = this.state
        // console.log(person,'pesaon')
        const personUID = person.uid;
        const me = currentUser
        this.props.navigation.navigate('ViewOffer', { person })


    }
    chat = () => {
        const { person } = this.state
        const receverDetails = person
        this.props.navigation.navigate('Chat', { receverDetails })
    }

    direction(userLocation){
        this.props.navigation.navigate('map' , {userLocation})

    }
    render() {
        const { person, data, Year, request, ok, loading } = this.state
        // console.log(person, 'ssss')
        return (
            <ImageBackground source={www} style={{ width: '100%', height: '100%' }}>
                {!loading ? <ActivityIndicator size="large" color="#0000ff" />
                    :



                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        // justifyContent: 'space-between',
                        // justifyContent: 'center',
                        // alignItems: "center"
                    }}>
                        {/* <View style={{ width: 300, height: 80, borderRadius: 40, marginTop:50, justifyContent: 'center',paddingLeft:50,marginLeft:20}} > */}
                        <View style={{ width: 300, height: 80, borderRadius: 40, paddingLeft: 55, marginLeft: 18, marginTop: 30, justifyContent: 'space-between', justifyContent: 'center', paddingTop: 30 }}>
                            <View style={{ paddingLeft: 30, paddingTop: 20, marginLeft: 30 }}>

                                <Avatar
                                    size="large"
                                    rounded
                                    title="CR"
                                    onPress={() => this.pickImage}
                                    activeOpacity={0.7}
                                    source={{
                                        uri: person.photo

                                    }}

                                />
                            </View>
                            <Text style={{ fontSize: 25, fontWeight: "bold", color: '#f2f2f2', paddingLeft: 20 }}> {person.name}</Text>
                            <View style={{ paddingTop: 5, width: 200, paddingLeft: 22 }}>
                                {!request ?

                                    <Text style={{ fontSize: 20, fontWeight: "bold", color: '#f2f2f2' }}>No Offer Yet!</Text>
                                    :
                                    <Button
                                        linearGradientProps={{
                                            colors: ['#4c669f', '#3b5998', '#192f6a'],
                                            start: { x: 0, y: 0.5 },
                                            end: { x: 1, y: 0.5 },
                                        }}
                                        onPress={this.Offer}

                                        // large
                                        title='View Offer' />



                                }

                            </View>
                        </View>

                        <View style={{ marginTop: 70, paddingLeft: 10, paddingTop: 30 }}>
                            <Text style={{ fontSize: 25, fontWeight: "bold", color: '#f2f2f2' }}>{person.category}</Text>



                            <Text style={{ fontSize: 22, color: '#f2f2f2' }}><Text style={{ fontSize: 19, color: '#F3F9A7' }}>Rating: </Text>Not Rated</Text>
                            <Text style={{ fontSize: 19, color: '#f2f2f2' }}><Text style={{ fontSize: 19, color: '#F3F9A7' }}>Number: </Text>{person.number}</Text>

                            <Text style={{ fontSize: 22, color: '#f2f2f2' }}><Text style={{ fontSize: 19, color: '#F3F9A7' }}>Experience: </Text>{person.experience + ' Year'}</Text>

                            <Text style={{ fontSize: 22, color: '#f2f2f2' }}><Text style={{ fontSize: 19, color: '#F3F9A7' }}>Location: </Text>Karachi,Pakistan</Text>
                        </View>



                    </View>
                }{
                    loading &&
                    <View style={{ marginTop: 70, paddingLeft: 5, paddingTop: 30, flexDirection: 'row', paddingBottom: 10, paddingRight: 5 }}>


                        <View style={{ width: '50%', paddingRight: 2 }}>
                            <Button
                                linearGradientProps={{
                                    colors: ['#4c669f', '#3b5998', '#192f6a'],
                                    start: { x: 0, y: 0.5 },
                                    end: { x: 1, y: 0.5 },
                                }}
                                onPress={this.chat}

                                // large
                                title='Contact' />
                        </View>{ok &&

                            <View style={{ width: '50%', paddingLeft: 2 }}>
                                <Button
                                    linearGradientProps={{
                                        colors: ['#4c669f', '#3b5998', '#192f6a'],
                                        start: { x: 0, y: 0.5 },
                                        end: { x: 1, y: 0.5 },
                                    }}
                                    onPress={() => this.direction(userLocation=person.Location)}

                                    // large
                                    title='Get Direction' />
                            </View>}

                    </View>
                }


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
        allUser: state.authReducers.ALLUSER
    })
}
function mapDispatchToProp(dispatch) {
    return ({

        // message: (userCurrent) => {
        //     dispatch( User_New_Messages(userCurrent))
        // },

    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Home);

