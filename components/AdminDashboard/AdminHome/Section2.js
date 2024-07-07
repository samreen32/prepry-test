import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import imageHero from "../../../assets/img/diamond.png";
import { globalStyles } from '../../../assets/styles/globalStyles';

function Section2() {
    const navigation = useNavigation();

    return (
        <>
            <View style={[globalStyles.rectangleBox, globalStyles.contentLayout, styles.container]}>
                <View style={styles.textContainer}>
                    <Text style={styles.headerText}>
                        Manage your Quizzes Efficiently
                    </Text>
                    <Button
                        mode="contained"
                        style={styles.button}
                        onPress={() => navigation.navigate('ViewQuestions')}
                    >
                        <Text style={styles.buttonText}>Manage Quizzes</Text>
                    </Button>

                </View>
                <Image
                    source={imageHero}
                    style={globalStyles.imageHome}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#3b5998"
    },
    textContainer: {
        flex: 1,
    },
    headerText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    },
    subHeaderText: {
        color: "white",
        fontSize: 16,
        marginVertical: 10,
    },
    button: {
        backgroundColor: "#D8BFD8",
        width: 180,
        marginTop: 12,
    },
    buttonText: {
        color: "black"
    }
});

export default Section2;
