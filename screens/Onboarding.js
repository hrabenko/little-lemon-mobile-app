import * as React from "react";
import {Image, Button, StyleSheet, Pressable, Text, TextInput, View} from "react-native";
import {StatusBar} from "expo-status-bar";

const Onboarding = () => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image}
                    source={require('../assets/little-lemon-logo.png')}/>
            </View>
            <View style={styles.mainContainer}>
                <Text style={styles.text}>Let us get to know you</Text>
                <View style={styles.inputsContainer}>
                    <View>
                        <Text style={styles.text}>First Name</Text>
                        <TextInput style={styles.textInput} placeholder={"Type your first name"}  />
                    </View>
                    <View >
                        <Text style={styles.text}>Email</Text>
                        <TextInput style={styles.textInput}
                            placeholder={"Type your email"}
                                   keyboardType={"email-address"}/>
                    </View>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} >
                    <Text style={styles.text}>Next</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Onboarding;

const styles = StyleSheet.create(({
    container: {
        flex: 1,
        width: '100%'
    },
    imageContainer: {
        backgroundColor: "#dee3e9",
        flex: 0.15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 300,
        resizeMode: 'contain',
    },
    mainContainer: {
        backgroundColor: "#cbd2d9",
        flex: 0.65,
        justifyContent: 'space-between',
        paddingTop: 50
    },
    text: {
        textAlign: 'center',
        color: '#495e57',
        fontSize: 24
    },
    inputsContainer: {

    },
    textInput: {
        height: 50,
        marginVertical: 20,
        marginHorizontal: 40,
        padding: 10,
        fontSize: 16,
        borderWidth: 2,
        borderColor: '#495e57',
        borderRadius: 7
    },
    buttonContainer: {
        backgroundColor: "#dee3e9",
        flex: 0.2,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: "#cbd2d9",
        width: 100,
        padding: 5,
        borderRadius: 10,
        marginEnd: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}))