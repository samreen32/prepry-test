import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Animated, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from '../../../assets/styles/globalStyles';
import profilePic from "../../../assets/img/userProfile.png"
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../frontend/context/AuthContext';

function Section1() {
    const { user } = useAuth();
    const navigation = useNavigation();
    const [greeting, setGreeting] = useState("");
    const [iconName, setIconName] = useState("sunny");
    const spinValue = useRef(new Animated.Value(0)).current;

    // Function to start the icon spin animation
    const startSpin = () => {
        if (iconName === "sunny") {
            spinValue.setValue(0);
            Animated.loop(
                Animated.timing(spinValue, {
                    toValue: 1,
                    duration: 4000,
                    useNativeDriver: true,
                })
            ).start();
        }
    };

    useEffect(() => {
        const date = new Date();
        const hours = date.getHours();

        if (hours >= 0 && hours < 12) {
            setGreeting("Good Morning");
            setIconName("sunny");
        } else if (hours >= 12 && hours < 18) {
            setGreeting("Good Afternoon");
            setIconName("partly-sunny");
        } else {
            setGreeting("Good Evening");
            setIconName("moon");
        }

        startSpin();
    }, [iconName]);

    return (
        <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={() => {
                    navigation.navigate("Profile")
                }}
            >
                <Image
                    source={profilePic}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                />
                <View style={{ marginLeft: 10 }}>
                    <Text style={globalStyles.userName}>Hello, {user?.fullName}</Text>
                    <Text style={globalStyles.greeting}>
                        {greeting}
                    </Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("UserSearch")}>
                <Ionicons name="search" size={30} color="black" />
            </TouchableOpacity>
        </View>
    );
}

export default Section1;
