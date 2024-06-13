import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../assets/styles/globalStyles';
import { Button } from 'react-native-paper';

export default function Welcome() {
    const navigation = useNavigation();

    return (
        <View style={globalStyles.heroContainer}>
            <View style={globalStyles.heroContent}>
                <View style={globalStyles.topTextContainer}>
                    <Text style={globalStyles.topText}>Welcome to</Text>
                    <View style={globalStyles.logoContainer}>
                        <Text style={[globalStyles.topText, {}]}>Prepry</Text>
                    </View>
                </View>
                <View>
                <Text style={globalStyles.subText}>
                        Choose your path and start your journey to success!
                    </Text>
                    <Image
                        style={styles.centeredImage}
                        source={require("../../assets/img/welcome.png")}
                    />
                </View>
                <View style={globalStyles.buttonContainer}>
                    <Button
                        mode="contained"
                        onPress={() => navigation.navigate("Login")}
                        style={globalStyles.getStartedButton}
                        labelStyle={styles.buttonLabel}
                    >
                        Get Started
                    </Button>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonLabel: {
        color: 'black',
        fontSize: 14,
        fontWeight: "bold"
    },
    centeredImage: {
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: -80,
        width: 160,
        height: 160
    },
});
