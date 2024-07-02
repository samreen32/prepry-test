import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const Section3 = () => {
    const navigation = useNavigation();
    const { width } = Dimensions.get('window');
    const boxWidth = (width - 25) / 2 - 15;

    const navigateToViewQuestions = () => {
        navigation.navigate('ViewQuestions');
    };

    const navigateToViewTests = () => {
        navigation.navigate("ViewTests");
    }

    const navigateReportSection = () => {
        navigation.navigate("ViewReports");
    }

    const navigatePracticeSection = () => {
        navigation.navigate("ViewPracticeQs");
    }

    return (
        <View style={{ marginTop: 15, paddingHorizontal: 6 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <ColoredBoxWithText
                    backgroundColor='#3b5998'
                    text="Manage Questions"
                    style={{ width: boxWidth, height: boxWidth + 25, borderRadius: 15 }}
                    onPress={navigateToViewQuestions}
                />
                <ColoredBoxWithText
                    backgroundColor='#f39c12'
                    text="Manage Tests"
                    style={{ width: boxWidth, height: boxWidth + 25, borderRadius: 15 }}
                    onPress={navigateToViewTests}
                />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <ColoredBoxWithText
                    backgroundColor='#f39c12'
                    text="Manage Reports"
                    style={{ width: boxWidth, height: boxWidth + 25, borderRadius: 15 }}
                    onPress={navigateReportSection}
                />
                <ColoredBoxWithText
                    backgroundColor='#3b5998'
                    text="Manage Practice Questions"
                    style={{ width: boxWidth, height: boxWidth + 25, borderRadius: 15 }}
                    onPress={navigatePracticeSection}
                />
            </View>
        </View>
    );
};

const ColoredBoxWithText = ({ backgroundColor, text, style, onPress }) => {
    return (
        <TouchableOpacity style={[styles.coloredBox, { backgroundColor, ...style }]} onPress={onPress}>
            <Text style={styles.textStyle}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    coloredBox: {
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default Section3;
