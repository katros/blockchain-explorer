// import React from 'react';
// import { ScrollView, StyleSheet } from 'react-native';
// import { ExpoLinksView } from '@expo/samples';

// export default class LinksScreen extends React.Component {
//     static navigationOptions = {
//         title: 'Links'
//     };

//     render() {
//         return (
//             <ScrollView style={styles.container}>
//                 {/* Go ahead and delete ExpoLinksView and replace it with your
//            * content, we just wanted to provide you with some helpful links */}
//                 <ExpoLinksView />
//             </ScrollView>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: 15,
//         backgroundColor: '#fff'
//     }
// });

import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class BarcodeScanner extends React.Component {
    static navigationOptions = {
        title: 'Scan QR Code'
        // header: null
    };

    state = {
        hasCameraPermission: null
    };

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    render() {
        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <View style={{ flex: 1 }}>
                <BarCodeScanner
                    onBarCodeScanned={this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFill}
                />
            </View>
        );
    }

    handleBarCodeScanned = ({ type, data }) => {
        fetch('http://api.ethplorer.io/getTxInfo/' + data + '?apiKey=freekey')
            .then(response => response.json())
            .then(data => {
                let message = data.input;
                let convertedMsg = this.hexToString(message);
                // Alert.alert('This is the message:' + convertedMsg);
                Alert.alert('Message:', convertedMsg, [
                    { text: 'CLOSE', onPress: () => console.log('CLOSE Pressed') }
                ]);
            });
    };

    hexToString = hex => {
        let str = '';
        for (let i = 6; i < hex.length; i += 2) {
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
        return str;
    };
}
