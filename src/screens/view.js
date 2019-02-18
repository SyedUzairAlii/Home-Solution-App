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



class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            person: null,
            ok: false,
        };
    }

    static navigationOptions = {

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
            backgroundColor: '#6699cc',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };
    componentDidMount() {
        const { navigation, user } = this.props;
        const person = navigation.getParam('i')
        // console.log("perams>>",person)
        this.setState({
            person,
            data: true
        })
        // const { user, allUser } = this.props;
        // console.log("phone user props", user)
        this.setState({
            currentUser: user,

        })
        console.log(user, 'userprops')
        const personUID = person.uid;
        const UID = user.UID
        firebase.database().ref('/Request/' + personUID).on('child_changed', (snapShot) => {
            if (snapShot.val().data.UID === UID) {
                console.log(snapShot.val(), '=====///>>')
                if (snapShot.val().status === 'Accept') {
                    this.setState({ Accept: true, Panding: false, ok: true })
                    console.log('accepteed')
                } else if (snapShot.val().status === 'Pending') {
                    this.setState({ Panding: true, request: true, })
                    console.log('pending')

                }
            }

        })
        firebase.database().ref('/Request/' + personUID).on('child_added', (snapShot) => {
            if (snapShot.val().data.UID === UID) {
                console.log(snapShot.val(), '=====///>>')
                if (snapShot.val().status === 'Accept') {
                    this.setState({ Accept: true, Panding: false, ok: true,request: true, })
                    console.log('accepteed')
                } else if (snapShot.val().status === 'Pending') {
                    this.setState({ Panding: true, request: true, })
                    console.log('pending')

                }
            }

        })

    }

    componentWillReceiveProps(props) {

    }

    request = () => {
        const { person, currentUser } = this.state
        // console.log(person,'pesaon')
        const personUID = person.uid;
        const me = currentUser
        const obj = {
            status: 'Pending',
            data: me,
            sellerUid: personUID,
        }
        firebase.database().ref('/Request/' + personUID).push(obj).then(() => {
            this.setState({
                request: true,

            })
        })

    }
    chat = () =>{
        const{person} = this.state
        const receverDetails = person
        this.props.navigation.navigate('Chat',{receverDetails} )
    }
    render() {
        const { person, data, Year, request,ok } = this.state
        // console.log(person, 'ssss')
        return (
            <ImageBackground source={www} style={{ width: '100%', height: '100%' }}>
                {data &&


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
                            <View style={{ paddingTop: 5, width: 200 }}>
                                {!request ?

                                    <Button
                                        linearGradientProps={{
                                            colors: ['#4c669f', '#3b5998', '#192f6a'],
                                            start: { x: 0, y: 0.5 },
                                            end: { x: 1, y: 0.5 },
                                        }}
                                        onPress={this.request}

                                        // large
                                        title='Send Request' />
                                    :

                                    <Text style={{ fontSize: 20, fontWeight: "bold", color: '#f2f2f2' }}>Pending</Text>


                                }

                            </View>
                        </View>

                        <View style={{ marginTop: 70, paddingLeft: 10, paddingTop: 30 }}>
                            <Text style={{ fontSize: 25, fontWeight: "bold", color: '#f2f2f2' }}>{person.category}</Text>



                            <Text style={{ fontSize: 22, color: '#f2f2f2' }}><Text style={{ fontSize: 19, color: '#F3F9A7' }}>Rating: </Text>Not Rated</Text>
                            <Text style={{ fontSize: 19, color: '#f2f2f2' }}><Text style={{ fontSize: 19, color: '#F3F9A7' }}>Number: </Text>{person.number}</Text>

                            <Text style={{ fontSize: 22, color: '#f2f2f2' }}><Text style={{ fontSize: 19, color: '#F3F9A7' }}>Experience: </Text>{person.experience}</Text>

                            <Text style={{ fontSize: 22, color: '#f2f2f2' }}><Text style={{ fontSize: 19, color: '#F3F9A7' }}>Location: </Text>{person.experience}</Text>
                        </View>



                    </View>
                }{
                    ok &&
                    <View style={{ marginTop: 70, paddingLeft: 10, paddingTop: 30 }}>
                        <View>
                            <Button
                                linearGradientProps={{
                                    colors: ['#4c669f', '#3b5998', '#192f6a'],
                                    start: { x: 0, y: 0.5 },
                                    end: { x: 1, y: 0.5 },
                                }}
                                onPress={this.chat}

                                // large
                                title='Contact' />
                        </View>
                        <View>
                            <Button
                                linearGradientProps={{
                                    colors: ['#4c669f', '#3b5998', '#192f6a'],
                                    start: { x: 0, y: 0.5 },
                                    end: { x: 1, y: 0.5 },
                                }}
                                onPress={this.request}

                                // large
                                title='Get Direction' />
                        </View>

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



    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Home);

