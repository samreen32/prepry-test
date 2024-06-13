import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../../../assets/styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

function Section6() {
    return (
        <View style={{ marginTop: 15, marginBottom: 85 }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                <InfoCircle backgroundColor="#1C1A5E" icon={<Ionicons name="settings" size={24} color="white" />} text="Setting" />
                <InfoCircle backgroundColor="lightblue" icon={<AntDesign name="wechat" size={24} color="white" />} text="Notes" />
                <InfoCircle backgroundColor="#1C1A5E" icon={<Entypo name="help-with-circle" size={24} color="white" />} text="Help" />
                <InfoCircle backgroundColor="lightblue" icon={<Ionicons name="calendar" size={24} color="white" />} text="Plans" />
            </View>
        </View>
    );
}

// InfoCircle component
function InfoCircle({ backgroundColor, icon, text }) {
    const textColor = backgroundColor === "#1C1A5E" ? "white" : "black";

    return (
        <View style={[globalStyles.circle, { backgroundColor }]}>
            {icon}
            <Text style={{ textAlign: "center", fontWeight: "500", color: textColor }}>{text}</Text>
        </View>
    );
}

export default Section6;
