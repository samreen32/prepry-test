import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Section3() {
    return (
        <View style={{ marginTop: 15 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <ColoredBoxWithText
                    backgroundColor='#3b5998'
                    text={
                        <>
                            <Text>Manage</Text>
                            <Text>{"\n"}</Text>
                            <Text>Questions</Text>
                        </>
                    }
                    style={{ width: 170, height: 185, borderRadius: 15 }}
                />
                <ColoredBoxWithText
                    backgroundColor='#f39c12'
                    text={
                        <>
                            <Text>Manage</Text>
                            <Text>{"\n"}</Text>
                            <Text>Tests</Text>
                        </>
                    }
                    style={{ width: 170, height: 185, borderRadius: 15 }}
                />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <ColoredBoxWithText
                    backgroundColor='#f39c12'
                    text={
                        <>
                            <Text>Manage</Text>
                            <Text>{"\n"}</Text>
                            <Text>Reports</Text>
                        </>
                    }
                    style={{ width: 170, height: 185, borderRadius: 15 }}
                />
                <ColoredBoxWithText
                    backgroundColor='#3b5998'
                    text={
                        <>
                            <Text>Manage</Text>
                            <Text>{"\n"}</Text>
                            <Text>Practice</Text>
                            <Text>{"\n"}</Text>
                            <Text>Questions</Text>
                        </>
                    }
                    style={{ width: 170, height: 185, borderRadius: 15 }}
                />
            </View>
        </View>
    );
}

// Custom component for Box with Background Color and Text
function ColoredBoxWithText({ backgroundColor, text, style }) {
    return (
        <View style={[style, { backgroundColor }]}>
            <View style={[StyleSheet.absoluteFill, styles.overlayStyle]}>
                <Text style={styles.textStyle}>{text}</Text>
            </View>
        </View>
    );
}

// Styles for the overlay and text
const styles = StyleSheet.create({
    overlayStyle: {
        borderRadius: 15,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Section3;
