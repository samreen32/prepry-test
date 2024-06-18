import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import logout from "../../../assets/img/logout (1).png";
import statistics from "../../../assets/img/statistics.png";
import help from "../../../assets/img/Help.png";
import rocket from "../../../assets/img/rocket1.png";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <AntDesign name="back" size={24} color="black"
                    onPress={() => {
                        navigation.navigate("HomeScreen")
                    }}
                />
                <Text style={styles.headerText}>Profile</Text>
            </View>
            <View style={styles.profileSection}>
                <Image
                    source={require('../../../assets/img/MenuIcon.png')}
                    style={styles.profileIcon}
                />
                <Text style={styles.profileName}>User Name</Text>
                <TouchableOpacity style={styles.editProfileButton}
                    onPress={() => navigation.navigate("EditUserProfile")}>
                    <Text style={styles.editProfileButtonText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.menu}>
                <MenuItem icon={require('../../../assets/img/MenuIcon.png')} title="Dashboard" />
                <MenuItem icon={help} title="Questions List" />
                <MenuItem icon={statistics} title="My Analytics" />
                <MenuItem icon={rocket} title="Upgrade" />
                <MenuItem icon={logout} title="Logout" />
            </View>
        </View>
    );
}

function MenuItem({ icon, title }) {
    return (
        <TouchableOpacity style={styles.menuItem}>
            <Image source={icon} style={styles.menuIcon} />
            <Text style={styles.menuText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F3F3',
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
    profileSection: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        marginTop: -40,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    profileIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    editProfileButton: {
        backgroundColor: '#1C1A5E',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    editProfileButtonText: {
        color: '#FFFFFF',
    },
    menu: {
        marginTop: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginVertical: 5,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    menuIcon: {
        width: 24,
        height: 24,
        marginRight: 15,
    },
    menuText: {
        fontSize: 16,
        fontWeight: "bold"
    },
});
