import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import logout from "../../../assets/img/logout (1).png";
import statistics from "../../../assets/img/statistics.png";
import help from "../../../assets/img/Help.png";
import rocket from "../../../assets/img/rocket1.png";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function AdminProfile() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <AntDesign name="back" size={24} color="black"
                    onPress={() => {
                        navigation.navigate("HomeScreen")
                    }}
                />
                <Text style={styles.headerText}>Admin Profile</Text>
            </View>
            <View style={styles.profileSection}>
                <Image
                    source={require('../../../assets/img/MenuIcon.png')}
                    style={styles.profileIcon}
                />
                <Text style={styles.profileName}>User Name</Text>
                <TouchableOpacity style={styles.editProfileButton}
                    onPress={() => navigation.navigate("AdminEditProfile")}>
                    <Text style={styles.editProfileButtonText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.menu}>
                <MenuItem icon={require('../../../assets/img/MenuIcon.png')}
                    title="Dashboard"
                    onPress={() => {
                        navigation.navigate("AdminHomeMain")
                    }}
                />
                <MenuItem icon={help} title="Questions List" onPress={() => {
                    navigation.navigate("ViewQuestions")
                }} />
                <MenuItem icon={statistics} title="View Tests" onPress={() => {
                    navigation.navigate("ViewTests");
                }} />
                <MenuItem icon={rocket} title="Manage Reports" onPress={() => {
                    navigation.navigate("ViewReports")
                }}
                />
                <MenuItem icon={logout} title="Logout" />
            </View>
        </View>
    );
}

function MenuItem({ icon, title, onPress }) {
    return (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
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
        marginLeft: -width * 0.1,
    },
    profileSection: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        paddingVertical: height * 0.04,
        paddingHorizontal: width * 0.05,
        marginHorizontal: width * 0.05,
        marginTop: -height * 0.05,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    profileIcon: {
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: width * 0.1,
        marginBottom: height * 0.01,
    },
    profileName: {
        fontSize: width * 0.045,
        fontWeight: 'bold',
        marginBottom: height * 0.005,
    },
    editProfileButton: {
        backgroundColor: '#D8BFD8',
        paddingVertical: height * 0.01,
        paddingHorizontal: width * 0.04,
        borderRadius: 20,
    },
    editProfileButtonText: {
        color: '#000',
        fontSize: width * 0.04,
    },
    menu: {
        marginTop: height * 0.02,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.05,
        backgroundColor: '#FFFFFF',
        marginHorizontal: width * 0.05,
        marginVertical: height * 0.01,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    menuIcon: {
        width: width * 0.06,
        height: width * 0.06,
        marginRight: width * 0.04,
    },
    menuText: {
        fontSize: width * 0.045,
        fontWeight: "bold"
    },
});
