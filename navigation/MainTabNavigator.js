import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ScannerScreen from '../screens/ScannerScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
    Home: HomeScreen
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? // ? `ios-information-circle${focused ? '' : '-outline'}`
                      // : 'md-information-circle'
                      `ios-home${focused ? '' : '-outline'}`
                    : 'md-home'
            }
        />
    )
};

const ScannerStack = createStackNavigator({
    Links: ScannerScreen
});

ScannerStack.navigationOptions = {
    tabBarLabel: 'QR Code Scanner',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
        />
    )
};

const SettingsStack = createStackNavigator({
    Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
    tabBarLabel: 'Info',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? // ? `ios-options${focused ? '' : '-outline'}` : 'md-options'
                      `ios-information-circle${focused ? '' : '-outline'}`
                    : 'md-information-circle'
            }
        />
    )
};

export default createBottomTabNavigator({
    HomeStack,
    ScannerStack,
    SettingsStack
});
