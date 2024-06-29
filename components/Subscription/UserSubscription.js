import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { globalStyles } from '../../assets/styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import backgroundImage from '../../assets/img/wave.png'; 

export default function UserSubscription() {
    const navigation = useNavigation();
    const [selectedPlan, setSelectedPlan] = useState('Free');

    const renderPlan = (plan) => {
        const plans = {
            Free: (
                <View style={styles.planContainer}>
                    <Text style={styles.price}>0$</Text>
                    <Text style={styles.features}>10 Questions</Text>
                    <Text style={styles.features}>Unlimited Downloads</Text>
                    <Text style={styles.features}>iOS Support</Text>
                    <Text style={styles.trial}>30 Day Free Trial</Text>
                    <TouchableOpacity style={styles.upgradeButton}>
                        <Text style={styles.upgradeText}>Active Plan</Text>
                    </TouchableOpacity>
                </View>
            ),
            Pro: (
                <View style={styles.planContainer}>
                    <Text style={styles.price}>23$</Text>
                    <Text style={styles.features}>Unlimited questions and guides</Text>
                    <Text style={styles.features}>Unlimited Downloads</Text>
                    <Text style={styles.features}>iOS Support</Text>
                    <Text style={styles.trial}>6 months duration</Text>
                    <TouchableOpacity style={[styles.upgradeButton, { backgroundColor: "coral" }]}>
                        <Text style={styles.upgradeText}>UPGRADE</Text>
                    </TouchableOpacity>
                </View>
            ),
            Team: (
                <View style={styles.planContainer}>
                    <Text style={styles.price}>69$</Text>
                    <Text style={styles.features}>All Kits Included</Text>
                    <Text style={styles.features}>Unlimited Downloads</Text>
                    <Text style={styles.features}>iOS Support</Text>
                    <Text style={styles.trial}>Membership</Text>
                    <TouchableOpacity style={[styles.upgradeButton, { backgroundColor: "green" }]}>
                        <Text style={styles.upgradeText}>UPGRADE</Text>
                    </TouchableOpacity>
                </View>
            ),
        };

        return plans[plan];
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <View style={globalStyles.container}>
                <View style={styles.topHeader}>
                    <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                        <AntDesign name="arrowleft" size={30} color="white" style={{ marginLeft: 10 }} />
                    </TouchableOpacity>
                    <Text style={styles.topHeaderText}>Subscription</Text>
                    <View style={{ width: 24 }} />
                </View>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => setSelectedPlan('Free')}
                        style={selectedPlan === 'Free' ? styles.selectedTab : styles.tab}
                    >
                        <Text style={selectedPlan === 'Free' ? styles.selectedTabText : styles.tabText}>Free</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setSelectedPlan('Pro')}
                        style={selectedPlan === 'Pro' ? styles.selectedTab : styles.tab}
                    >
                        <Text style={selectedPlan === 'Pro' ? styles.selectedTabText : styles.tabText}>Pro</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setSelectedPlan('Team')}
                        style={selectedPlan === 'Team' ? styles.selectedTab : styles.tab}
                    >
                        <Text style={selectedPlan === 'Team' ? styles.selectedTabText : styles.tabText}>Team</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    {renderPlan(selectedPlan)}
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    topHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#3b5998',
        width: '100%',
        paddingVertical: 50,
        paddingHorizontal: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    topHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
        marginLeft: -24,
        color: "white"
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD',
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    selectedTab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderBottomWidth: 3,
        borderBottomColor: 'lightblue',
    },
    tabText: {
        fontSize: 16,
        color: '#777777',
        fontWeight: "bold"
    },
    selectedTabText: {
        fontSize: 16,
        color: 'lightblue',
        fontWeight: "bold"
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    planContainer: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingTop: 60,
        alignItems: 'center',
        width: '80%',
        height: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    price: {
        fontSize: 48,
        color: '#000',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    features: {
        fontSize: 16,
        color: '#555',
        marginVertical: 5,
    },
    trial: {
        fontSize: 14,
        color: '#999',
        marginVertical: 15,
    },
    upgradeButton: {
        backgroundColor: '#1C1A5E',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    upgradeText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
