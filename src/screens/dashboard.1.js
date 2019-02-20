import React from 'react';
import { View, ScrollView, Image, Text, TextInput, StyleSheet, Button, TouchableOpacity, ActivityIndicator, } from 'react-native';
import firebase from '../config/Firebase';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'
import { Input, Header, Divider } from 'react-native-elements';
import { DrawerActions } from 'react-navigation';
import { Constants, Location, Permissions, Contacts } from 'expo';
import { LinearGradient } from 'expo';
import { User_Messages } from '../Store/actions/authAction'
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }
    componentWillMount() {

        const { user, allUser } = this.props;
        
        console.log("phone user props", user)
        this.setState({
            name: user.name,
            uid: user.UID,

        })
    }

    componentDidMount() {

        const { user, allUser } = this.props;
        
        console.log("phone user props", user)
        this.setState({
            name: user.name,
            uid: user.UID,

        })
        // console.log('alalalalal',allUser)
        var services = [];
        if (allUser) {
            // console.log(allUser,'ssssdddffgg')
            setTimeout(() => {
                allUser.map((i) => {
                    if (i.category) {
                        const obj = {
                            name: i.name,
                            number: i.number,
                            uid: i.UID,
                            photo: i.photo,
                            category: i.category,
                            experience: i.experience,
                            image: i.image
                        }
                        services.push(obj)
                    }
                });
                this.setState({ services: services, loading: true })
                // console.log('>>>>>>>>>>sellers> did wala', services)
            }, 100)
        }



       
        this.getContacts()
    }

    map = () => {
        // this.props.navigation.navigate('Menu')
        this.props.navigation.openDrawer();
    }
    viewSeller = (i) => {
        this.props.navigation.navigate('View', { i })

    }
    async getContacts() {
        const { uid } = this.state

        const permission = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS)

        if (permission.status !== 'granted') {
            // Permission was denied...
            return;
        }
        const { data } = await Contacts.getContactsAsync({
            fields: [
                Contacts.PHONE_NUMBERS,
                Contacts.EMAILS,
            ]
        })
        //   alert('data ' + data.length)
        if (data.length > 0) {
            const contact = data.length;
            var phoneContact = [];
            console.log(contact, '<<><><><')
            setTimeout(() => {
                const objj = {
                    phoneContacts: phoneContact
                }
                // console.log(objj)
                // firebase.database().ref('/UserData/' + uid).update(objj);
            }, 100)
            data.map((i) => {
                const name = i.name;
                i.phoneNumbers.map((n) => {
                    // console.log('contactArray>>>>>>>>>>>>>>',n.number);

                    const obj = {
                        name: name,
                        number: n.number
                    }
                    // console.log(obj,'<<><><><')
                    phoneContact.push({ obj })
                })
            })


        }

    }
    _getLocationAsync = async () => {
        const { uid } = this.state

        console.log("function run ")
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
            console.log("permission not granted ")

        }

        let location = await Location.getCurrentPositionAsync({});
        console.log("permission  granted ")

        this.setState({
            location,
            where: { lat: location.coords.latitude, lng: location.coords.longitude },
            get: true
        });
        const obj = {
            Location: { lat: location.coords.latitude, lng: location.coords.longitude }
        }
        // firebase.database().ref('/UserData/' + uid).update(obj);

        // console.log("location===>>>>", location)

    };
    componentWillReceiveProps(props) {
        const { user, allUser } = props;
        console.log("phone user props", user)
        this.setState({
            name: user.name,
            uid: user.UID,

        })
        var services = [];

        if (allUser) {
            setTimeout(() => {
                allUser.map((i) => {
                    if (i.category) {
                        const obj = {
                            name: i.name,
                            number: i.number,
                            uid: i.UID,
                            photo: i.photo,
                            category: i.category,
                            experience: i.experience,
                            image: i.image
                        }
                        services.push(obj)
                    }
                });
                this.setState({ services: services, loading: true })
                // console.log('>>>>>>>>>>sellers>will wala ', services)
            }, 100)
        }
        else {

        }

    }
    static navigationOptions = { header: null }
    render() {
        const { allUser, loading, services } = this.state
        return (
            <View >
                <Header

                    containerStyle={{
                        backgroundColor: '#075e54',
                        justifyContent: 'space-around',

                    }}
                    leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.map() }}
                    centerComponent={{ text: "Home Solution", style: { color: '#fff', fontSize: 20 } }}
                    rightComponent={{ icon: 'search', color: '#fff' }}
                />
                <View >
                    {!loading ? <ActivityIndicator size="large" color="#0000ff" />
                        :
                        <View>
                            <Text h1> Service's Available</Text>
                            <ScrollView horizontal={true}>
                                {services &&
                                    services.map((i) => {
                                        // console.log(i, "><><><<>")
                                        return (
                                            <View key={i.category} style={{ flexDirection: "row" }} >
                                                    <LinearGradient
                                                        colors={['#25d366', 'transparent']}
                                                        style={{
                                                            position: 'absolute',
                                                            left: 0,
                                                            right: 0,
                                                            top: 0,
                                                            height: 300,
                                                        }}
                                                    />
                                                <View style={{ height: 250, width: 160, borderWidth:2, flex: 1, margin: 10, borderRadius:10,borderColor:'#34b7f1' }}>
                                                    <View style={{borderRadius:10 , overflow:'hidden',height:150,}}>
                                                        <Image style={styles.img} source={{ uri: i.photo }} />
                                                    </View>
                                                    <TouchableOpacity onPress={() => this.viewSeller(i)}>
                                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text style={styles.cardTitle}>{i.category}</Text>
                                                    </View>
                                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                        <Text style={styles.titleName}>{i.name}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                                        {/* <Text onPress={() => this.viewSeller(i)} style={{ fontSize: 16, color: '#3498db', paddingBottom: 8, paddingTop: 3 }}>VIEW NOW</Text> */}
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    })
                                }

                            </ScrollView>
                        </View>


                    }
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    img: {
        height: 160,
        width: 165,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
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

        user: (userCurrent) => {
            dispatch(User_Messages(userCurrent))
        },

    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Home);

