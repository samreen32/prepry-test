import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import config from '../../frontend/config';

const { width, height } = Dimensions.get('window');

const QuestionItem = ({ question, options, correctOptionIndex, selectedOption, setSelectedOption, index }) => {
    return (
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
                <Text style={[styles.feedbackText, { color: options[correctOptionIndex] === selectedOption ? 'green' : 'red' }]}>
                    {options[correctOptionIndex] === selectedOption
                        ? 'Hurray! You got it right.'
                        : `The correct option was: ${options[correctOptionIndex]}`}
                </Text>
            )}
            {options[correctOptionIndex] === selectedOption && (
                <LottieView
                    source={require('../../assets/animation/party.json')}
                    autoPlay
                    loop={false}
                    style={styles.animation}
                />
            )}
        </View>
    );
};

export default function PracticeQuickQs() {
    const navigation = useNavigation();
    const [selectedOptions, setSelectedOptions] = useState({});
    const [questionsData, setQuestionsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPracticeQuestions = async () => {
            try {
                const response = await fetch(`${config.urls.PRACTICE_QUESTIONS_API}/fetchPracticeQs`); 
                const data = await response.json();
                if (data.success) {
                    setQuestionsData(data.practiceQuestions);
                }
            } catch (error) {
                console.error('Error fetching practice questions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPracticeQuestions();
    }, []);

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
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>Practice Questions</Text>
                    <Text style={styles.headerDesc}>Your report will be generated based on answers. Good Luck!</Text>
                </View>
                <View style={{ width: 24 }} />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {questionsData.map((item, index) => (
                    <QuestionItem
                        key={item._id}
                        index={index}
                        question={item.practiceTitle}
                        options={item.practiceOptions}
                        correctOptionIndex={item.correctPracticeAnswerIndex}
                        selectedOption={selectedOptions[item._id]}
                        setSelectedOption={(option) => setSelectedOptions({ ...selectedOptions, [item._id]: option })}
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
        marginBottom: 15,
        position: 'relative',
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
    animation: {
        width: 250,
        height: 250,
        position: 'absolute',
        top: 0,
        right: 0,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
