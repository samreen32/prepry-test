import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const testData = [
    { id: 1, name: 'React Native Basics', date: '2024-06-18' },
    { id: 2, name: 'Advanced JavaScript', date: '2024-06-17' },
    { id: 3, name: 'CSS Fundamentals', date: '2024-06-16' },
    { id: 4, name: 'HTML Introduction', date: '2024-06-15' },
    { id: 5, name: 'Node.js Overview', date: '2024-06-14' },
    { id: 6, name: 'Express.js Essentials', date: '2024-06-13' },
    { id: 7, name: 'MongoDB Basics', date: '2024-06-12' },
    { id: 8, name: 'Database Design', date: '2024-06-11' },
];

export default function TestReports() {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredData = testData.filter(test =>
        test.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                    <AntDesign name="arrowleft" size={30} color="black" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Test Lists</Text>
                <View style={{ width: 30 }} />
            </View>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search your report..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {filteredData.map((item) => (
                    <View key={item.id} style={styles.testItem}>
                        <View style={styles.testInfo}>
                            <Text style={styles.testName}>{item.name}</Text>
                            <Text style={styles.testDate}>{item.date}</Text>
                        </View>
                        <FontAwesome name="chevron-right" size={20} color="black"
                            onPress={() => {
                                navigation.navigate("SpecificReportMain")
                            }}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        position: 'absolute',
        top: 0,
        zIndex: 1,
    },
    headerText: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
        marginLeft: -width * 0.1,
    },
    searchContainer: {
        width: '100%',
        paddingHorizontal: width * 0.05,
        marginTop: height * 0.22,
        marginBottom: height * 0.02,
    },
    searchInput: {
        backgroundColor: 'white',
        padding: height * 0.02,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
    },
    scrollContainer: {
        paddingHorizontal: width * 0.05,
    },
    testItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.04,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: height * 0.02,
    },
    testInfo: {
        flexDirection: 'column',
    },
    testName: {
        fontSize: width * 0.045,
        fontWeight: 'bold',
    },
    testDate: {
        fontSize: width * 0.035,
        color: '#555',
        marginTop: height * 0.005,
    },
});
