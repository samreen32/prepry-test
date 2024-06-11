import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Animated, Image, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from '../../../assets/styles/globalStyles';
import profilePic from "../../../assets/img/userProfile.png"

function Section1() {
    const [greeting, setGreeting] = useState("");
    const [iconName, setIconName] = useState("sunny");
    const [iconColor, setIconColor] = useState("yellow");
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
            setIconColor("#D14009");
        } else if (hours >= 12 && hours < 18) {
            setGreeting("Good Afternoon");
            setIconName("partly-sunny");
            setIconColor("#FFD700");
        } else {
            setGreeting("Good Evening");
            setIconName("moon");
            setIconColor("white");
        }

        startSpin();
    }, [iconName]);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const animatedStyle = iconName === "sunny"
        ? { transform: [{ rotate: spin }] }
        : {};

    return (
        <View style={[globalStyles.topContainer, { marginTop: -10 }]}>
            <View style={globalStyles.leftContainer}>
                <Image
                    source={profilePic}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                />
                <View style={globalStyles.textContainer}>
                    <Text style={globalStyles.userName}>Hello, Tinder User
                    </Text>
                    <Text style={globalStyles.greeting}>
                        {greeting}
                        <Animated.View style={[styles.animatedView, animatedStyle]}>
                            <Ionicons name={iconName} size={22} color={iconColor} />
                        </Animated.View>
                    </Text>

                </View>
            </View>
            <View style={globalStyles.rightContainer}>
                <Ionicons name="search" size={24} color="black" />
            </View>
        </View>
    );
}

export default Section1;

const styles = StyleSheet.create({
    animatedView: {
        position: 'absolute',
        marginLeft: 5,

    },
});

