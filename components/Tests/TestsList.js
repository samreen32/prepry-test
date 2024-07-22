import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet,
    ScrollView, TouchableOpacity,
    Dimensions, ActivityIndicator
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import config from '../../frontend/config';

const { width, height } = Dimensions.get('window');

const TestItem = ({ title, createdAt, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.testItem}>
        <View style={styles.testItemContent}>
            <View>
                <Text style={styles.testTitle}>{title}</Text>
                <Text style={styles.testDate}>{new Date(createdAt).toLocaleDateString()}</Text>
            </View>
            <AntDesign name="arrowright" size={24} color="black" />
        </View>
    </TouchableOpacity>
);

export default function TestsList() {
    const navigation = useNavigation();
    const [testsData, setTestsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const response = await fetch(`${config.urls.TESTS_API}/fetchTests`);
                const data = await response.json();
                if (data.success) {
                    setTestsData(data.tests);
                }
            } catch (error) {
                console.error('Error fetching tests:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTests();
    }, []);

    const handlePress = (id) => {
        navigation.navigate("TestQuestions", { testId: id });
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                    <AntDesign name="arrowleft" size={30} color="black" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
                <Text style={styles.headerText}>List of Tests</Text>
                <View style={{ width: 24 }} />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {testsData.map((item) => (
                    <TestItem
                        key={item._id}
                        title={item.title}
                        createdAt={item.createdAt}
                        onPress={() => handlePress(item._id)}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#D8BFD8',
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
        marginLeft: -width * 0,
    },
    scrollContainer: {
        paddingTop: height * 0.22,
        paddingHorizontal: width * 0.05,
    },
    testItem: {
        marginBottom: height * 0.02,
        padding: width * 0.04,
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    testItemContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    testTitle: {
        fontSize: width * 0.045,
        fontWeight: 'bold',
        textTransform: "capitalize",
    },
    testDate: {
        marginTop: height * 0.01,
        fontSize: width * 0.04,
        color: '#555',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});