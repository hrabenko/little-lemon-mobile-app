import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import ProfileScreen from "../screens/ProfileScreen";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert} from "react-native";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    const [isLogged, setIsLogged] = useState(false);
    useEffect(() => {
        (async () => {
            try {
                const storedIsLogged  = await AsyncStorage.getItem('isLogged');
                if (storedIsLogged !== null && storedIsLogged !== '') {
                    const isLoggedValue = JSON.parse(storedIsLogged.toLowerCase());
                    setIsLogged(isLoggedValue);
                }
            } catch (e) {
                Alert.alert(`An error occurred: ${e.message}`);
            }
        }
    )()}, []);

    return (
        <Stack.Navigator>
            {isLogged ? (
                <>
                    <Stack.Screen name={"Home"} component={(props) => <HomeScreen {...props}/>} />
                    <Stack.Screen name="Profile" component={(props) => <ProfileScreen {...props} setIsLogged={setIsLogged} />} />
                </>
            ) : (
                <Stack.Screen name="Onboarding" component={() => <OnboardingScreen setIsLogged={setIsLogged} />} />
            )}
        </Stack.Navigator>
    );
};

export default RootNavigator;