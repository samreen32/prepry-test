import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

export default function AdminNotification() {
    const navigation = useNavigation();

    const dummyNotifications = [
        {
            name: 'John Doe',
            description: 'Your order has been shipped.',
            dateTime: '2024-06-18 14:30',
        },
        {
            name: 'Jane Smith',
            description: 'New comment on your post.',
            dateTime: '2024-06-18 13:15',
        },
        {
            name: 'Mark Johnson',
            description: 'You have a new follower.',
            dateTime: '2024-06-18 12:00',
        },
        {
            name: 'Emma Wilson',
            description: 'Your subscription is about to expire.',
            dateTime: '2024-06-18 11:45',
        },
        {
            name: 'Liam Brown',
            description: 'New message from support.',
            dateTime: '2024-06-18 10:30',
        },
        {
            name: 'Olivia Davis',
            description: 'Your password was changed successfully.',
            dateTime: '2024-06-18 09:15',
        },
        {
            name: 'Ava Martinez',
            description: 'New update available.',
            dateTime: '2024-06-18 08:00',
        },
    ];

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                        <AntDesign name="arrowleft" size={30} color="white" style={{ marginLeft: 10 }} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Notifications</Text>
                    <View style={{ width: 30 }} />
                </View>
                <View style={styles.notificationsContainer}>
                    {dummyNotifications.map((notification, index) => (
                        <View key={index} style={styles.notificationBox}>
                            <View style={styles.notificationTextContainer}>
                                <Text style={styles.notificationName}>{notification.name}</Text>
                                <Text style={styles.notificationDescription}>{notification.description}</Text>
                                <Text style={styles.notificationDateTime}>{notification.dateTime}</Text>
                            </View>
                            <View style={styles.notificationIcons}>
                                <TouchableOpacity style={styles.iconButton}>
                                    <MaterialIcons name="message" size={24} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.iconButton}>
                                    <MaterialIcons name="delete" size={24} color="red" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
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
        marginLeft: width * -0, 
        color: "white"
    },
    notificationsContainer: {
        width: '90%',
        marginTop: height * 0.02, // 2% of screen height
    },
    notificationBox: {
        backgroundColor: 'lightgray',
        padding: width * 0.05, // 5% of screen width
        borderRadius: 10,
        marginTop: height * 0.02, // 1% of screen height
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    notificationTextContainer: {
        flex: 1,
    },
    notificationName: {
        fontWeight: 'bold',
        fontSize: width * 0.045, // 4.5% of screen width
    },
    notificationDescription: {
        marginTop: height * 0.005, // 0.5% of screen height
        fontSize: width * 0.04, // 4% of screen width
    },
    notificationDateTime: {
        marginTop: height * 0.005, // 0.5% of screen height
        fontSize: width * 0.035, // 3.5% of screen width
        color: 'gray',
    },
    notificationIcons: {
        flexDirection: 'row',
    },
    iconButton: {
        marginLeft: width * 0.02, // 2% of screen width
    },
});
