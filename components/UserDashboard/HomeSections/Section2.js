import React, { useRef } from 'react';
import { View, Text, Image } from 'react-native';
import { globalStyles } from '../../../assets/styles/globalStyles';
import tinderLogo from '../../../assets/img/deal-03.png';
import { Button } from 'react-native-paper';
import LottieView from 'lottie-react-native';

function Section2() {
    const animation = useRef(null);

    return (
        <View style={{ padding: 16, marginTop: -15 }}>
            <View style={[globalStyles.rectangleBox, globalStyles.contentLayout]}>
                <View style={{ flex: 1 }}>
                    <Text style={{
                        color: "white",
                        fontSize: 20,
                    }}>
                        FIND YOUR {"\n"}PERFECT MATCH.
                    </Text>
                    <Button mode="contained"
                        style={{
                            backgroundColor: "black", width: 150, marginTop: 12, marginLeft: -5
                        }}
                    >
                        <Text>Get Started</Text>
                    </Button>
                </View>
                <Image
                    source={tinderLogo}
                    style={[globalStyles.imageHome]}
                />

            </View>
            <View style={globalStyles.animationContainer}>
                <LottieView
                    autoPlay
                    ref={animation}
                    style={{
                        width: 200,
                        height: 200,
                    }}
                    source={require('../../../assets/animation/Animation - 1710858887710.json')}
                />
            </View>
        </View>
    );
}

export default Section2;
