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
                    this.setState({ oferDay: snapShot.val().WorkingDay,pending:false, offerStatus: snapShot.val().status, offerRate: snapShot.val().rate, firstOffer: true })
                    console.log('accepteed')
                } else if (snapShot.val().status === 'pending') {
                    this.setState({ oferDay: snapShot.val().WorkingDay,pending:true, offerStatus: snapShot.val().status, offerRate: snapShot.val().rate, firstOffer: true })
                    console.log('pending')

                }
            }


        })
        firebase.database().ref('/Request/' + UID).on('child_added', (snapShot) => {
            if (snapShot.val().data.UID === personUID) {
                console.log(snapShot.val(), '=====///>>')
                if (snapShot.val().status === 'Accept') {
                    this.setState({ oferDay: snapShot.val().WorkingDay,pending:false, offerStatus: snapShot.val().status, offerRate: snapShot.val().rate, firstOffer: true })
                    console.log('accepteed')
                } else if (snapShot.val().status === 'pending') {
                    this.setState({ oferDay: snapShot.val().WorkingDay,pending:true, offerStatus: snapShot.val().status, offerRate: snapShot.val().rate, firstOffer: true })
                    console.log('pending')

                }
            }

        })

    }
    accept = () =>{
         // const{ experience,category , uid} = this.state
        //  const { person, currentUser, text } = this.state
       

         const { person, currentUser, text, day } = this.state
         // console.log(person,'pesaon')
         const personUID = person.uid;
         const me = currentUser
         const rate = text
         const weekDay = day
         const obj = {
             status: 'Accept',
             
         }
         firebase.database().ref('/Request/' + currentUser.UID).on('value', (snapshot) => {
             // console.log(snapshot.val())
             for (var key in snapshot.val()) {
                 var key12 = key;
                 var value = snapshot.val()[key12]
                 console.log(value)
                 if(value.data.UID === personUID && value.sellerUid === currentUser.UID){
                     firebase.database().ref('/Request/' + currentUser.UID +'/'+ key12 +'/').update(obj).then(() => {
                             console.log(value.data.UID)
                         })
                 }
                 // are.push(key12)
             }
         })
    }
   reject= () => {
        // const{ experience,category , uid} = this.state
        // const { person, currentUser, text } = this.state
       

            const { person, currentUser, text, day } = this.state
            // console.log(person,'pesaon')
            const personUID = person.uid;
            const me = currentUser
            const rate = text
            const weekDay = day
            const obj = {
                status: 'Reject',
                
            }
            firebase.database().ref('/Request/' + currentUser.UID).on('value', (snapshot) => {
                // console.log(snapshot.val())
                for (var key in snapshot.val()) {
                    var key12 = key;
                    var value = snapshot.val()[key12]
                    console.log(value)
                    if(value.data.UID === personUID && value.sellerUid === currentUser.UID){
                        firebase.database().ref('/Request/' + currentUser.UID +'/'+ key12 +'/').update(obj).then(() => {
                                console.log(value.data.UID)
                            })
                    }
                    // are.push(key12)
                }
            })
        
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


        const { pending, list, category, experience, text, firstOffer,oferDay,offerStatus,offerRate} = this.state
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
                        <Text style={{ fontSize: 25, fontWeight: "bold", color: '#f2f2f2' }}>{offerStatus}</Text>

                        <Text style={{ fontSize: 22, color: '#f2f2f2' }}><Text style={{ fontSize: 19, color: '#F3F9A7' }}>Rate</Text> {offerRate} PKR</Text>
                        <Text style={{ fontSize: 22, color: '#f2f2f2' }}><Text style={{ fontSize: 19, color: '#F3F9A7' }}>Week-Day: </Text>{oferDay}</Text>

                    </View>
{
    pending &&
    <View style={{ marginTop: 70, paddingLeft: 5, paddingTop: 30, flexDirection: 'row', paddingBottom: 10, paddingRight: 5 }}>


    <View style={{ width: '50%', paddingRight: 2 }}>
        <Button
            linearGradientProps={{
                colors: ['#4c669f', '#3b5998', '#192f6a'],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
            }}
            onPress={this.accept}

            // large
            title='Accept' />
    </View>

        <View style={{ width: '50%', paddingLeft: 2 }}>
            <Button
                linearGradientProps={{
                    colors: ['#4c669f', '#3b5998', '#192f6a'],
                    start: { x: 0, y: 0.5 },
                    end: { x: 1, y: 0.5 },
                }}
                onPress={() => this.reject}

                // large
                title='Reject' />
        </View>
        </View>

}
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

