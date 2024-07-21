import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Modal, TextInput } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import config from '../../frontend/config';
import { useAuth } from '../../frontend/context/AuthContext';
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('window');

const QuestionItem = ({ id, testName, question, options, correctAnswerIndex, date, user, isExpanded, onPressEdit, onPressDelete }) => (
    <View style={styles.questionItem}>
        <TouchableOpacity onPress={() => onPressEdit(id)} style={styles.questionRow}>
            <View style={{ flex: 1 }}>
                <Text style={styles.testName}>Test: {testName}</Text>
                <Text style={styles.questionText}>{question}</Text>
                <View style={styles.optionsContainer}>
                    {options.map((option, index) => (
                        <View key={index} style={styles.optionRow}>
                            <Text style={styles.optionText}>{option}</Text>
                            {correctAnswerIndex === index && <Text style={styles.correctText}>(Correct)</Text>}
                        </View>
                    ))}
                </View>
            </View>
            <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={() => onPressEdit(id)}>
                    <FontAwesome name="edit" size={20} style={[styles.icon, { marginRight: 10 }]} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onPressDelete(id)}>
                    <FontAwesome name="trash" size={20} style={styles.icon} />
                </TouchableOpacity>
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

export default function ViewQuestions() {
    const { adminToken } = useAuth();
    const navigation = useNavigation();
    const [expandedQuestion, setExpandedQuestion] = useState(null);
    const [editQuestionId, setEditQuestionId] = useState(null);
    const [questionsData, setQuestionsData] = useState([]);
    const [testsData, setTestsData] = useState([]);
    const [selectedTestId, setSelectedTestId] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(-1);

    useEffect(() => {
        fetchQuestions();
        fetchTests();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get(`${config.urls.QUESTIONS_API}/fetchQs`);
            if (response.data.success) {
                setQuestionsData(response.data.questions);
            } else {
                console.error('Failed to fetch questions:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const fetchTests = async () => {
        try {
            const response = await axios.get(`${config.urls.TESTS_API}/fetchTests`, {
                headers: {
                    "token": adminToken
                }
            });
            if (response.data.success) {
                setTestsData(response.data.tests);
            } else {
                console.error('Failed to fetch tests:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching tests:', error);
        }
    };

    const handlePressEdit = (id) => {
        setEditQuestionId(id);
        setIsModalVisible(true);
        const questionToEdit = questionsData.find(question => question._id === id);
        if (questionToEdit) {
            setQuestionText(questionToEdit?.title);
            setOptions([...questionToEdit.options]);
            setCorrectAnswerIndex(questionToEdit.correctAnswerIndex);
            setSelectedTestId(questionToEdit.test);
        }
    };

    const handlePressDelete = async (id) => {
        try {
            await axios.delete(`${config.urls.QUESTIONS_API}/deleteQs/${id}`, {
                headers: {
                    "token": adminToken
                }
            });
            fetchQuestions();
        } catch (error) {
            console.error('Error deleting question:', error);
        }
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setEditQuestionId(null);
        setQuestionText('');
        setOptions(['', '', '', '']);
        setCorrectAnswerIndex(-1);
        setSelectedTestId('');
    };

    const handleSaveQuestion = async () => {
        try {
            const payload = {
                title: questionText,
                options,
                correctAnswerIndex,
                test: selectedTestId
            };
            if (editQuestionId) {
                await axios.put(`${config.urls.QUESTIONS_API}/updateQs/${editQuestionId}`, payload,
                    {
                        headers: {
                            "token": adminToken
                        }
                    }
                );
            } else {
                await axios.post(`${config.urls.QUESTIONS_API}/createQs`, payload, {
                    headers: {
                        "token": adminToken
                    }
                });
            }
            fetchQuestions();
            handleModalClose();
        } catch (error) {
            console.error('Error saving question:', error);
        }
    };

    const handleAnswerChange = (index, text) => {
        const newOptions = [...options];
        newOptions[index] = text;
        setOptions(newOptions);
    };

    const handleSelectCorrectAnswer = (index) => {
        setCorrectAnswerIndex(index);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("AdminHomeMain")}>
                    <AntDesign name="arrowleft" size={30} color="black" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Manage Questions</Text>
                <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {questionsData.map((item) => (
                    <QuestionItem
                        key={item._id}
                        id={item._id}
                        testName={item?.test?.title}
                        question={item.title}
                        options={item.options}
                        correctAnswerIndex={item.correctAnswerIndex}
                        date={item.date}
                        user={item.user}
                        isExpanded={expandedQuestion === item._id}
                        onPressEdit={handlePressEdit}
                        onPressDelete={handlePressDelete}
                    />
                ))}
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={handleModalClose}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                            <Text style={styles.modalTitle}>{editQuestionId ? 'Edit Question' : 'Add Question'}</Text>
                            <Picker
                                selectedValue={selectedTestId}
                                style={styles.picker}
                                onValueChange={(itemValue) => setSelectedTestId(itemValue)}
                            >
                                <Picker.Item label="Select Test" value="" />
                                {testsData.map((test) => (
                                    <Picker.Item key={test._id} label={test.title} value={test._id} />
                                ))}
                            </Picker>

                            <TextInput
                                style={styles.input}
                                placeholder="Enter your question"
                                value={questionText}
                                onChangeText={setQuestionText}
                            />
                            {options.map((option, index) => (
                                <View key={index} style={styles.answerContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder={`Option ${index + 1}`}
                                        value={options[index]}
                                        onChangeText={(text) => handleAnswerChange(index, text)}
                                    />
                                    <TouchableOpacity
                                        style={[styles.radioButton, correctAnswerIndex === index && styles.radioButtonSelected]}
                                        onPress={() => handleSelectCorrectAnswer(index)}
                                    >
                                        <Text style={correctAnswerIndex === index ? styles.radioButtonTextSelected : styles.radioButtonText}>
                                            {correctAnswerIndex === index ? 'Correct' : 'Select as Correct'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                            <TouchableOpacity style={styles.saveButton} onPress={handleSaveQuestion}>
                                <Text style={styles.saveButtonText}>Save Question</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>

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
    questionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    testName: {
        fontSize: width * 0.04,
        fontWeight: 'bold',
        marginBottom: height * 0.01,
        textTransform: "capitalize"
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
    addButton: {
        backgroundColor: '#3b5998',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
    },
    addButtonText: {
        color: 'white',
        fontSize: width * 0.035,
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
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 15,
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
