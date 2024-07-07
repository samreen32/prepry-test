import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function UserSettings() {
    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate("UserHome")}>
                        <AntDesign name="arrowleft" size={30} color="white" style={{ marginLeft: 10 }} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Settings</Text>
                    <View style={{ width: 30 }} />
                </View>
                <View style={styles.settingsContainer}>
                    <TouchableOpacity style={styles.settingsItem} onPress={() => navigation.navigate('UserProfile')}>
                        <MaterialIcons name="person" size={24} color="black" />
                        <Text style={styles.settingsText}>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingsItem} onPress={() => navigation.navigate('ComingSoon')}>
                        <MaterialIcons name="lock" size={24} color="black" />
                        <Text style={styles.settingsText}>Privacy Policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingsItem} onPress={() => navigation.navigate('UserNotification')}>
                        <MaterialIcons name="notifications" size={24} color="black" />
                        <Text style={styles.settingsText}>Notification Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingsItem} onPress={() => navigation.navigate('ComingSoon')}>
                        <MaterialIcons name="security" size={24} color="black" />
                        <Text style={styles.settingsText}>Account Security</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingsItem} onPress={() => navigation.navigate('ComingSoon')}>
                        <MaterialIcons name="support-agent" size={24} color="black" />
                        <Text style={styles.settingsText}>Support & Feedback</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#D3E2E8',
        alignItems: 'center',
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
    settingsContainer: {
        width: '90%',
        marginTop: height * 0.1,
    },
    settingsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: width * 0.05,
        backgroundColor: 'lightgray',
        borderRadius: 10,
        marginBottom: height * 0.02,
    },
    settingsText: {
        marginLeft: width * 0.03,
        fontSize: width * 0.045,
    },
});
