import { createStackNavigator, createAppContainer, createDrawerNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import LogIn from '../src/screens/authentication'
import Phone from '../src/screens/phone'
import Home from '../src/screens/dashboard'
import map from '../src/screens/Map'
import Menu from '../src/screens/list'
import service from '../src/screens/service'
import View from '../src/screens/view'
import Chat from '../src/screens/Inbox'
const StackNavigator = createStackNavigator({
    LogIn: {
        screen: LogIn
    },
   
    Phone:{
        screen: Phone
    },
    
    Home:{
        screen: Home
    },
    map:{
        screen: map
    },
    service:{
        screen: service
    },
    Menu:{
        screen: Menu
    },
    View:{
        screen: View
    },
    Chat:{
        screen: Chat
    },
})
const Navigation = createAppContainer(StackNavigator)
export default Navigation;