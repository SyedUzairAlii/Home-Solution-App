import { createStackNavigator, createAppContainer, createDrawerNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import LogIn from '../src/screens/authentication'
import Phone from '../src/screens/phone'
import Home from '../src/screens/dashboard'
import map from '../src/screens/Map'
import Menu from '../src/screens/list'
import service from '../src/screens/service'
import View from '../src/screens/view'
import Chat from '../src/screens/Inbox'
import Content from '../src/screens/list'
import Notification from '../src/screens/notification'
import BuyerView from '../src/screens/buyer'
import OfferGiven from '../src/screens/OfferGiven'
import ViewOffer from '../src/screens/ViewOffer'
const StackNavigator = createStackNavigator({
    LogIn: {
        screen: LogIn
    },

    Phone: {
        screen: Phone
    },

    Home: {
        screen: Home,

    },
    map: {
        screen: map
    },
    service: {
        screen: service
    },
    Menu: {
        screen: Menu
    },
    View: {
        screen: View
    },
    Chat: {
        screen: Chat
    },
    Notification: {
        screen: Notification
    },
    BuyerView:{
        screen:BuyerView
    },
    OfferGiven:{
        screen:OfferGiven
    },
    ViewOffer:{
        screen:ViewOffer
    }
},
    {
        navigationOptions: {
            drawerLockMode: 'locked-closed'
        }
    });



const Drawer = createDrawerNavigator(
    {

        Home: {
            screen: StackNavigator,

        },

    }, {
        drawerWidth: 250,
        initialRouteName: 'Home',

        // drawerLockMode: 'locked-closed'

        contentComponent: Content,
        // header: null,
        // drawerLockMode: 'locked-closed'
    }

)
const Navigation = createAppContainer(Drawer)
export default Navigation;