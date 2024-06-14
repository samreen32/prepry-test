import React, { useEffect, useRef } from 'react';
import {
    Animated,
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../assets/styles/globalStyles';
import { Entypo, MaterialIcons } from '@expo/vector-icons';

export default function ChooseView() {
    const adminPosition = useRef(new Animated.Value(-300)).current;
    const userPosition = useRef(new Animated.Value(300)).current;
    const navigation = useNavigation();

    useEffect(() => {
        Animated.stagger(300, [
            Animated.spring(adminPosition, {
                toValue: 0,
                useNativeDriver: true,
            }),
            Animated.spring(userPosition, {
                toValue: 0,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleAdminPress = () => {
        navigation.navigate('AdminLogin');
    };

    const handleUserPress = () => {
        navigation.navigate('Login');
    };

    const handleSkipPress = () => {
        navigation.goBack();
    };

    return (
        <View style={[globalStyles.container, { padding: 20, backgroundColor: "#1C1A5E" }]}>
            <View>
                <Text style={[styles.headerText, { color: "lightblue" }]}>Choose</Text>
            </View>
            <View style={{ marginTop: -15 }}>
                <Text style={styles.headerText}>your <Text style={{ color: "lightblue" }}>View</Text>
                </Text>
            </View>
            <Animated.View style={[styles.card, { transform: [{ translateX: adminPosition }] }]}>
                <TouchableOpacity onPress={handleAdminPress} style={styles.touchable}>
                    <MaterialIcons name="admin-panel-settings" size={24} color="black" />
                    <Text style={styles.cardText}>Admin</Text>
                </TouchableOpacity>
            </Animated.View>
            <Animated.View style={[styles.card, { transform: [{ translateX: userPosition }] }]}>
                <TouchableOpacity onPress={handleUserPress} style={styles.touchable}>
                    <Entypo name="user" size={24} color="black" />
                    <Text style={styles.cardText}>User</Text>
                </TouchableOpacity>
            </Animated.View>
            <Text style={styles.skip} onPress={handleSkipPress}>skip</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerText: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 20,
        color: "white"
    },
    card: {
        width: "100%",
        height: "30%",
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    touchable: {
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    skip: {
        color: "white",
        fontSize: 18,
        textDecorationLine: "underline",
        textAlign: "center"
    }
});
