import React, { useState, useEffect, useRef } from 'react';
import {
    View, Text, StyleSheet, ScrollView,
    TouchableOpacity, Dimensions,
    ActivityIndicator, Animated
} from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import config from '../../frontend/config';
import { useAuth } from '../../frontend/context/AuthContext';

const { width, height } = Dimensions.get('window');

const QuestionItem = ({ question, options, selectedOption, setSelectedOption, animatedValue }) => {
    return (
        <Animated.View style={[styles.questionItem, { opacity: animatedValue }]}>
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
        </Animated.View>
    );
};

export default function TestQuestions() {
    const route = useRoute();
    const { testId } = route.params;
    const navigation = useNavigation();
    const { token, user, showToast } = useAuth();
    const [selectedOptions, setSelectedOptions] = useState({});
    const [questionsData, setQuestionsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`${config.urls.QUESTIONS_API}/fetchQuestionsByTest/${testId}`);
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
    }, [testId]);

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [currentQuestionIndex]);

    const handleOptionSelect = (option) => {
        setSelectedOptions({ ...selectedOptions, [questionsData[currentQuestionIndex]._id]: option });
        if (currentQuestionIndex < questionsData.length - 1) {
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                animatedValue.setValue(0);
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            });
        } else {
            console.log('Test completed');
        }
    };

    const handleSubmit = async () => {
        try {
            const answers = Object.keys(selectedOptions).map(questionId => ({
                questionId,
                answer: selectedOptions[questionId]
            }));
            const payload = {
                testId,
                userId: user.id,
                answers
            };
            const response = await fetch(`${config.urls.REPORTS_API}/createReport`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (response.ok) {
                showToast("Test has been submitted. You can check your Report!!");
                navigation.navigate('HomeScreen');
            } else {
                console.error('Error creating report:', data);
            }
        } catch (error) {
            console.error('Error submitting the report:', error);
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
                <TouchableOpacity onPress={() => navigation.navigate("TestsList")}>
                    <AntDesign name="arrowleft" size={30} color="black" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>Test Questions</Text>
                    <Text style={styles.headerDesc}>Your report will be generated based on answers. Good Luck!</Text>
                </View>
                <View style={{ width: 24 }} />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {questionsData.length > 0 && (
                    <QuestionItem
                        key={questionsData[currentQuestionIndex]._id}
                        question={questionsData[currentQuestionIndex].title}
                        options={questionsData[currentQuestionIndex].options}
                        selectedOption={selectedOptions[questionsData[currentQuestionIndex]._id]}
                        setSelectedOption={handleOptionSelect}
                        animatedValue={animatedValue}
                    />
                )}
                {currentQuestionIndex === questionsData.length - 1 && (
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Submit</Text>
                    </TouchableOpacity>
                )}
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
        paddingTop: height * 0.27,
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitButton: {
        marginTop: 20,
        backgroundColor: '#D8BFD8',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
    },
    submitButtonText: {
        color: 'black',
        fontSize: width * 0.045,
        fontWeight: 'bold',
    },
});
