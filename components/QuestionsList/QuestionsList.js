import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../assets/styles/globalStyles';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const questionsData = [
    { id: 1, question: 'What is React Native?', answer: 'React Native is a framework for building native apps using React.' },
    { id: 2, question: 'How does React Native work?', answer: 'React Native uses JavaScript to compile to native components.' },
    { id: 3, question: 'What is React Native?', answer: 'React Native is a framework for building native apps using React.' },
    { id: 4, question: 'How does React Native work?', answer: 'React Native uses JavaScript to compile to native components.' },
    { id: 5, question: 'What is React Native?', answer: 'React Native is a framework for building native apps using React.' },
    { id: 6, question: 'How does React Native work?', answer: 'React Native uses JavaScript to compile to native components.' },
    { id: 7, question: 'What is React Native?', answer: 'React Native is a framework for building native apps using React.' },
    { id: 8, question: 'How does React Native work?', answer: 'React Native uses JavaScript to compile to native components.' },
];

const QuestionItem = ({ question, answer, isExpanded, onPress }) => (
    <View style={styles.questionItem}>
        <TouchableOpacity onPress={onPress} style={styles.questionRow}>
            <Text style={styles.questionText}>{question}</Text>
            <FontAwesome name={isExpanded ? 'chevron-up' : 'chevron-down'} size={20} />
        </TouchableOpacity>
        {isExpanded && <Text style={styles.answerText}>{answer}</Text>}
    </View>
);

export default function QuestionsList() {
    const navigation = useNavigation();
    const [expandedQuestion, setExpandedQuestion] = useState(null);

    const handlePress = (id) => {
        setExpandedQuestion(expandedQuestion === id ? null : id);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                    <AntDesign name="arrowleft" size={30} color="black" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Questions</Text>
                <View style={{ width: 24 }} />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {questionsData.map((item) => (
                    <QuestionItem
                        key={item.id}
                        question={item.question}
                        answer={item.answer}
                        isExpanded={expandedQuestion === item.id}
                        onPress={() => handlePress(item.id)}
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
        paddingVertical: 50,
        paddingHorizontal: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        top: 0,
        zIndex: 1,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
        marginLeft: -24,
    },
    scrollContainer: {
        paddingTop: 80,
        paddingHorizontal: 10,
    },
    questionItem: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    questionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    questionText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    answerText: {
        marginTop: 10,
        fontSize: 14,
        color: '#555',
    },
});
