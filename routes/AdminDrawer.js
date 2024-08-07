import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import CustomDrawer from "./CustomDrawer";
import { Text } from "react-native";
import AdminTabs from "./AdminTabs";
import AdminProfile from "../components/Profile/AdminProfile/AdminProfile";
import AdminSettings from "../components/Settings/AdminSettings";

const Drawer = createDrawerNavigator();

function AdminDrawer() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                drawerType: "slide",
                drawerPosition: "left",
                drawerHideStatusBarOnOpen: true,
                drawerStyle: {
                    backgroundColor: "#3b5998",
                    flex: 1,
                    width: 300,
                },
                headerShown: false,
                swipeEnabled: true,
                gestureEnabled: true,
                drawerActiveBackgroundColor: "#D8BFD8",
                drawerActiveBorderRadius: 30
            }}
        >
            <Drawer.Screen
                name="Dashboard"
                component={AdminTabs}
                options={{
                    drawerLabel: ({ focused }) => (
                        <Text style={{ color: focused ? "black" : "white", right: 26 }}>Dashboard</Text>
                    ),
                    drawerIcon: ({ focused }) => (
                        <Ionicons
                            name="home"
                            size={focused ? 25 : 20}
                            style={{ color: focused ? "black" : "white" }}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="AdminProfile"
                component={AdminProfile}
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
            <Drawer.Screen
                name="AdminSettings"
                component={AdminSettings}
                options={{
                    drawerLabel: ({ focused }) => (
                        <Text style={{ color: focused ? "black" : "white", right: 26 }}>Settings</Text>
                    ),
                    drawerIcon: ({ focused }) => (
                        <MaterialIcons name="checklist"
                            size={focused ? 25 : 20}
                            style={{ color: focused ? "black" : "white" }}
                        />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}

export default AdminDrawer;
