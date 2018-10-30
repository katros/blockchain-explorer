import React from 'react';
import { ExpoConfigView } from '@expo/samples';

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'App Info'
    };

    render() {
        return <ExpoConfigView />;
    }
}
