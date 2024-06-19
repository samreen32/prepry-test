import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import profilePic from "../assets/img/userProfile.png"

const CustomDrawer = (props) => {

    return (
        <>
            <View style={{ marginBottom: 20 }}>
                <Animated.Image
                    // source={{
                    //   uri:
                    //     profile.avatar ||
                    //     "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                    // }}
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
                Hey, User
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
            </DrawerContentScrollView>
        </>
    );
};
export default CustomDrawer;
