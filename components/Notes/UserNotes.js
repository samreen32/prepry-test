import React, { useState, useEffect } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet,
    ScrollView, Dimensions, TextInput, Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import config from '../../frontend/config';
import { useAuth } from '../../frontend/context/AuthContext';
import { ActivityIndicator } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

export default function UserNotes() {
    const { user, token } = useAuth();
    const navigation = useNavigation();
    const [notes, setNotes] = useState([]);
    const [newNoteTitle, setNewNoteTitle] = useState('');
    const [newNoteDescription, setNewNoteDescription] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchNotes = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${config.urls.NOTES_API}/fetchNotes`);
            const data = await response.json();
            if (data.success) {
                setNotes(data.notes);
            }
        } catch (error) {
            console.error('Error fetching notes:', error);
        } finally {
            setLoading(false);
        }
    };

    const addNote = async () => {
        if (newNoteTitle.trim() && newNoteDescription.trim()) {
            try {
                const response = await fetch(`${config.urls.NOTES_API}/createNotes`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "token": token
                    },
                    body: JSON.stringify({
                        user: user.id, 
                        noteTitle: newNoteTitle,
                        noteDescription: newNoteDescription,
                    }),
                });
                const data = await response.json();
                if (data.success) {
                    setNotes([...notes, data.note]);
                    setNewNoteTitle('');
                    setNewNoteDescription('');
                    setModalVisible(false);
                }
            } catch (error) {
                console.error('Error adding note:', error);
            }
        }
    };

    const deleteNote = async (id) => {
        try {
            const response = await fetch(`${config.urls.NOTES_API}/deleteNote/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "token" : token
                },
            });
            const data = await response.json();
            console.log(data,id, "gdshdgajs")
            if (data.success) {
                setNotes(notes.filter((note) => note._id !== id));
            }
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };
    

    useEffect(() => {
        fetchNotes();
    }, []);

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
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : notes.length === 0 ? (
                    <Text style={styles.noNotesText}>No notes available.</Text>
                ) : (
                    notes.map((note) => (
                        <View key={note._id} style={styles.noteItem}>
                            <View style={styles.noteTextContainer}>
                                <Text style={styles.noteTitle}>{note.noteTitle}</Text>
                                <Text style={styles.noteDescription}>{note.noteDescription}</Text>
                            </View>
                            <TouchableOpacity onPress={() => deleteNote(note._id)}>
                                <AntDesign name="delete" size={24} color="red" />
                            </TouchableOpacity>
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
                            placeholder="Enter note title"
                            value={newNoteTitle}
                            onChangeText={setNewNoteTitle}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter note description"
                            value={newNoteDescription}
                            onChangeText={setNewNoteDescription}
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
        marginLeft: width * -0.05,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    noteTextContainer: {
        flex: 1,
    },
    noteTitle: {
        fontSize: width * 0.045,
        fontWeight: 'bold',
    },
    noteDescription: {
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
