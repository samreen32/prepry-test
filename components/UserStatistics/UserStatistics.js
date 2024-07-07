import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const { width, height } = Dimensions.get('window');

const UserStatistics = () => {
    const navigation = useNavigation();
    const data = [
        { name: 'Correct', population: 45, color: 'green', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Incorrect', population: 30, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Skipped', population: 25, color: 'gray', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    ];

    const screenWidth = Dimensions.get('window').width;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                    <AntDesign name="arrowleft" size={30} color="black" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Your Statistics</Text>
                <View style={{ width: 30 }} />
            </View>
            <View style={styles.contentContainer}>
                <PieChart
                    data={data}
                    width={screenWidth - 40}
                    height={220}
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
                    <Text style={styles.statsText}>Average Score: 75%</Text>
                    <Text style={styles.statsText}>Total Quizzes: 10</Text>
                    <Text style={styles.statsText}>Quizzes Passed: 7</Text>
                    <Text style={styles.statsText}>Quizzes Failed: 3</Text>
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
