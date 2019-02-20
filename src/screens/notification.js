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
        //  drawerLockMode: 'locked-closed',
        title: 'Notification',

        headerStyle: {
            backgroundColor: '#075e54',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };
    componentDidMount() {
        const { receviRequest, user } = this.props;
        if (receviRequest) {
            var receviRequests = receviRequest
            this.setState({
                receviRequests,
                loading: true
            })
            console.log("receviRequest>>", receviRequest)
        }
        // this.setState({
        //     person,
        //     data: true
        // })
        // setTimeout(()=>{
        //     this.setState({

        //         loading: true
        //     })
        // },1000)
        // // const { user, allUser } = this.props;
        // // console.log("phone user props", user)
        // this.setState({
        //     currentUser: user,

        // })
        // console.log(user, 'userprops')
        // const personUID = person.uid;
        // const UID = user.UID
        // firebase.database().ref('/Request/' + personUID).on('child_changed', (snapShot) => {
        //     if (snapShot.val().data.UID === UID) {
        //         console.log(snapShot.val(), '=====///>>')
        //         if (snapShot.val().status === 'Accept') {
        //             this.setState({ Accept: true, Panding: false, ok: true,loading:true})
        //             console.log('accepteed')
        //         } else if (snapShot.val().status === 'Pending') {
        //             this.setState({ Panding: true, request: true,loading:true })
        //             console.log('pending')

        //         }
        //     }


        // })



        // firebase.database().ref('/Request/' + personUID).on('child_added', (snapShot) => {
        //     if (snapShot.val().data.UID === UID) {
        //         console.log(snapShot.val(), '=====///>>')
        //         if (snapShot.val().status === 'Accept') {
        //             this.setState({ Accept: true, Panding: false, ok: true,request: true, })
        //             console.log('accepteed')
        //         } else if (snapShot.val().status === 'Pending') {
        //             this.setState({ Panding: true, request: true, })
        //             console.log('pending')

        //         }
        //     }

        // })


    }

    componentWillReceiveProps(props) {

    }

    // request = () => {
    //     const { person, currentUser } = this.state
    //     // console.log(person,'pesaon')
    //     const personUID = person.uid;
    //     const me = currentUser
    //     const obj = {
    //         status: 'Pending',
    //         data: me,
    //         sellerUid: personUID,
    //     }
    //     firebase.database().ref('/Request/' + personUID).push(obj).then(() => {
    //         this.setState({
    //             request: true,

    //         })
    //     })

    // }
    chat = () => {
        const { person } = this.state
        const receverDetails = person
        this.props.navigation.navigate('Chat', { receverDetails })
    }
    render() {
        const { data, Year, request, ok, loading, receviRequests } = this.state
        // console.log(person, 'ssss')
        return (
            <ImageBackground source={www} style={{ width: '100%', height: '100%' }}>
                {!loading ?
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        justifyContent: 'center',
                        alignItems: "center"
                    }}>
                        <Text style={{ fontSize: 25, fontWeight: "bold", color: '#f2f2f2', paddingLeft: 20 }}>You Don't Have any Request Yet! </Text>
                    </View>
                    :



                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        // justifyContent: 'space-between',
                        // justifyContent: 'center',
                        // alignItems: "center"
                    }}>
                        <Text style={{ fontSize: 19, fontWeight: "bold", color: '#f2f2f2', paddingLeft: 20 }}> Notification Recived </Text>
                        {receviRequests.map((i) => {
                            return (
                                <View style={{ width: 350, height: 90, marginTop: 20, justifyContent: 'space-around', }}>
                                    <View style={{ paddingLeft: 3, paddingTop: 20, marginLeft: 5, flexDirection: 'row' }}>
                                        <View>
                                            <Avatar
                                                size="small"
                                                rounded
                                                title="CR"
                                                onPress={() => this.pickImage}
                                                activeOpacity={0.7}
                                                source={{
                                                    uri: i.data.photo

                                                }}

                                            />
                                        </View>
                                        <View>

                                            <Text style={{ fontSize: 16, fontWeight: "bold", color: '#f2f2f2', paddingLeft: 5 }}> {i.data.name}</Text>
                                        </View>
                                        <View style={{ height: 18, paddingLeft: 5, paddingRight: 5, paddingBottom: 15 }}><Button
                                            linearGradientProps={{
                                                colors: ['#4c669f', '#3b5998', '#192f6a'],
                                                start: { x: 0, y: 0.5 },
                                                end: { x: 1, y: 0.5 },
                                            }}
                                            onPress={this.request}

                                            // large
                                            title='Accept' /></View>
                                        <View style={{ height: 18, paddingLeft: 5, paddingRight: 5, paddingBottom: 15 }}><Button
                                            linearGradientProps={{
                                                colors: ['#4c669f', '#3b5998', '#192f6a'],
                                                start: { x: 0, y: 0.5 },
                                                end: { x: 1, y: 0.5 },
                                            }}
                                            onPress={this.request}

                                            // large
                                            title='Reject' /></View>


                                    </View>
                                    {/* <View style={{ paddingTop: 5, width: 200 }}>
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

                                    </View> */}
                                </View>





                            )
                        })


                        }
                    </View>


                }{
                    ok && loading &&
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
                        </View>
                        <View style={{ width: '50%', paddingLeft: 2 }}>
                            <Button
                                linearGradientProps={{
                                    colors: ['#4c669f', '#3b5998', '#192f6a'],
                                    start: { x: 0, y: 0.5 },
                                    end: { x: 1, y: 0.5 },
                                }}
                                // onPress={this.request}

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
        allUser: state.authReducers.ALLUSER,
        receviRequest: state.authReducers.RECEIVEREQUEST
    })
}
function mapDispatchToProp(dispatch) {
    return ({



    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Home);

