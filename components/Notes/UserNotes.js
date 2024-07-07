import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, TextInput, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

export default function UserNotes() {
    const navigation = useNavigation();
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const addNote = () => {
        if (newNote.trim()) {
            setNotes([...notes, newNote]);
            setNewNote('');
            setModalVisible(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("AdminHomeMain")}>
                    <AntDesign name="arrowleft" size={30} color="white" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Your Notes</Text>
                <View style={{ width: 30 }} />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {notes.length === 0 ? (
                    <Text style={styles.noNotesText}>No notes available.</Text>
                ) : (
                    notes.map((note, index) => (
                        <View key={index} style={styles.noteItem}>
                            <Text style={styles.noteText}>{note}</Text>
                        </View>
                    ))
                )}
            </ScrollView>
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <AntDesign name="plus" size={30} color="white" />
            </TouchableOpacity>
            <Modal visible={modalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add New Note</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your note here"
                            value={newNote}
                            onChangeText={setNewNote}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.saveButton} onPress={addNote}>
                                <Text style={styles.saveButtonText}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D3E2E8',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#3b5998',
        width: '100%',
        paddingVertical: height * 0.08,
        paddingHorizontal: width * 0.05,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    headerText: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
        marginLeft: width * -0,
        color: "white"
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
    },
    noNotesText: {
        fontSize: width * 0.045,
        color: 'gray',
        textAlign: 'center',
        marginTop: 20,
    },
    noteItem: {
        backgroundColor: 'lightgray',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    noteText: {
        fontSize: width * 0.04,
    },
    addButton: {
        backgroundColor: '#3b5998',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
        right: 30,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    saveButton: {
        backgroundColor: '#3b5998',
        padding: 10,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
        marginRight: 5,
    },
    saveButtonText: {
        color: 'white',
        fontSize: width * 0.04,
    },
    cancelButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
        marginLeft: 5,
    },
    cancelButtonText: {
        color: 'white',
        fontSize: width * 0.04,
    },
});
