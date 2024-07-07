import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import more1 from '../../../assets/img/trophy.png';
import more2 from '../../../assets/img/bottle.png';
import more3 from '../../../assets/img/rocket.png';
import { useNavigation } from '@react-navigation/native';

const Section4 = () => {
    const navigation = useNavigation();
    const { width } = Dimensions.get('window');
    const isPortrait = width < Dimensions.get('window').height;
    const boxWidth = isPortrait ? width * 0.44 : width * 0.25;
    const boxHeight = isPortrait ? boxWidth * 0.7 : boxWidth * 1.1;

    return (
        <View style={{ marginTop: 15 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <ImageOverlayWithText
                        source={more2}
                        text="Statistics"
                        style={{ width: boxWidth, height: boxHeight, borderRadius: 15 }}
                        onPress={() => {
                            navigation.navigate("UserStatistics");
                        }}
                    />
                    <ImageOverlayWithText
                        source={more3}
                        text="Notes"
                        style={{ width: boxWidth, height: boxHeight, borderRadius: 15, marginTop: 5 }}
                        onPress={() => {
                            navigation.navigate("UserNotes");
                        }}
                    />
                </View>
                <ImageOverlayWithText
                    source={more1}
                    text="Get Unlimited Questions"
                    style={{ width: boxWidth, height: boxHeight * 2.1, borderRadius: 15 }}
                    onPress={() => {
                        navigation.navigate("UserSubscription");
                    }}
                />
            </View>
        </View>
    );
};

// Custom component for Image with Text Overlay
const ImageOverlayWithText = ({ source, text, style, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={style}>
            <ImageBackground source={source} style={style} imageStyle={{ borderRadius: style.borderRadius }}>
                <View style={[styles.overlayStyle]}>
                    <Text style={styles.textStyle}>{text}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
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
