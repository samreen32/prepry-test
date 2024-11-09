import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const UserSearch = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredComponents, setFilteredComponents] = useState(components);

    const handleSearch = (text) => {
        setSearchQuery(text);
        const filtered = components.filter(component => component.name.toLowerCase().includes(text.toLowerCase()));
        setFilteredComponents(filtered);
    };

    const handleComponentPress = (componentName) => {
        if (componentName === 'Profile') {
            navigation.navigate('UserProfile');
        }
        if (componentName === 'Notifications') {
            navigation.navigate('UserNotification');
        }
        if (componentName === 'Notes') {
            navigation.navigate('UserNotes');
        }
        if (componentName === 'Test Reports') {
            navigation.navigate('TestReports');
        }
        if (componentName === 'Practice Questions') {
            navigation.navigate('PracticeQuickQs');
        }
        if (componentName === 'Tests') {
            navigation.navigate('TestsList');
        }
        if (componentName === 'Settings') {
            navigation.navigate('UserSettings');
        }
        if (componentName === 'Statistics') {
            navigation.navigate('UserStatistics');
        }
        if (componentName === 'Subscription') {
            navigation.navigate('UserSubscription');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                        <AntDesign name="arrowleft" size={30} color="white" style={{ marginLeft: width * 0.03 }} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Search</Text>
                    <View style={{ width: 30 }} />
                </View>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />
                </View>
                <View style={styles.notificationsContainer}>
                    {filteredComponents.map((component) => (
                        <TouchableOpacity key={component.id} onPress={() => handleComponentPress(component.name)}>
                            <View style={styles.notificationBox}>
                                <Text style={styles.componentName}>{component.name}</Text>
                                {component.content}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F3F3F3',
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
        color: "white"
    },
    searchContainer: {
        width: '90%',
        marginTop: height * 0.02,
    },
    searchInput: {
        backgroundColor: 'white',
        padding: height * 0.02,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        fontSize: width * 0.04,
    },
    notificationsContainer: {
        width: '90%',
        marginTop: height * 0.02,
    },
    notificationBox: {
        backgroundColor: 'lightgray',
        padding: height * 0.025,
        borderRadius: 10,
        marginTop: height * 0.01,
    },
    componentName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default UserSearch;

const components = [
    { id: 1, name: 'Profile', content: <Text>Profile</Text> },
    { id: 2, name: 'Notifications', content: <Text>Notifications</Text> },
    { id: 3, name: 'Notes', content: <Text>My Notes</Text> },
    { id: 4, name: 'Test Reports', content: <Text>Test Reports</Text> },
    { id: 5, name: 'Practice Questions', content: <Text>Practice Questions</Text> },
    { id: 6, name: 'Tests', content: <Text>Tests</Text> },
    { id: 7, name: 'Settings', content: <Text>Settings</Text> },
    { id: 8, name: 'Statistics', content: <Text>Statistics</Text> },
    { id: 9, name: 'Subscription', content: <Text>Subscription</Text> },
];