import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import profilePic from "../assets/img/userProfile.png";
import { useAuth } from "../frontend/context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const CustomDrawer = (props) => {
    const { user, adminInfo, token, adminToken, logout, adminLogout, showToast } = useAuth();
    let navigation = useNavigation();

    const handleLogout = async () => {
        if (adminToken) {
            await adminLogout();
            showToast("Admin logged out successfully");
            navigation.replace('ChooseView');
        } else if (token) {
            await logout();
            showToast("User logged out successfully");
            navigation.replace('ChooseView');
        }
    };

    return (
        <>
            <View style={{ marginBottom: 20 }}>
                <Animated.Image
                    source={profilePic}
                    style={{
                        width: 100,
                        height: 95,
                        marginLeft: 20,
                        marginTop: 30,
                        marginBottom: 30,
                        borderRadius: 60
                    }}
                />
                <TouchableOpacity>
                    <Ionicons
                        name="close-outline"
                        size={35}
                        color="white"
                        style={{ marginBottom: 20, marginLeft: 230, marginTop: -115 }}
                        onPress={() => {
                            props.navigation.closeDrawer();
                        }}
                    />
                </TouchableOpacity>
            </View>
            <Text
                style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    marginLeft: 23,
                    marginBottom: 10,
                    color: "white",
                }}
            >
                Hey, {user?.fullName || adminInfo?.fullName}
            </Text>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <View
                    style={{
                        width: 150,
                        height: 2,
                        backgroundColor: "black",
                        alignSelf: "stretch",
                        marginLeft: 15,
                        marginRight: 50,
                        marginTop: 15,
                    }}
                ></View>
                <TouchableOpacity
                    onPress={handleLogout}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 15,
                        marginVertical: 5,
                        marginLeft: 10,
                        marginRight: 10,
                        borderRadius: 5,
                        // backgroundColor: '#f39c12',
                    }}
                >
                    <AntDesign name="logout" size={20} color="white" />
                    <Text style={{ marginLeft: 20, color: 'white', fontWeight: 'bold' }}>Logout</Text>
                </TouchableOpacity>
            </DrawerContentScrollView>
        </>
    );
};

export default CustomDrawer;
