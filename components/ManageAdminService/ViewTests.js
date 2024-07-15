import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, ScrollView,
    TouchableOpacity, Dimensions, Modal, TextInput
} from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import config from '../../frontend/config';
import { useAuth } from '../../frontend/context/AuthContext';

const { width, height } = Dimensions.get('window');

const ViewTests = () => {
    const { adminToken } = useAuth();
    const navigation = useNavigation();
    const [testsData, setTestsData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editTestId, setEditTestId] = useState(null);
    const [testName, setTestName] = useState('');
    const [testDescription, setTestDescription] = useState('');

    useEffect(() => {
        fetchTests();
    }, []);

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
        setEditTestId(id);
        setIsModalVisible(true);
        const testToEdit = testsData.find(test => test._id === id);
        if (testToEdit) {
            setTestName(testToEdit.title);
            setTestDescription(testToEdit.description);
        }
    };

    const handlePressDelete = async (id) => {
        try {
            await axios.delete(`${config.urls.TESTS_API}/deleteTest/${id}`, {
                headers: {
                    "token": adminToken
                }
            });
            fetchTests();
        } catch (error) {
            console.error('Error deleting test:', error);
        }
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setEditTestId(null);
        setTestName('');
        setTestDescription('');
    };

    const handleSaveTest = async () => {
        const payload = {
            title: testName,
            description: testDescription,
        };
        try {
            if (editTestId) {
                await axios.put(`${config.urls.TESTS_API}/updateTest/${editTestId}`, payload, {
                    headers: {
                        "token": adminToken
                    }
                });
            } else {
                await axios.post(`${config.urls.TESTS_API}/createTest`, payload, {
                    headers: {
                        "token": adminToken
                    }
                });
            }
            fetchTests();
            handleModalClose();
        } catch (error) {
            console.error('Error saving test:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("AdminHomeMain")}>
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
                        <Text style={[styles.headerCell, styles.headerDate]}>Description</Text>
                        <Text style={[styles.headerCell, styles.headerEdit]}>Action</Text>
                    </View>
                    {testsData.map((item, index) => (
                        <View key={item._id} style={styles.tableRow}>
                            <Text style={[styles.tableCell, styles.cellID]}>{index + 1}</Text>
                            <Text style={[styles.tableCell, styles.cellTestName]}>{item.title}</Text>
                            <Text style={[styles.tableCell, styles.cellDate]}>{item.description}</Text>
                            <View style={{ padding: 10 }}>
                                <TouchableOpacity onPress={() => handlePressEdit(item._id)}>
                                    <FontAwesome name="edit" size={20} style={styles.editIcon} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handlePressDelete(item._id)}
                                    style={{ marginTop: 10 }}>
                                    <FontAwesome name="trash" size={20} style={styles.deleteIcon} />
                                </TouchableOpacity>
                            </View>
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
                            placeholder="Enter test description"
                            value={testDescription}
                            onChangeText={setTestDescription}
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
        marginBottom: 20,
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
