import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Modal, TextInput } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const questionsData = [
    { id: 1, testName: 'Sample Test 1', question: 'What is React Native?', options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'], correctAnswerIndex: 0, date: '2023-05-12', user: 'John Doe' },
    { id: 2, testName: 'Sample Test 2', question: 'How does React Native work?', options: ['Option A', 'Option B', 'Option C', 'Option D'], correctAnswerIndex: 1, date: '2023-05-13', user: 'Jane Smith' },
    { id: 3, testName: 'Sample Test 1', question: 'What is React Native?', options: ['Answer A', 'Answer B', 'Answer C', 'Answer D'], correctAnswerIndex: 2, date: '2023-05-12', user: 'John Doe' },
    { id: 4, testName: 'Sample Test 2', question: 'How does React Native work?', options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'], correctAnswerIndex: 3, date: '2023-05-13', user: 'Jane Smith' },
    { id: 5, testName: 'Sample Test 1', question: 'What is React Native?', options: ['Option X', 'Option Y', 'Option Z', 'Option W'], correctAnswerIndex: 0, date: '2023-05-12', user: 'John Doe' },
    { id: 6, testName: 'Sample Test 2', question: 'How does React Native work?', options: ['Option Alpha', 'Option Beta', 'Option Gamma', 'Option Delta'], correctAnswerIndex: 1, date: '2023-05-13', user: 'Jane Smith' },
];

const QuestionItem = ({ id, testName, question, options, correctAnswerIndex, date, user, isExpanded, onPressEdit, onPressDelete }) => (
    <View style={styles.questionItem}>
        <TouchableOpacity onPress={() => onPressEdit(id)} style={styles.questionRow}>
            <View style={{ flex: 1 }}>
                <Text style={styles.testName}>{testName}</Text>
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
    const navigation = useNavigation();
    const [expandedQuestion, setExpandedQuestion] = useState(null);
    const [editQuestionId, setEditQuestionId] = useState(null);

    // State for modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [questionText, setQuestionText] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(-1); // -1 means no correct answer selected

    const handlePressEdit = (id) => {
        setEditQuestionId(id);
        setIsModalVisible(true);
        // Find the question to edit
        const questionToEdit = questionsData.find(question => question.id === id);
        if (questionToEdit) {
            setQuestionText(questionToEdit.question);
            setOptions([...questionToEdit.options]);
            setCorrectAnswerIndex(questionToEdit.correctAnswerIndex);
        }
    };

    const handlePressDelete = (id) => {
        // Implement delete logic here
        console.log('Deleting question with ID:', id);
        // Example of updating questionsData to remove the deleted question
        const updatedQuestionsData = questionsData.filter(question => question.id !== id);
        console.log('Updated questionsData:', updatedQuestionsData);
        // Update state or perform other operations as needed
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setEditQuestionId(null);
        // Reset modal state
        setQuestionText('');
        setOptions(['', '', '', '']);
        setCorrectAnswerIndex(-1);
    };

    const handleSaveQuestion = () => {
        // Save question and answers logic here
        console.log('Question:', questionText);
        console.log('Options:', options);
        console.log('Correct Answer Index:', correctAnswerIndex);

        // Update the edited question in questionsData
        const updatedQuestionsData = questionsData.map(question => {
            if (question.id === editQuestionId) {
                return {
                    ...question,
                    question: questionText,
                    options: [...options],
                    correctAnswerIndex,
                };
            }
            return question;
        });

        // Update questionsData state (if using it as state)
        // setQuestionsData(updatedQuestionsData);

        // Close the modal after saving
        handleModalClose();
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
                        key={item.id}
                        id={item.id}
                        testName={item.testName}
                        question={item.question}
                        options={item.options}
                        correctAnswerIndex={item.correctAnswerIndex}
                        date={item.date}
                        user={item.user}
                        isExpanded={expandedQuestion === item.id}
                        onPressEdit={handlePressEdit}
                        onPressDelete={handlePressDelete}
                    />
                ))}
            </ScrollView>

            {/* Modal for adding/editing a question */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={handleModalClose}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{editQuestionId ? 'Edit Question' : 'Add Question'}</Text>
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
