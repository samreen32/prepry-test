import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet,
    ScrollView, TouchableOpacity,
    TextInput, Dimensions
} from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../frontend/context/AuthContext';
import config from '../../frontend/config';

const { width, height } = Dimensions.get('window');

const backgroundColors = ['#FFEBEE', '#E3F2FD', '#E8F5E9', '#FFFDE7', '#F3E5F5'];

const getGradeColor = (grade) => {
    switch (grade) {
        case 'A':
            return '#4CAF50'; // Green
        case 'B':
            return '#8BC34A'; // Light Green
        case 'C':
            return '#FFC107'; // Amber
        case 'D':
            return '#FF9800'; // Orange
        case 'F':
            return '#F44336'; // Red
        default:
            return '#607D8B'; // Blue Grey for unknown grades
    }
};

export default function TestReports() {
    const { user, token } = useAuth();
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState("");
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const userId = user.id;
                const response = await fetch(`${config.urls.REPORTS_API}/getUserReports/${userId}`, {
                    headers: {
                        "token": token
                    }
                });
                const data = await response.json();
                console.log(data, "data")
                setReports(data);

            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        fetchReports();
    }, [user, token]);

    const filteredData = reports.filter(report =>
        report?.test?.title?.toLowerCase().includes(searchQuery?.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                    <AntDesign name="arrowleft" size={30} color="black" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Test Reports</Text>
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
                {filteredData.map((item, index) => (
                    <View key={item._id} style={[styles.testItem, { backgroundColor: backgroundColors[index % backgroundColors.length] }]}>
                        <View style={styles.testInfo}>
                            <Text style={styles.testName}>{item.test.title}</Text>
                            <View style={[styles.gradeContainer, { backgroundColor: getGradeColor(item.grade) }]}>
                                <Text style={styles.testGrade}>Grade: {item.grade}</Text>
                            </View>
                            <Text style={styles.testDate}>Attempt Date: {new Date(item.attemptDate).toLocaleDateString()}</Text>
                            <Text style={styles.testScore}>Score: {item.score}</Text>
                        </View>
                        <FontAwesome name="chevron-right" size={20} color="black"
                            onPress={() => {
                                navigation.navigate("SpecificReportMain", { reportId: item._id })
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
        color: 'black',
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
        textTransform: "capitalize"
    },
    testDate: {
        fontSize: width * 0.035,
        color: '#555',
        marginTop: height * 0.005,
    },
    gradeContainer: {
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: 'flex-start',
        marginTop: height * 0.005,
    },
    testGrade: {
        fontSize: width * 0.035,
        color: 'white',
        fontWeight: 'bold',
    },
    testScore: {
        fontSize: width * 0.035,
        color: '#555',
        marginTop: height * 0.005,
    },
});
