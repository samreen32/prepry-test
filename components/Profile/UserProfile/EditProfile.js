import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

export default function EditProfile() {
    const navigation = useNavigation();
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <View style={styles.header}>
                        <AntDesign name="back" size={24} color="black"
                            onPress={() => {
                                navigation.navigate("UserProfile");
                            }}
                        />
                        <Text style={styles.headerText}>Edit Profile</Text>
                        <View style={{ width: 24 }} />
                    </View>
                    <View style={styles.profileContainer}>
                        <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.profileImage} />
                        <TouchableOpacity style={styles.changeImageButton}>
                            <Text style={styles.changeImageText}>Change Image</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder="Full Name" style={styles.input} />
                        <TextInput placeholder="Email" style={styles.input} />
                        <TextInput placeholder="License No" style={styles.input} />
                        <TextInput placeholder="Mobile No" style={styles.input} />
                    </View>
                    <TouchableOpacity style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#F3F3F3',
    },
    subContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'lightblue',
        width: '100%',
        paddingVertical: 80,
        paddingHorizontal: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    headerText: {
        fontSize: 25,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: -50,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#D3D3D3',
    },
    changeImageButton: {
        backgroundColor: '#1C1A5E',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 10,
    },
    changeImageText: {
        color: 'white',
        fontWeight: 'bold',
    },
    inputContainer: {
        width: '80%',
        marginTop: 20,
    },
    input: {
        backgroundColor: '#E0E0E0',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    saveButton: {
        backgroundColor: '#1C1A5E',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 40, // added for spacing at the bottom
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
