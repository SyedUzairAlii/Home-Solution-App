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
class OfferGiven extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: null
        };
    }

    static navigationOptions = {
        title: "Give Offer",

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
        firebase.database().ref('/Request/' + personUID).on('child_changed', (snapShot) => {
            if (snapShot.val().data.UID === UID) {
                console.log(snapShot.val(), '=====///>>')
                if (snapShot.val().status === 'Accept') {
                    this.setState({oferDay:snapShot.val().WorkingDay,offerStatus:snapShot.val().status,offerRate:snapShot.val().rate,firstOffer:true })

                    console.log('accepteed')
                } else if (snapShot.val().status === 'pending') {
                    this.setState({oferDay:snapShot.val().WorkingDay,offerStatus:snapShot.val().status,offerRate:snapShot.val().rate,firstOffer:true })
                    // this.setState({  })
                    console.log('pending')

                }
            }
           

        })
        firebase.database().ref('/Request/' + personUID).on('child_added', (snapShot) => {
            if (snapShot.val().data.UID === UID) {
                console.log(snapShot.val(), '=====///>>')
                if (snapShot.val().status === 'Accept') {
                    this.setState({oferDay:snapShot.val().WorkingDay,offerStatus:snapShot.val().status,offerRate:snapShot.val().rate,firstOffer:true })
                    console.log('accepteed')
                } else if (snapShot.val().status === 'pending') {
                    this.setState({oferDay:snapShot.val().WorkingDay,offerStatus:snapShot.val().status,offerRate:snapShot.val().rate,firstOffer:true })
                    console.log('pending')

                }
            }
            
        })
            
    }
    submit = () => {
        // const{ experience,category , uid} = this.state
        const { person, currentUser, text ,day} = this.state
        if (text == null) {
            alert('Please Set Amount')
        } else if (!day) {
            alert('please tell your Visitng day ')
        } else {

            const { person, currentUser, text, day } = this.state
            // console.log(person,'pesaon')
            const personUID = person.uid;
            const me = currentUser
            const rate = text
            const weekDay = day
            const obj = {
                status: 'pending',
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

    Update= () => {
        // const{ experience,category , uid} = this.state
        const { person, currentUser, text ,day} = this.state
        if (text == null) {
            alert('Please Set Amount')
        } else if (!day) {
            alert('please tell your Visitng day ')
        } else {

            const { person, currentUser, text, day } = this.state
            // console.log(person,'pesaon')
            const personUID = person.uid;
            const me = currentUser
            const rate = text
            const weekDay = day
            const obj = {
                
                
                rate: rate,
                WorkingDay: weekDay,
                
            }
            firebase.database().ref('/Request/' + personUID).on('value', (snapshot) => {
                // console.log(snapshot.val())
                for (var key in snapshot.val()) {
                    var key12 = key;
                    var value = snapshot.val()[key12]
                    console.log(value)
                    if(value.data.UID === me.UID && value.sellerUid === personUID){
                        firebase.database().ref('/Request/' + personUID +'/'+ key12 +'/').update(obj).then(() => {
                                console.log(value.data.UID)
                            })
                    }
                    // are.push(key12)
                }
            })
            // firebase.database().ref('/Request/' + personUID).push(obj).then(() => {
            //     this.setState({
            //         Status: true,

            //     })
            // })
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


        const { allUser, list, category, experience, text,status,firstOffer,oferDay,offerStatus,offerRate} = this.state
        return (
            <ImageBackground source={www} style={{ width: '100%', height: '100%' }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    // justifyContent: 'space-between',
                    // justifyContent: 'center',
                    alignItems: "center"
                }}>

                    <View style={{ width: 220, height: 50, marginBottom: 30, marginTop: 30 }} >
                        <Text style={{ paddingTop: 10, fontSize: 20, fontWeight: "bold", color: '#ccff33' }}>Cost</Text>
                        <TextInput
                            // style={{
                            //   width:'100%'
                            // }}
                            // backgroundColor='white'
                            keyboardType='numeric'
                            maxLength={6}
                            // multiline={true}
                            placeholder={'0 pkr'}
                            // inputAccessoryViewID={inputAccessoryViewID}
                            onChangeText={text => this.setState({ text })}
                            value={this.state.text}
                        />

                    </View>
                    <View style={{ width: 220, height: 50, marginBottom: 50, marginTop: 30 }} >

                        <Text style={{ paddingTop: 10, fontSize: 20, fontWeight: "bold", color: '#80ff80' }}>Service Day</Text>
                        {/* <TextInput
                            style={{ backgroundColor: '#ccff99', paddingBottom: 10, paddingTop: 10, fontSize: 20, fontWeight: "bold", color: '#80ff80' }}
                            keyboardType='numeric'
                            onChangeText={(e) => this.setState({ experience: e })}
                            value={experience}
                            placeholder={'1'}
                        /> */}
                        <Dropdown
                            data={number}
                            baseColor={'#ccff33'}
                            textColor={'#ffff99'}
                            itemColor={'#00e6e6'}
                            selectedItemColor={'#ff00aa'}
                            onChangeText={e => this.setState({ day: e })}
                        />


                    </View>
                    <View style={{ width: 220, height: 50, marginTop: 20 }} >
{!firstOffer ?
                        <Button
                            linearGradientProps={{
                                colors: ['#4da6ff', '#80ff80'],
                                start: { x: 0, y: 0.5 },
                                end: { x: 1, y: 0.5 },
                            }}
                            onPress={this.submit}

                            large
                            title='Submit' />
                            :     <Button
                            linearGradientProps={{
                                colors: ['#4da6ff', '#80ff80'],
                                start: { x: 0, y: 0.5 },
                                end: { x: 1, y: 0.5 },
                            }}
                            onPress={this.Update}

                            large
                            title='Update Offer' />}

                    </View>
                    <View style={{ width: 220, height: 50, marginBottom: 30, marginTop: 30 }} >
                   
                   {
                       firstOffer && 
                       <View>
                            <Text style={{ fontSize: 25, fontWeight: "bold", color: '#f2f2f2' }}>{offerStatus}</Text>

                            <Text style={{ fontSize: 22, color: '#f2f2f2' }}><Text style={{ fontSize: 19, color: '#F3F9A7' }}>Rate</Text> {offerRate} PKR</Text>
                            <Text style={{ fontSize: 22, color: '#f2f2f2' }}><Text style={{ fontSize: 19, color: '#F3F9A7' }}>Week-Day: </Text>{oferDay}</Text>

                       </View> 
                    } 
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

export default connect(mapStateToProp, mapDispatchToProp)(OfferGiven);

