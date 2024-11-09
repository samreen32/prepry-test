import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, ScrollView,
    TouchableOpacity, Dimensions,
    ActivityIndicator, Alert
} from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import config from '../../frontend/config';

const { width, height } = Dimensions.get('window');

const QuestionItem = ({ id, testName, question, options, correctAnswerIndex, date, user, grade, isExpanded, onPressDelete, navigation }) => (
    <View style={styles.questionItem}>
        <View style={styles.questionHeader}>
            <View style={styles.testNameContainer}>
                <Text style={styles.testNameText}>{testName}</Text>
            </View>
            <View style={styles.gradeContainer}>
                <Text style={styles.gradeText}>{`Grade ${grade}`}</Text>
            </View>
            <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('ViewDetailedReport', { id, testName, question, options, correctAnswerIndex, date, user, grade })}>
                    <FontAwesome name="eye" size={20} style={[styles.icon, { marginRight: 10 }]} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onPressDelete(id)}>
                    <FontAwesome name="trash" size={20} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
        <TouchableOpacity style={styles.questionRow}>
            <View style={{ flex: 1 }}>
                <Text style={styles.questionText}>{question}</Text>
                {isExpanded && (
                    <View style={styles.optionsContainer}>
                        {options.map((option, index) => (
                            <View key={index} style={styles.optionRow}>
                                <Text style={styles.optionText}>{option}</Text>
                                {correctAnswerIndex === index && <Text style={styles.correctText}>(Correct)</Text>}
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </TouchableOpacity>
        <View style={styles.answerContainer}>
            <Text style={styles.metaText}>{`Date: ${date}`}</Text>
            <Text style={styles.metaText}>{`User: ${user}`}</Text>
        </View>
    </View>
);

export default function ViewReports() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const response = await fetch(`${config.urls.REPORTS_API}/getReports`);
            const data = await response.json();
            setReports(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleDeleteReport = async (id) => {
        try {
            const response = await fetch(`${config.urls.REPORTS_API}/deleteReport/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setReports(reports.filter(report => report._id !== id));
                Alert.alert('Success', 'Report deleted successfully');
            } else {
                const data = await response.json();
                Alert.alert('Error', data.message);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred while deleting the report');
        }
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
                <TouchableOpacity onPress={() => navigation.navigate("AdminHomeMain")}>
                    <AntDesign name="arrowleft" size={30} color="black" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Manage Reports</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {reports.map((report) => (
                    <QuestionItem
                        key={report._id}
                        id={report._id}
                        testName={report.test.title}
                        question={report.answers.map(answer => answer.question.title).join(', ')}
                        options={report.answers.map(answer => answer.question.options)}
                        correctAnswerIndex={report.answers.map(answer => answer.question.correctAnswerIndex)}
                        date={new Date(report.attemptDate).toLocaleDateString()}
                        user={report.user.fullName}
                        grade={report.grade}
                        navigation={navigation}
                        onPressDelete={handleDeleteReport}
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
    questionItem: {
        marginBottom: height * 0.02,
        padding: width * 0.04,
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    questionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: height * 0.01,
    },
    testNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3b5998',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
    },
    gradeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'green',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
    },
    testNameText: {
        color: 'white',
        fontSize: width * 0.035,
        marginRight: 5,
        textTransform: "capitalize"
    },
    gradeText: {
        color: 'white',
        fontSize: width * 0.035,
        fontWeight: 'bold',
    },
    questionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    questionText: {
        fontSize: width * 0.04,
        fontWeight: 'bold',
    },
    optionsContainer: {
        marginTop: height * 0.01,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.005,
    },
    optionText: {
        fontSize: width * 0.04,
    },
    correctText: {
        marginLeft: width * 0.02,
        color: 'green',
    },
    answerContainer: {
        flexDirection: 'column',
        alignItems: 'left',
        marginBottom: 2,
    },
    metaText: {
        fontSize: width * 0.035,
        color: '#888',
        marginTop: height * 0.005,
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginLeft: width * 0.03,
        color: '#555',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
