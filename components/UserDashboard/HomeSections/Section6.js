import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../../../assets/styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

function Section6() {
    return (
        <View style={{ padding: 16, marginTop: -15 }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                <InfoCircle backgroundColor="#F08080" icon={<Ionicons name="settings" size={24} color="white" />} text="Setting" />
                <InfoCircle backgroundColor="#87CEEB" icon={<AntDesign name="wechat" size={24} color="white" />} text="Chat" />
                <InfoCircle backgroundColor="#FFC0CB" icon={<Entypo name="help-with-circle" size={24} color="white" />} text="Help" />
                <InfoCircle backgroundColor="#C8A2C8" icon={<Ionicons name="calendar" size={24} color="white" />} text="Plan" />
            </View>
        </View>
    );
}

// InfoCircle component
function InfoCircle({ backgroundColor, icon, text }) {
    return (
        <View style={[globalStyles.circle, { backgroundColor }]}>
            {icon}
            <Text style={{ textAlign: "center", fontWeight: "500" }}>{text}</Text>
        </View>
    );
}

export default Section6;
