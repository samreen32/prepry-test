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
            <View style={[globalStyles.rectangleBox, globalStyles.contentLayout]}>
                <View style={{ flex: 1 }}>
                    <Text style={{
                        color: "white",
                        fontSize: 20,
                    }}>
                        3 days Strike!
                    </Text>
                    <ProgressBar progress={progress} color="gray" style={{ marginTop: 10, marginBottom: 10 }} />
                    <Button mode="contained"
                        style={{
                            backgroundColor: "#D8BFD8", width: 150, marginTop: 12, marginLeft: -5
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
