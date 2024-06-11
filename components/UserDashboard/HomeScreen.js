import React from 'react';
import { Pressable, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { Badge } from 'react-native-paper';
import { globalStyles } from '../../assets/styles/globalStyles';
import Section1 from './HomeSections/Section1';
import Section2 from './HomeSections/Section2';
import Section3 from './HomeSections/Section3';
import Section4 from './HomeSections/Section4';
import Section5 from './HomeSections/Section5';
import Section6 from './HomeSections/Section6';
import Section7 from './HomeSections/Section7';
import menuIcon from "../../assets/img/MenuIcon.png";
import placesIcon from "../../assets/img/places_icon.png"

function HomeScreen() {
    const navigation = useNavigation();

    return (
        <View style={{ backgroundColor: "lightgray" }}>
            <View style={globalStyles.iconsContainer}>
                {/* Drawer icon */}
                <Pressable
                    onPress={() => navigation.openDrawer()}
                    style={globalStyles.iconPressable}
                >
                    <Image source={menuIcon} style={{
                        width: 30, height: 30
                    }} />
                </Pressable>

                {/* Location */}
                {/* <Pressable
                    style={globalStyles.iconPressable}
                >
                    <Image source={placesIcon} style={{
                        width: 20, height: 20
                    }} />
                </Pressable> */}

                {/* Notifications */}
                <TouchableOpacity style={globalStyles.iconTouchable}>
                    <Badge style={globalStyles.badgeStyle}>3</Badge>
                    <Ionicons name="notifications" size={33} color="black" />
                </TouchableOpacity>
            </View>

            <ScrollView
                vertical={true}
                showsVerticalScrollIndicator={false}
            >
                <Section1 />
                <Section2 />
                <Section4 />
                <Section3 />
                <Section5 />
                <Section6 />
                <Section7 />

            </ScrollView>

        </View>
    );
}

export default HomeScreen;
