import {Alert, Image, Pressable, StyleSheet, View} from "react-native";
import DefaultAvatar from "./DefaultAvatar";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header ({navigation}) {
    const [avatar, setAvatar] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const data = await AsyncStorage.multiGet(['avatar', 'firstName', 'lastName']);
                setAvatar(data[0][1]);
                setFirstName(data[1][1]);
                setLastName(data[2][1]);
            } catch (e) {
                Alert.alert(`An error occurred: ${e.message}`);
            }
            }
        )()
    }, []);


    return (
        <View style={styles.headerContainer}>
            <Pressable onPress={() => navigation.navigate('Home')}>
                <Image style={styles.homeIcon} source={require('../assets/home-icon.png')}/>
            </Pressable>
            <Image style={styles.image} source={require('../assets/little-lemon-logo.png')}/>
            <Pressable onPress={() => navigation.navigate('Profile')}>
                {avatar ?
                    <Image  source={{uri: avatar}} style={{...styles.avatar, ...styles.avatarHeader}}/> :
                    <DefaultAvatar personalInfo={{firstName, lastName}} size={50} fontSize={20}/>}
            </Pressable>

        </View>
    )
}
const styles = StyleSheet.create({
    headerContainer: {
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
    }, avatar: {
        width: 100, height: 100, resizeMode: 'cover', borderRadius: 50
    }, avatarHeader: {
        width: 50, height: 50
    },
});