import * as React from "react";
import {Image, Alert, StyleSheet, Pressable, Text, TextInput, View, ScrollView} from "react-native";
import {useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {checkFirstName, checkEmail} from "../validation";

const OnboardingScreen = ({setIsLogged}) => {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');

    const pressButton = async () => {
        if (checkFirstName(firstName) && checkEmail(email)) {
            try {
                await AsyncStorage.multiSet([["firstName", firstName], ["email", email], ['isLogged', 'true']]);
                setIsLogged(true)
            } catch (e) {
                Alert.alert(`An error occurred: ${e.message}`);
            }
        } else if (!checkFirstName(firstName) && !checkEmail(email)) {
            Alert.alert("Something went wrong", `First name should not to be empty. Email should be in the correct format.`);
        } else if (!checkFirstName(firstName)) {
            Alert.alert("Something went wrong",`First name should not to be empty.`);
        } else if (!checkEmail(email)) {
            Alert.alert("Something went wrong", `Email should be in the correct format.`);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../assets/little-lemon-logo.png')}/>
            </View>
            <ScrollView>
                <View style={styles.mainContainer}>
                    <Text style={styles.text}>Let us get to know you</Text>
                    <View style={styles.inputsContainer}>
                        <View>
                            <Text style={styles.text}>First Name</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder={"Type your first name"}
                                value={firstName}
                                onChangeText={(text) => setFirstName(text)}
                            />
                        </View>
                        <View>
                            <Text style={styles.text}>Email</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder={"Type your email"}
                                keyboardType={"email-address"}
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={pressButton}>
                        <Text style={styles.text}>Next</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: "#dee3e9"
    },
    imageContainer: {
        backgroundColor: "#dee3e9",
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 300,
        resizeMode: 'contain',
    },
    mainContainer: {
        backgroundColor: "#cbd2d9",
        paddingTop: 50
    },
    text: {
        textAlign: 'center',
        color: '#495e57',
        fontSize: 24
    },
    inputsContainer: {
        marginTop: 175,
        marginBottom: 20
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
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: "#cbd2d9",
        width: 100,
        padding: 5,
        borderRadius: 10,
        marginVertical: 40,
        marginEnd: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
