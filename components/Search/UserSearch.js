import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function UserSearch() {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([
        "Result 1",
        "Result 2",
        "Result 3",
        "Result 4",
        "Result 5",
        "Result 6",
        "Result 7"
    ]);

    const handleSearch = (text) => {
        setSearchQuery(text);
        // Implement search logic here to filter searchResults based on text
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                        <AntDesign name="arrowleft" size={30} color="black" style={{ marginLeft: width * 0.03 }} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Search</Text>
                    <View style={{ width: 30 }} />
                </View>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />
                </View>
                <View style={styles.notificationsContainer}>
                    {searchResults.map((result, index) => (
                        <View key={index} style={styles.notificationBox}>
                            <Text>{result}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F3F3F3',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'lightblue',
        width: '100%',
        paddingVertical: height * 0.08,
        paddingHorizontal: width * 0.05,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    headerText: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
        marginLeft: -width * 0.1,
    },
    searchContainer: {
        width: '90%',
        marginTop: height * 0.02,
    },
    searchInput: {
        backgroundColor: 'white',
        padding: height * 0.02,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        fontSize: width * 0.04,
    },
    notificationsContainer: {
        width: '90%',
        marginTop: height * 0.02,
    },
    notificationBox: {
        backgroundColor: 'lightgray',
        padding: height * 0.025,
        borderRadius: 10,
        marginTop: height * 0.01,
    },
});

