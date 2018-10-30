import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

export default class BarcodeScanner extends React.Component {
    static navigationOptions = {
        title: 'Scan QR Code'
    };

    constructor(props) {
        super(props);

        this.state = {
            hasCameraPermission: null,
            handleBarCodeScanned: this.handleBarCodeScanned
        };
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    render() {
        const { hasCameraPermission, handleBarCodeScanned } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <View style={{ flex: 1 }}>
                <BarCodeScanner
                    onBarCodeScanned={handleBarCodeScanned}
                    barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                    style={StyleSheet.absoluteFill}
                />
            </View>
        );
    }

    handleBarCodeScanned = ({ data }) => {
        let prevState = this.state.handleBarCodeScanned;

        fetch('http://api.ethplorer.io/getTxInfo/' + data + '?apiKey=freekey')
            .then(response => response.json())
            .then(data => {
                this.setState({ handleBarCodeScanned: undefined });

                let message = data.input;
                let convertedMsg = this.hexToString(message);

                Alert.alert('Message:', convertedMsg, [
                    { text: 'CLOSE', onPress: () => this.setState({ handleBarCodeScanned: prevState }) }
                ]);
            });
    };

    hexToString = hex => {
        if (hex !== undefined) {
            let str = '';
            for (let i = 6; i < hex.length; i += 2) {
                str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
            }
            return str;
        }
    };
}
