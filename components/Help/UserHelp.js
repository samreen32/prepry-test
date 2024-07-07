import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function UserHelp() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleContact = () => {
        // Handle contact form submission
        alert('Contact form submitted');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                    <AntDesign name="arrowleft" size={30} color="white" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Reach Us</Text>
                <View style={{ width: 30 }} />
            </View>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TextInput
                    style={[styles.input, styles.messageInput]}
                    placeholder="Message"
                    value={message}
                    onChangeText={setMessage}
                    multiline
                />
                <TouchableOpacity style={styles.button} onPress={handleContact}>
                    <Text style={styles.buttonText}>Contact</Text>
                </TouchableOpacity>
            </View>
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
        marginLeft: -width * 0.1,
        color: "white",
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        width: '90%',
        padding: 15,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: 'white',
    },
    messageInput: {
        height: 150,
        textAlignVertical: 'top',
    },
    button: {
        width: '90%',
        padding: 15,
        backgroundColor: '#3b5998',
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});
