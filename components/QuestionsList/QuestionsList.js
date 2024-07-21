import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import config from '../../frontend/config';

const { width, height } = Dimensions.get('window');

const QuestionItem = ({ question, options, correctAnswerIndex, isExpanded, onPress }) => (
    <View style={styles.questionItem}>
        <TouchableOpacity onPress={onPress} style={styles.questionRow}>
            <Text style={styles.questionText}>{question}</Text>
            <FontAwesome name={isExpanded ? 'chevron-up' : 'chevron-down'} size={20} />
        </TouchableOpacity>
        {isExpanded && (
            <View>
                {options.map((option, index) => (
                    <Text
                        key={index}
                        style={[
                            styles.optionText,
                            index === correctAnswerIndex && styles.correctAnswerText,
                        ]}
                    >
                        {option}
                    </Text>
                ))}
            </View>
        )}
    </View>
);

export default function QuestionsList() {
    const navigation = useNavigation();
    const [expandedQuestion, setExpandedQuestion] = useState(null);
    const [questionsData, setQuestionsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`${config.urls.QUESTIONS_API}/fetchQs`); 
                const data = await response.json();
                if (data.success) {
                    setQuestionsData(data.questions);
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    const handlePress = (id) => {
        setExpandedQuestion(expandedQuestion === id ? null : id);
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
                <Text style={styles.headerText}>Questions</Text>
                <View style={{ width: 24 }} />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {questionsData.map((item) => (
                    <QuestionItem
                        key={item._id}
                        question={item.title}
                        options={item.options}
                        correctAnswerIndex={item.correctAnswerIndex}
                        isExpanded={expandedQuestion === item._id}
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
    optionText: {
        marginTop: height * 0.01,
        fontSize: width * 0.04,
        color: '#555',
    },
    correctAnswerText: {
        color: 'green',
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
