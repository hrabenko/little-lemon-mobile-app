import * as React from 'react';
import {useEffect, useState, useMemo, useCallback} from 'react';
import {FlatList, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import Header from '../components/Header';
import Filters from '../components/Filters';
import {
    createTable,
    getMenuItems,
    saveMenuItems,
    filterByQueryAndCategories,
} from '../database';
import debounce from 'lodash.debounce';

const API_URL =
    'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';
const sections = ['starters', 'mains', 'desserts', 'drinks'];

function Item({item}) {
    return (
        <View style={styles.dishInfoContainer}>
            <View>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.descriptionText} numberOfLines={2} ellipsizeMode="tail">{item.description}</Text>
                <Text style={styles.priceText}>${item.price}</Text>
            </View>
            <Image style={styles.dishImage} source={{ uri: `https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/images/${item.image}`}} />
        </View>
    )
}

export default function HomeScreen({navigation}) {
    const [data, setData] = useState([]);
    const [searchBarText, setSearchBarText] = useState('');
    const [query, setQuery] = useState('');
    const [filterSelections, setFilterSelections] = useState(
        sections.map(() => false)
    );

    const fetchData = async () => {
        try {
            const response = await fetch(API_URL);
            return await response.json();
        } catch (e){
            console.log(e)
        }
    }

    useEffect(() => {
        (async () => {
            await createTable();
            let menuItems = await getMenuItems();

            if (!menuItems.length) {
                const response = await fetchData();
                menuItems = response.menu;
                saveMenuItems(menuItems);
            }

            setData(menuItems);
        })()
    }, []);

    useEffect(() => {
        (async () => {
            const activeCategories = sections.filter((s, i) => {
                if (filterSelections.every((item) => item === false)) {
                    return true;
                }
                return filterSelections[i];
            });


            const response = await filterByQueryAndCategories(query, activeCategories);
            setData(response);
        })()
    }, [query, filterSelections]);

    const lookup = useCallback((q) => {
        setQuery(q);
    }, []);

    const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

    const handleSearchChange = (text) => {
        setSearchBarText(text);
    };

    const handleFiltersChange = async (index) => {
        const arrayCopy = [...filterSelections];
        arrayCopy[index] = !filterSelections[index];
        setFilterSelections(arrayCopy);
    };

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <ScrollView>
                <View style={styles.heroSection}>
                    <Text style={styles.titleText}>Little Lemon</Text>
                    <View style={styles.infoSection}>
                        <View>
                            <Text style={styles.secondaryText}>Chicago</Text>
                            <Text style={styles.text}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
                        </View>
                        <Image style={styles.heroImage} source={require('../assets/home-image.jpg')} />
                    </View>
                    <Searchbar
                        placeholder="Search"
                        value={searchBarText}
                        onChangeText={handleSearchChange}
                        style={{backgroundColor: '#dee3e9'}}
                    />
                </View>
                <Text style={styles.deliveryText}>Order for delivery!</Text>
                <Filters
                    selections={filterSelections}
                    handleFiltersChange={handleFiltersChange}
                    sections={sections}
                />
                <FlatList style={styles.dishesContainer} data={data} renderItem={({item}) => <Item item={item} />} />
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff'
    },
    heroSection: {
        backgroundColor: '#495e57',
        padding: 20,
        width: '100%'
    }, titleText: {
        fontSize: 36,
        fontWeight: "bold",
        fontFamily: 'serif',
        color: "#f4ce14"
    },
    infoSection: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 40
    },
    secondaryText: {
        color: '#ffffff',
        fontFamily: 'serif',
        fontSize: 28,
        marginBottom: 20
    },
    text: {
        color: '#ffffff',
        width: 200
    },
    heroImage: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 15,
        marginTop: 10
    },
    deliveryText: {
        textTransform: 'uppercase',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 20,
        marginHorizontal: 20
    },
    dishesContainer: {
        marginHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: '#cbd2d9',
        marginVertical: 40
    },
    dishInfoContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#dee3e9',
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    nameText: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
    },
    descriptionText: {
        color: '#495e57',
        marginBottom: 10,
        fontFamily: 'serif',
        maxWidth: '75%'
    },
    priceText: {
        color: '#495e57',
        fontSize: 20,
        fontFamily: 'serif'
    },
    dishImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover'
    }
})