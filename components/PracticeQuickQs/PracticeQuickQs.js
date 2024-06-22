import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { globalStyles } from '../../assets/styles/globalStyles';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const questionsData = [
    {
        id: 1,
        question: 'What is React Native?',
        options: ['A framework for building native apps using React', 'A library for backend development', 'A CSS framework', 'A database management tool'],
        correctOption: 'A framework for building native apps using React',
    },
    {
        id: 2,
        question: 'How does React Native work?',
        options: ['Uses JavaScript to compile to native components', 'Uses Python for native components', 'Uses Swift for Android', 'Uses Kotlin for iOS'],
        correctOption: 'Uses JavaScript to compile to native components',
    },
    {
        id: 3,
        question: 'What is React Native?',
        options: ['A framework for building native apps using React', 'A library for backend development', 'A CSS framework', 'A database management tool'],
        correctOption: 'A framework for building native apps using React',
    },
    {
        id: 4,
        question: 'How does React Native work?',
        options: ['Uses JavaScript to compile to native components', 'Uses Python for native components', 'Uses Swift for Android', 'Uses Kotlin for iOS'],
        correctOption: 'Uses JavaScript to compile to native components',
    },
];

const QuestionItem = ({ question, options, correctOption, selectedOption, setSelectedOption, index }) => (
    <View style={[styles.questionItem, index === 0 && styles.firstQuestionItem]}>
        <Text style={styles.questionText}>{question}</Text>
        {options.map((option, idx) => (
            <TouchableOpacity
                key={idx}
                style={styles.optionRow}
                onPress={() => setSelectedOption(option)}
            >
                <FontAwesome
                    name={selectedOption === option ? 'dot-circle-o' : 'circle-o'}
                    size={24}
                    color={selectedOption === option ? 'lightblue' : 'black'}
                />
                <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
        ))}
        {selectedOption && (
            <Text style={[styles.feedbackText, { color: selectedOption === correctOption ? 'green' : 'red' }]}>
                {selectedOption === correctOption
                    ? 'Hurray! You got it right.'
                    : `The correct option was: ${correctOption}`}
            </Text>
        )}
    </View>
);

export default function PracticeQuickQs() {
    const navigation = useNavigation();
    const [selectedOptions, setSelectedOptions] = useState({});

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                    <AntDesign name="arrowleft" size={30} color="black" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>Practice Questions</Text>
                    <Text style={styles.headerDesc}>Your report will be generated based on answers. Good Luck!</Text>
                </View>
                <View style={{ width: 24 }} />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {questionsData.map((item, index) => (
                    <QuestionItem
                        key={item.id}
                        index={index}
                        question={item.question}
                        options={item.options}
                        correctOption={item.correctOption}
                        selectedOption={selectedOptions[item.id]}
                        setSelectedOption={(option) => setSelectedOptions({ ...selectedOptions, [item.id]: option })}
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
        backgroundColor: 'lightblue',
        width: '100%',
        paddingVertical: height * 0.08,
        paddingHorizontal: width * 0.03,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        top: 0,
        zIndex: 1,
    },
    headerTextContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    headerDesc: {
        fontSize: width * 0.035,
        textAlign: "center",
        marginTop: 5,
        fontStyle: "italic"
    },
    scrollContainer: {
        paddingTop: height * 0.15,
        paddingHorizontal: width * 0.03,
    },
    questionItem: {
        padding: 18,
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 15
    },
    firstQuestionItem: {
        marginTop: 90,
    },
    questionText: {
        fontSize: width * 0.045,
        fontWeight: 'bold',
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    optionText: {
        marginLeft: 10,
        fontSize: width * 0.04,
    },
    feedbackText: {
        marginTop: 10,
        fontSize: width * 0.035,
    },
});
