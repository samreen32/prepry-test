import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from "@expo/vector-icons";
import CustomDrawer from "../CustomDrawer";
import UserTabs from "./UserTabs";
import { Text } from "react-native";

const Drawer = createDrawerNavigator();

function UserDrawer() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                drawerType: "slide",
                drawerPosition: "left",
                drawerHideStatusBarOnOpen: true,
                drawerStyle: {
                    backgroundColor: "#1C1A5E",
                    flex: 1,
                    width: 300,
                },
                headerShown: false,
                swipeEnabled: true,
                gestureEnabled: true,
                drawerActiveBackgroundColor: "lightblue",
                drawerActiveBorderRadius: 30
            }}
        >
            <Drawer.Screen
                name="Dashboard"
                component={UserTabs}
                options={{
                    drawerLabel: ({ focused }) => (
                        <Text style={{ color: focused ? "black" : "white", right: 26 }}>Dashboard</Text>
                    ),
                    drawerIcon: ({ focused }) => (
                        <Ionicons
                            name="person"
                            size={focused ? 25 : 20}
                            style={{ color: focused ? "black" : "white" }}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="Profile"
                component={UserTabs}
                options={{
                    drawerLabel: ({ focused }) => (
                        <Text style={{ color: focused ? "black" : "white", right: 26 }}>Profile</Text>
                    ),
                    drawerIcon: ({ focused }) => (
                        <Ionicons
                            name="person"
                            size={focused ? 25 : 20}
                            style={{ color: focused ? "black" : "white" }}
                        />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}

export default UserDrawer;
