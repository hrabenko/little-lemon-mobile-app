import {View, Text, StyleSheet, Image, ScrollView, TextInput, Pressable, Alert} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {checkFirstName, checkEmail, checkPhoneNumber} from '../validation';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen({setIsLogged, navigation}) {
    const [avatar, setAvatar] = useState(null);
    const [personalInfo, setPersonalInfo] = useState({
        firstName: '', lastName: '', email: '', phoneNumber: ''
    });
    const [notifications, setNotifications] = useState({
        orderStatuses: true, passwordChanges: true, specialOffers: true, newsletter: true
    });

    useEffect(() => {
        getPersonalData().then();
    }, []);

    const changeAvatar = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setAvatar(result.assets[0].uri);
        }
    };
    const removeAvatar = () => {
        setAvatar(null);
    }

    const DefaultAvatar = ({size, fontSize}) => {
        const letters = (personalInfo.firstName[0] + (personalInfo.lastName[0] ? personalInfo.lastName[0] : ""));
        return <View style={{...styles.defaultAvatar, width: size, height: size}}>
            <Text style={{...styles.defaultAvatarText, fontSize: fontSize}}>
                {letters}
            </Text>
        </View>
    }

    const updatePersonalInfo = (key, value) => {
        setPersonalInfo((prevState) => ({
            ...prevState, [key]: value
        }));
    };


    const updateNotifications = (key) => () => setNotifications((prevState) => ({
        ...prevState, [key]: !prevState[key],
    }));

    const logOut = async () => {
        try {
            await AsyncStorage.clear()
            setIsLogged(false)
        } catch (e) {
            Alert.alert(`An error occurred: ${e.message}`);
        }
    }

    const discardChanges = async () => {
        setPersonalInfo({
            firstName: '', lastName: '', email: '', phoneNumber: ''
        });
        setNotifications({
            orderStatuses: true, passwordChanges: true, specialOffers: true, newsletter: true
        });
        getPersonalData().then();

    }

    const getPersonalData = async () => {
        try {
            const personalInfoKeys = ['firstName', 'lastName', 'email', 'phoneNumber'];
            const notificationsKeys = ['orderStatuses', 'passwordChanges', 'specialOffers', 'newsletter'];
            const keys = await AsyncStorage.getAllKeys();
            for (const key of keys) {
                const value = await AsyncStorage.getItem(key);
                if (personalInfoKeys.includes(key)) {
                    updatePersonalInfo(key, value);
                } else if (notificationsKeys.includes(key)) {
                    setNotifications((prevState) => ({
                        ...prevState, [key]: JSON.parse(value),
                    }));
                } else if (key === 'avatar') {
                    setAvatar(value)
                }
            }
        } catch (e) {
            Alert.alert(`An error occurred: ${e.message}`);
        }
    }

    const saveChanges = async () => {
        if (checkFirstName(personalInfo.firstName) && checkEmail(personalInfo.email) && checkPhoneNumber(personalInfo.phoneNumber)) {
            try {
                const personalInfoPairs = [
                    ['firstName', personalInfo.firstName],
                    ['lastName', personalInfo.lastName],
                    ['email', personalInfo.email],
                    ['phoneNumber', personalInfo.phoneNumber],
                ];

                const notificationsPairs = [
                    ['orderStatuses', String(notifications.orderStatuses)],
                    ['passwordChanges', String(notifications.passwordChanges)],
                    ['specialOffers', String(notifications.specialOffers)],
                    ['newsletter', String(notifications.newsletter)],
                ];

                if (avatar !== null) {
                    await AsyncStorage.multiSet([...personalInfoPairs, ...notificationsPairs, ["avatar", avatar]]);
                } else {
                    await AsyncStorage.multiSet([...personalInfoPairs, ...notificationsPairs]);
                }                Alert.alert(`Changes saved`);
            } catch (e) {
                Alert.alert(`An error occurred: ${e.message}`);
            }
        } else {
            Alert.alert("Something went wrong", `First name should not to be empty. Email should be in the correct format. The phone number must follow the US format.`);
        }
    }


    return (<View style={styles.container}>
        <View style={styles.headerContainer}>
            <Pressable onPress={() => navigation.navigate('Home')}>
                <Image style={styles.homeIcon} source={require('../assets/home-icon.png')} />
            </Pressable>
            <Image style={styles.image} source={require('../assets/little-lemon-logo.png')}/>
            {avatar ?
                <Image source={{uri: avatar}} style={{...styles.avatar, ...styles.avatarHeader}}/> :
                <DefaultAvatar size={50} fontSize={20} />}
        </View>
        <ScrollView style={styles.scrollContainer}>
            <Text style={styles.headingText}>Personal information</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.personalInfoLabel}>Avatar</Text>
                <View style={styles.avatarControl}>
                    {avatar ?
                        <Image source={{uri: avatar}} style={styles.avatar}/> :
                        <DefaultAvatar size={100} fontSize={30} />}
                    <Pressable style={styles.greenButton} onPress={changeAvatar}>
                        <Text style={styles.greenButtonText}>Change</Text>
                    </Pressable>
                    <Pressable style={styles.whiteButton} onPress={removeAvatar}>
                        <Text style={styles.whiteButtonText}>Remove</Text>
                    </Pressable>
                </View>

            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.personalInfoLabel}>First name</Text>
                <TextInput value={personalInfo.firstName}
                           onChangeText={(text) => updatePersonalInfo('firstName', text)} style={styles.textInput}/>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.personalInfoLabel}>Last name</Text>
                <TextInput value={personalInfo.lastName}
                           onChangeText={(text) => updatePersonalInfo('lastName', text)} style={styles.textInput}/>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.personalInfoLabel}>Email</Text>
                <TextInput keyboardType={"email-address"} value={personalInfo.email}
                           onChangeText={(text) => updatePersonalInfo('email', text)} style={styles.textInput}/>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.personalInfoLabel}>Phone number</Text>
                <TextInput keyboardType={'phone-pad'} value={personalInfo.phoneNumber}
                           onChangeText={(text) => updatePersonalInfo('phoneNumber', text)}
                           style={styles.textInput}/>
            </View>
            <Text style={styles.headingText}>Email notifications</Text>
            <View style={styles.checkboxContainer}>
                <CheckBox checked={notifications.orderStatuses}
                          onPress={updateNotifications('orderStatuses')}
                          checkedColor={'#495e57'} iconType="material-community"
                          checkedIcon="checkbox-marked" uncheckedIcon="checkbox-blank-outline"/>
                <Text style={styles.notificationsLabel}>Order statuses</Text>
            </View>
            <View style={styles.checkboxContainer}>
                <CheckBox checked={notifications.passwordChanges}
                          onPress={updateNotifications('passwordChanges')}
                          checkedColor={'#495e57'} iconType="material-community"
                          checkedIcon="checkbox-marked" uncheckedIcon="checkbox-blank-outline"/>
                <Text style={styles.notificationsLabel}>Password changes</Text>
            </View>
            <View style={styles.checkboxContainer}>
                <CheckBox checked={notifications.specialOffers}
                          onPress={updateNotifications('specialOffers')}
                          checkedColor={'#495e57'} iconType="material-community"
                          checkedIcon="checkbox-marked" uncheckedIcon="checkbox-blank-outline"/>
                <Text style={styles.notificationsLabel}>Special offers</Text>
            </View>
            <View style={styles.checkboxContainer}>
                <CheckBox checked={notifications.newsletter}
                          onPress={updateNotifications('newsletter')}
                          checkedColor={'#495e57'} iconType="material-community"
                          checkedIcon="checkbox-marked" uncheckedIcon="checkbox-blank-outline"/>
                <Text style={styles.notificationsLabel}>Newsletter</Text>
            </View>
            <Pressable onPress={logOut} style={styles.yellowButton}>
                <Text style={styles.yellowButtonText}>Log out</Text>
            </Pressable>
            <View style={styles.changesControl}>
                <Pressable onPress={discardChanges} style={styles.whiteButton}>
                    <Text style={styles.whiteButtonText}>Discard changes</Text>
                </Pressable>
                <Pressable onPress={saveChanges} style={styles.greenButton}>
                    <Text style={styles.greenButtonText}>Save changes</Text>
                </Pressable>
            </View>
        </ScrollView>
    </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff'
    }, headerContainer: {
        height: 80,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: "#dee3e9",
        borderBottomWidth: 1,
        padding: 20
    }, homeIcon:{
        width: 30, resizeMode: 'contain',
    },
    image: {
        width: 150, height: 150, resizeMode: 'contain'
    }, scrollContainer: {
        width: '100%', padding: 20
    }, headingText: {
        fontWeight: 'bold', fontSize: 18, marginBottom: 10, color: '#333333'
    }, inputContainer: {
        marginBottom: 20,
    }, personalInfoLabel: {
        color: '#495e57', fontWeight: "700", marginBottom: 10
    }, avatarControl: {
        flexDirection: 'row', gap: 30, alignItems: 'center'
    }, avatar: {
        width: 100, height: 100, resizeMode: 'cover', borderRadius: 50
    }, defaultAvatar: {
        borderRadius: 50, backgroundColor: '#93ACCA', justifyContent: 'center', alignItems: 'center',
    }, avatarHeader: {
        width: 50, height: 50
    }, defaultAvatarText: {
        color: '#ffffff',
    },
    textInput: {
        height: 50, padding: 10, fontSize: 16, borderWidth: 2, borderColor: '#dee3e9', borderRadius: 7
    }, checkboxContainer: {
        flexDirection: 'row', alignItems: 'center', marginHorizontal: -20
    }, notificationsLabel: {
        fontSize: 16, color: '#495e57',
    }, yellowButton: {
        backgroundColor: "#f4ce14", borderRadius: 7, padding: 10, marginTop: 20, height: 45
    }, yellowButtonText: {
        textAlign: 'center', fontWeight: 'bold', color: '#333333',
    }, greenButton: {
        backgroundColor: '#495e57', borderRadius: 7, padding: 10, height: 45
    }, greenButtonText: {
        textAlign: 'center', fontWeight: 'bold', color: '#ffffff',
    }, whiteButton: {
        borderColor: '#495e57', borderWidth: 1, borderRadius: 7, padding: 10, height: 45
    }, whiteButtonText: {
        textAlign: 'center', fontWeight: 'bold', color: '#495e57',
    }, changesControl: {
        flexDirection: 'row', justifyContent: 'center', gap: 50, marginVertical: 50
    }
})