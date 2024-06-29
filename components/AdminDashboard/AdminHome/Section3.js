import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const Section3 = () => {
    const { width } = Dimensions.get('window');
    const boxWidth = (width - 25) / 2 - 15;

    return (
        <View style={{ marginTop: 15, paddingHorizontal: 6 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <ColoredBoxWithText
                    backgroundColor='#3b5998'
                    text="Manage Questions"
                    style={{ width: boxWidth, height: boxWidth + 25, borderRadius: 15 }}
                />
                <ColoredBoxWithText
                    backgroundColor='#f39c12'
                    text="Manage Tests"
                    style={{ width: boxWidth, height: boxWidth + 25, borderRadius: 15 }}
                />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <ColoredBoxWithText
                    backgroundColor='#f39c12'
                    text="Manage Reports"
                    style={{ width: boxWidth, height: boxWidth + 25, borderRadius: 15 }}
                />
                <ColoredBoxWithText
                    backgroundColor='#3b5998'
                    text="Manage Practice Questions"
                    style={{ width: boxWidth, height: boxWidth + 25, borderRadius: 15 }}
                />
            </View>
        </View>
    );
};

const ColoredBoxWithText = ({ backgroundColor, text, style }) => {
    return (
        <View style={[styles.coloredBox, { backgroundColor, ...style }]}>
            <Text style={styles.textStyle}>{text}</Text>
        </View>
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
