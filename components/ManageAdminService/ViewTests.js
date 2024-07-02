import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Modal, TextInput } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const initialTestsData = [
    { id: 1, testName: 'Physics', date: '2023-06-15' }
];

const ViewTests = () => {
    const navigation = useNavigation();
    const [testsData, setTestsData] = useState(initialTestsData);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editTestId, setEditTestId] = useState(null);
    const [testName, setTestName] = useState('');
    const [testDate, setTestDate] = useState('');

    const handlePressEdit = (id) => {
        setEditTestId(id);
        setIsModalVisible(true);
        const testToEdit = testsData.find(test => test.id === id);
        if (testToEdit) {
            setTestName(testToEdit.testName);
            setTestDate(testToEdit.date);
        }
    };

    const handlePressDelete = (id) => {
        const updatedTestsData = testsData.filter(test => test.id !== id);
        setTestsData(updatedTestsData);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setEditTestId(null);
        setTestName('');
        setTestDate('');
    };

    const handleSaveTest = () => {
        if (editTestId) {
            const updatedTestsData = testsData.map(test => {
                if (test.id === editTestId) {
                    return {
                        ...test,
                        testName,
                        date: testDate
                    };
                }
                return test;
            });
            setTestsData(updatedTestsData);
        } else {
            const newTestId = testsData.length + 1;
            const newTest = {
                id: newTestId,
                testName,
                date: testDate
            };
            setTestsData([...testsData, newTest]);
        }
        handleModalClose();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                    <AntDesign name="arrowleft" size={30} color="black" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Manage Tests</Text>
                <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.tableContainer}>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.headerCell, styles.headerID]}>ID</Text>
                        <Text style={[styles.headerCell, styles.headerTestName]}>Name</Text>
                        <Text style={[styles.headerCell, styles.headerDate]}>Date</Text>
                        <Text style={[styles.headerCell, styles.headerEdit]}>Action</Text>
                        {/* <Text style={[styles.headerCell, styles.headerRemove]}>Remove</Text> */}
                    </View>
                    {testsData.map((item) => (
                        <View key={item.id} style={styles.tableRow}>
                            <Text style={[styles.tableCell, styles.cellID]}>{item.id}</Text>
                            <Text style={[styles.tableCell, styles.cellTestName]}>{item.testName}</Text>
                            <Text style={[styles.tableCell, styles.cellDate]}>{item.date}</Text>
                            <TouchableOpacity onPress={() => handlePressEdit(item.id)}>
                                <FontAwesome name="edit" size={20} style={styles.editIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handlePressDelete(item.id)}>
                                <FontAwesome name="trash" size={20} style={styles.deleteIcon} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={handleModalClose}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{editTestId ? 'Edit Test' : 'Add Test'}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter test name"
                            value={testName}
                            onChangeText={setTestName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter test date"
                            value={testDate}
                            onChangeText={setTestDate}
                        />
                        <TouchableOpacity style={styles.saveButton} onPress={handleSaveTest}>
                            <Text style={styles.saveButtonText}>{editTestId ? 'Save Test' : 'Add Test'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={handleModalClose}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

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
    scrollContainer: {
        paddingTop: height * 0.22,
        paddingHorizontal: width * 0.05,
    },
    tableContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 10,
        overflow: 'hidden',
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
        paddingBottom: 10,
        backgroundColor: '#f0f0f0',
    },
    headerCell: {
        fontWeight: 'bold',
        fontSize: 16,
        flex: 1,
        textAlign: 'center',
        paddingVertical: 10,
    },
    headerID: {
        flex: 0.5,
    },
    headerTestName: {
        flex: 0.5,
    },
    headerDate: {
        flex: 1,
    },
    headerEdit: {
        flex: 0.5,
    },
    headerRemove: {
        flex: 0.5,
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    tableCell: {
        fontSize: 16,
        flex: 1,
        textAlign: 'center',
        paddingVertical: 10,
    },
    cellID: {
        flex: 0,
    },
    cellTestName: {
        flex: 2,
    },
    cellDate: {
        flex: 2,
    },
    editIcon: {
        color: '#555',
        marginLeft: 5,
    },
    deleteIcon: {
        color: 'red',
        marginLeft: 5,
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
    cancelButton: {
        backgroundColor: 'gray',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 10,
    },
    cancelButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default ViewTests;
