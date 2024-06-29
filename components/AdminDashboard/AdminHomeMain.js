import React from 'react';
import Section1 from './AdminHome/Section1';
import Section2 from './AdminHome/Section2';
import Section3 from './AdminHome/Section3';
import { Ionicons } from "@expo/vector-icons";
import { Badge } from 'react-native-paper';
import { globalStyles } from '../../assets/styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { Pressable, TouchableOpacity, View, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function AdminHomeMain() {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
            <View style={globalStyles.iconsContainer}>
                {/* Drawer icon */}
                <Pressable
                    onPress={() => navigation.openDrawer()}
                    style={globalStyles.iconPressable}
                >
                    <MaterialCommunityIcons name="menu-open" size={35} color="black" />
                </Pressable>

                {/* Notifications */}
                <TouchableOpacity style={globalStyles.iconTouchable}
                    onPress={() => { navigation.navigate("AdminNotification") }}
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
                <Section3 />
            </ScrollView>

        </View>
    );
}

export default AdminHomeMain;
