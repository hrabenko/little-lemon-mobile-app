import {Image, StyleSheet, View} from "react-native";

export default function DishCard() {
    return (
        <View>
            <Text>
                Greek Salad
            </Text>
            <View>
                <View>
                    <Text>The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons. </Text>
                    <Text>$12.99</Text>
                </View>
                <Image src={require('https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/greekSalad.jpg?raw=true')}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

})