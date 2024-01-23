import {Image, Pressable, StyleSheet, Text, View} from "react-native";

export default function DefaultAvatar ({size, fontSize, personalInfo}) {
    const letters = personalInfo.firstName[0]
        ? (personalInfo.firstName[0] + (personalInfo.lastName[0] ? personalInfo.lastName[0] : ""))
        : "";
    return <View style={{...styles.defaultAvatar, width: size, height: size}}>
        <Text style={{...styles.defaultAvatarText, fontSize: fontSize}}>
            {letters}
        </Text>
    </View>
}

const styles = StyleSheet.create({
    defaultAvatar: {
        borderRadius: 50, backgroundColor: '#93ACCA', justifyContent: 'center', alignItems: 'center',
    }, defaultAvatarText: {
        color: '#ffffff',
    },
});