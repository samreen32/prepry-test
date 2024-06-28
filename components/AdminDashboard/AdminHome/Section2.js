import React, { useRef, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { globalStyles } from '../../../assets/styles/globalStyles';
import { Button, ProgressBar } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import imageHero from "../../../assets/img/diamond.png"

function Section2() {
    const animation = useRef(null);
    const [progress, setProgress] = useState(0.45);

    return (
        <>
            <View style={[globalStyles.rectangleBox, globalStyles.contentLayout, { backgroundColor: "#9370DB" }]}>
                <View style={{ flex: 1 }}>
                    <Text style={{
                        color: "white",
                        fontSize: 20,
                        fontWeight: "bold"
                    }}>
                        3 days Strike!
                    </Text>
                    <Button mode="contained"
                        style={{
                            backgroundColor: "white", width: 150, marginTop: 12, marginLeft: -5
                        }}
                    >
                        <Text style={{ color: "black" }}>Get Started</Text>
                    </Button>
                </View>
                <Image
                    source={imageHero}
                    style={[globalStyles.imageHome]}
                />
            </View>
        </>
    );
}

export default Section2;
