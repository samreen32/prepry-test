import React from 'react';
import { Pressable, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Badge } from 'react-native-paper';
import { globalStyles } from '../../assets/styles/globalStyles';
import Section1 from './HomeSections/Section1';
import Section2 from './HomeSections/Section2';
import Section4 from './HomeSections/Section4';
import Section5 from './HomeSections/Section5';
import menuIcon from "../../assets/img/MenuIcon.png";
import placesIcon from "../../assets/img/places_icon.png";
import Section7 from './HomeSections/Section7';
import { useNavigation } from '@react-navigation/native';

function HomeScreen() {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
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
                <Pressable
                    style={globalStyles.iconPressable}
                >
                    <Image source={placesIcon} style={{
                        width: 20, height: 20
                    }} />
                </Pressable>

                {/* Notifications */}
                <TouchableOpacity style={globalStyles.iconTouchable}
                    onPress={() => { navigation.navigate("UserNotification") }}
                >
                    <Badge style={globalStyles.badgeStyle}>3</Badge>
                    <Ionicons name="notifications" size={33} color="#3b5998" />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 15, paddingRight: 15 }}
            >
                <Section1 />
                <Section2 />
                <Section5 />
                <Section4 />
                <Section7 />
            </ScrollView>

        </View>
    );
}

export default HomeScreen;
