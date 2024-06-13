import React, { useRef } from 'react';
import { View, Text, Image } from 'react-native';
import { globalStyles } from '../../../assets/styles/globalStyles';
import tinderLogo from '../../../assets/img/crown.gif';
import { Button } from 'react-native-paper';
import LottieView from 'lottie-react-native';

function Section7() {
    const animation = useRef(null);

    return (
        <View style={{ padding: 16, marginTop: -30, marginBottom: 180 }}>
            <View style={[globalStyles.rectangleBox, globalStyles.contentLayout]}>
                <View style={{ flex: 1 }}>
                    <Text style={{
                        color: "white",
                        fontSize: 20,
                    }}>
                        UPGRADE {"\n"}YOUR PLAN.
                    </Text>
                    <Button mode="contained"
                        style={{
                            backgroundColor: "black", width: 150, marginTop: 12, marginLeft: -5
                        }}
                    >
                        <Text>Premium</Text>
                    </Button>
                </View>
                <Image
                    source={tinderLogo}
                    style={[globalStyles.imageHome]}
                />

            </View>
            <View style={{
                 position: 'absolute',
                 top: 0,
                 right: 0,
                 marginTop: -10,
                 marginRight: -50,
                 padding: 10,
                 alignItems: 'center',
            }}>
                <LottieView
                    autoPlay
                    ref={animation}
                    style={{
                        width: 200,
                        height: 200,
                    }}
                    source={require('../../../assets/animation/Animation - 1710858952303.json')}
                />
            </View>
        </View>
    );
}

export default Section7;