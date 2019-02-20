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
class ViewOffer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: null
        };
    }

    static navigationOptions = {
        title: "Offer",
        headerStyle: {
            backgroundColor: '#075e54',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };


    componentDidMount() {
        const { user, navigation } = this.props;
        const person = navigation.getParam('person')
        console.log(person, 'person')
        this.setState({
            person,
            currentUser: user,
            name: user.name,
            uid: user.UID,
        })
        //status
        const personUID = person.uid;
        const UID = user.UID
        firebase.database().ref('/Request/' + UID).on('child_changed', (snapShot) => {
            if (snapShot.val().data.UID === personUID) {
                console.log(snapShot.val(), '=====///>>')
                if (snapShot.val().status === 'Accept') {
                    // this.setState({ })
                    console.log('accepteed')
                } else if (snapShot.val().status === 'pending') {
                    // this.setState({  })
                    console.log('pending')

                }
            }
           

        })
        firebase.database().ref('/Request/' + UID).on('child_added', (snapShot) => {
            if (snapShot.val().data.UID === personUID) {
                console.log(snapShot.val(), '=====///>>')
                if (snapShot.val().status === 'Accept') {
                    // this.setState({  })
                    console.log('accepteed')
                } else if (snapShot.val().status === 'pending') {
                    // this.setState({ })
                    console.log('pending')

                }
            }
            
        })
            
    }
    submit = () => {
        // const{ experience,category , uid} = this.state
        const { person, currentUser, text } = this.state
        if (text == null) {
            alert('Please Set Amount')
        } else if (!experience) {
            alert('please tell your Visitng day ')
        } else {

            const { person, currentUser, text, day } = this.state
            // console.log(person,'pesaon')
            const personUID = person.uid;
            const me = currentUser
            const rate = text
            const weekDay = day
            const obj = {
                status: 'Pending',
                data: me,
                rate: rate,
                WorkingDay: weekDay,
                sellerUid: personUID,
            }
            firebase.database().ref('/Request/' + personUID).push(obj).then(() => {
                this.setState({
                    Status: true,

                })
            })
        }
    }

    render() {
        let number = [{
            value: 'Monday',
        }, {
            value: 'Tuesday',
        },
        {
            value: 'Wedsnessday',
        }, {
            value: 'Thursday',
        }, {
            value: 'Friday',
        }, {
            value: 'Saturday',
        },
        {
            value: 'Sunday',
        }
        ];


        const { allUser, list, category, experience, text, } = this.state
        return (
            <ImageBackground source={www} style={{ width: '100%', height: '100%' }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    // justifyContent: 'space-between',
                    // justifyContent: 'center',
                    alignItems: "center"
                }}>

                       

                   
                   
                   
                       <View>
                            <Text style={{ fontSize: 25, fontWeight: "bold", color: '#f2f2f2' }}>{}</Text>

                            <Text style={{ fontSize: 22, color: '#f2f2f2' }}><Text style={{ fontSize: 19, color: '#F3F9A7' }}>Rate</Text> Pkr</Text>
                            <Text style={{ fontSize: 22, color: '#f2f2f2' }}><Text style={{ fontSize: 19, color: '#F3F9A7' }}>Week-Day: </Text>{}</Text>

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

export default connect(mapStateToProp, mapDispatchToProp)(ViewOffer);

