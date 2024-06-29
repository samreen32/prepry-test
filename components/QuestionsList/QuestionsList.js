import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

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
        paddingTop: height * 0.12,
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
    questionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    questionText: {
        fontSize: width * 0.04,
        fontWeight: 'bold',
    },
    answerText: {
        marginTop: height * 0.01,
        fontSize: width * 0.04,
        color: '#555',
    },
});
