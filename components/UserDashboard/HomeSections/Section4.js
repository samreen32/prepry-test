import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import more1 from '../../../assets/img/more2.jpg';
import more2 from '../../../assets/img/banner-02.jpg';
import more3 from '../../../assets/img/more4.jpg';

function Section4() {
    return (
        <View style={{ padding: 16, marginTop: -15 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <ImageOverlayWithText
                    source={more1}
                    text={
                        <>
                            <Text>Discover</Text>
                            <Text>{"\n"}</Text>
                            <Text>your Match</Text>
                        </>
                    }
                    style={{ width: 150, height: 250, borderRadius: 15 }}
                />


                <View>
                    <ImageOverlayWithText
                        source={more2}
                        text={
                            <>
                                <Text>Connect</Text>
                                <Text>{"\n"}</Text>
                                <Text>Instantly</Text>
                            </>
                        }
                        style={{ width: 190, height: 110, borderRadius: 15 }}
                    />
                    <ImageOverlayWithText
                        source={more3}
                        text={
                            <>
                                <Text>Plan</Text>
                                <Text>{"\n"}</Text>
                                <Text>your Date</Text>
                            </>
                        }
                        style={{ width: 190, height: 130, borderRadius: 15, marginTop: 10 }}
                    />
                </View>
            </View>
        </View>
    );
}

// Custom component for Image with Text Overlay
function ImageOverlayWithText({ source, text, style }) {
    return (
        <ImageBackground source={source} style={style} imageStyle={{ borderRadius: style.borderRadius }}>
            <View style={[StyleSheet.absoluteFill, styles.overlayStyle]}>
                <Text style={styles.textStyle}>{text}</Text>
            </View>
        </ImageBackground>
    );
}

// Styles for the overlay and text
const styles = StyleSheet.create({
    overlayStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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

export default Section4;