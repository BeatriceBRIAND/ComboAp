//navigation/SwitchNavigation.js

import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Login from '../screens/Login'
import Signup from '../screens/Signup'
import Profile from '../screens/Profile'


const SwitchNavigator = createStackNavigator(
    {
        Login: {
            screen: Login
        },
        Signup: {
            screen: Signup
        },
        Profile: {
            screen: Profile
        },
    },
    {
        initialRouteName: 'Login'
    }
)

export default createAppContainer(SwitchNavigator)