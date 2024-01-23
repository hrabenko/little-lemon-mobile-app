import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from '../components/Header'
export default function HomeScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff'
    },
})