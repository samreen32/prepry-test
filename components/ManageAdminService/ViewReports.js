import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Modal, TextInput } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const questionsData = [
    { id: 1, testName: 'Sample Test 1', question: 'What is React Native?', options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'], correctAnswerIndex: 0, date: '2023-05-12', user: 'John Doe', grade: 'A' },
    { id: 2, testName: 'Sample Test 2', question: 'How does React Native work?', options: ['Option A', 'Option B', 'Option C', 'Option D'], correctAnswerIndex: 1, date: '2023-05-13', user: 'Jane Smith', grade: 'B' },
    { id: 3, testName: 'Sample Test 1', question: 'What is React Native?', options: ['Answer A', 'Answer B', 'Answer C', 'Answer D'], correctAnswerIndex: 2, date: '2023-05-12', user: 'John Doe', grade: 'C' },
    { id: 4, testName: 'Sample Test 2', question: 'How does React Native work?', options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'], correctAnswerIndex: 3, date: '2023-05-13', user: 'Jane Smith', grade: 'A' },
    { id: 5, testName: 'Sample Test 1', question: 'What is React Native?', options: ['Option X', 'Option Y', 'Option Z', 'Option W'], correctAnswerIndex: 0, date: '2023-05-12', user: 'John Doe', grade: 'B' },
    { id: 6, testName: 'Sample Test 2', question: 'How does React Native work?', options: ['Option Alpha', 'Option Beta', 'Option Gamma', 'Option Delta'], correctAnswerIndex: 1, date: '2023-05-13', user: 'Jane Smith', grade: 'A' },
];

const QuestionItem = ({ id, testName, question, options, correctAnswerIndex, date, user, grade, isExpanded, onPressEdit, onPressDelete, navigation }) => (
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
        {isExpanded && (
            <View style={styles.answerContainer}>
                <Text style={styles.metaText}>{`Date: ${date}`}</Text>
                <Text style={styles.metaText}>{`User: ${user}`}</Text>
            </View>
        )}
    </View>
);


export default function ViewReports() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("AdminHomeMain")}>
                    <AntDesign name="arrowleft" size={30} color="black" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Manage Reports</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {questionsData.map((item) => (
                    <QuestionItem
                        key={item.id}
                        id={item.id}
                        testName={item.testName}
                        question={item.question}
                        options={item.options}
                        correctAnswerIndex={item.correctAnswerIndex}
                        date={item.date}
                        user={item.user}
                        grade={item.grade}  
                        navigation={navigation} 
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
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        borderRadius: 5,
        fontSize: 16,
    },
    radioButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginLeft: 10,
    },
    radioButtonSelected: {
        backgroundColor: '#3b5998',
    },
    radioButtonText: {
        color: '#333',
    },
    radioButtonTextSelected: {
        color: 'white',
    },
    saveButton: {
        backgroundColor: '#3b5998',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 20,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});
