import {Pressable, StyleSheet, Text, View} from 'react-native';

export default function Filters({selections, handleFiltersChange, sections}) {
    return (
        <View style={styles.filterContainer}>
            {sections.map((section, index) => (
                <Pressable style={{...styles.filter, backgroundColor: selections[index] ? '#495e57' : '#dee3e9'}}
                           key={index} onPress={() => handleFiltersChange(index)}>
                    <Text style={{
                        ...styles.filterText,
                        color: selections[index] ? '#dee3e9' : '#495e57'
                    }}>{section}</Text>
                </Pressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    filter: {
        borderRadius: 15,
        padding: 10,
    },
    filterText: {
        fontFamily: 'serif',
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
});
