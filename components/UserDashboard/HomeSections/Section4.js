import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import more1 from '../../../assets/img/trophy.png';
import more2 from '../../../assets/img/bottle.png';
import more3 from '../../../assets/img/rocket.png';

const Section4 = () => {
    const { width } = Dimensions.get('window');
    const isPortrait = width < Dimensions.get('window').height;

    // Adjust dimensions based on orientation and screen width
    const boxWidth = isPortrait ? width * 0.4 : width * 0.25;
    const boxHeight = isPortrait ? boxWidth * 0.7 : boxWidth * 1.1;

    return (
        <View style={{ marginTop: 15 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <ImageOverlayWithText
                        source={more2}
                        text="Statistics"
                        style={{ width: boxWidth, height: boxHeight, borderRadius: 15 }}
                    />
                    <ImageOverlayWithText
                        source={more3}
                        text="Notes"
                        style={{ width: boxWidth, height: boxHeight, borderRadius: 15, marginTop: 10 }}
                    />
                </View>
                <ImageOverlayWithText
                    source={more1}
                    text="Get\nUnlimited Questions"
                    style={{ width: boxWidth, height: boxHeight * 2, borderRadius: 15 }}
                />
            </View>
        </View>
    );
};

// Custom component for Image with Text Overlay
const ImageOverlayWithText = ({ source, text, style }) => {
    return (
        <ImageBackground source={source} style={style} imageStyle={{ borderRadius: style.borderRadius }}>
            <View style={[styles.overlayStyle]}>
                <Text style={styles.textStyle}>{text}</Text>
            </View>
        </ImageBackground>
    );
};

// Styles for the overlay and text
const styles = StyleSheet.create({
    overlayStyle: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 15,
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
