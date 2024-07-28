import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { PieChart } from 'react-native-chart-kit';
import config from '../../frontend/config';
import { useAuth } from '../../frontend/context/AuthContext';

const { width, height } = Dimensions.get('window');

const UserStatistics = () => {
    const { token, user } = useAuth();
    const navigation = useNavigation();
    const [statistics, setStatistics] = useState(null);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await fetch(`${config.urls.REPORTS_API}/userReportStatistics/${user.id}`, {
                    headers: {
                        "token": token
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setStatistics(data);
                } else {
                    Alert.alert('Error', data.message);
                }
            } catch (error) {
                console.error('Error fetching statistics:', error);
                Alert.alert('Error', 'Failed to fetch statistics');
            }
        };

        fetchStatistics();
    }, [user.id, token]);

    if (!statistics) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    const data = [
        { name: 'Correct', population: statistics.totalCorrectAnswers, color: 'green', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Incorrect', population: statistics.totalIncorrectAnswers, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    ];
    const screenWidth = Dimensions.get('window').width;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                    <AntDesign name="arrowleft" size={30} color="black" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Your Statistics</Text>
                <View style={{ width: 0 }} />
            </View>
            <View style={styles.contentContainer}>
                <PieChart
                    data={data}
                    width={screenWidth - 40}
                    height={240}
                    chartConfig={{
                        backgroundColor: '#1cc910',
                        backgroundGradientFrom: '#eff3ff',
                        backgroundGradientTo: '#efefef',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute
                />
                <View style={styles.statsContainer}>
                    <Text style={styles.statsText}>Average Score: {statistics.avgScore.toFixed(2)}%</Text>
                    <Text style={styles.statsText}>Total Quizzes: {statistics.totalTestsTaken}</Text>
                    <Text style={styles.statsText}>Quizzes Passed: {statistics.totalTestsPassed}</Text>
                    <Text style={styles.statsText}>Quizzes Failed: {statistics.totalTestsFailed}</Text>
                </View>
            </View>
        </View>
    );
};

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
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.2,
    },
    statsContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    statsText: {
        fontSize: 18,
        marginVertical: 5,
    },
});

export default UserStatistics;
