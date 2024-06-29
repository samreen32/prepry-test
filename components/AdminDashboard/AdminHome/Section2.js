import React from 'react';
import { View, Text, Image } from 'react-native';
import { globalStyles } from '../../../assets/styles/globalStyles';
import { Button } from 'react-native-paper';
import imageHero from "../../../assets/img/diamond.png"

function Section2() {

    return (
        <>
            <View style={[globalStyles.rectangleBox, globalStyles.contentLayout, { backgroundColor: "#3b5998" }]}>
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
