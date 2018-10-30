import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.welcomeContainer}>
                        <Image
                            source={
                                __DEV__
                                    ? require('../assets/images/logo-dev.png')
                                    : require('../assets/images/logo-prod.png')
                            }
                            style={styles.welcomeImage}
                        />
                    </View>

                    <View style={styles.getStartedContainer}>
                        <Text style={styles.logoText}>blockchain explorer</Text>

                        {this._maybeRenderDevelopmentModeWarning()}

                        <Text style={styles.getStartedText}>
                            Open scanner and scan QR code to read the message from the transaction in the
                            blockchain.
                        </Text>
                    </View>
                </ScrollView>
            </View>
        );
    }

    _maybeRenderDevelopmentModeWarning() {
        if (__DEV__) {
            return <Text style={styles.developmentModeText}>Development mode is enabled.</Text>;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A0808'
    },
    logoText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#E28413',
        marginBottom: 20
    },
    developmentModeText: {
        marginBottom: 20,
        color: '#fff',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center'
    },
    contentContainer: {
        paddingTop: 100
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20
    },
    welcomeImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50
    },
    getStartedText: {
        fontSize: 17,
        color: '#8B8E94',
        lineHeight: 24,
        textAlign: 'center'
    }
});
