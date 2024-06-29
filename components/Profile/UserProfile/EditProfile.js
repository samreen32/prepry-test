import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

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
                        <TextInput placeholder="Password" style={styles.input} />
                        <TextInput placeholder="New Password" style={styles.input} />
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
        backgroundColor: '#3b5998',
        width: '100%',
        paddingVertical: height * 0.10,
        paddingHorizontal: width * 0.05,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    headerText: {
        fontSize: width * 0.06,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
        marginLeft: -width * 0,
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: -height * 0.05,
    },
    profileImage: {
        width: width * 0.25,
        height: width * 0.25,
        borderRadius: width * 0.125,
        backgroundColor: '#D3D3D3',
    },
    changeImageButton: {
        backgroundColor: '#D8BFD8',
        paddingVertical: height * 0.015,
        paddingHorizontal: width * 0.05,
        borderRadius: 10,
        marginTop: height * 0.01,
    },
    changeImageText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: width * 0.04,
    },
    inputContainer: {
        width: '90%',
        marginTop: height * 0.02,
    },
    input: {
        backgroundColor: '#E0E0E0',
        padding: height * 0.02,
        borderRadius: 10,
        marginTop: height * 0.01,
        fontSize: width * 0.04,
    },
    saveButton: {
        backgroundColor: '#3b5998',
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.1,
        borderRadius: 10,
        marginTop: height * 0.03,
        marginBottom: height * 0.05,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: width * 0.045,
    },
});
