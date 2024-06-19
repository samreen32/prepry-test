import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons, AntDesign, Entypo, Foundation, MaterialIcons } from "@expo/vector-icons";
import CustomDrawer from "./CustomDrawer";
import UserTabs from "./UserTabs";
import { Text } from "react-native";
import Profile from "../components/Profile/UserProfile/Profile";

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
                            name="home"
                            size={focused ? 25 : 20}
                            style={{ color: focused ? "black" : "white" }}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="UserProfile"
                component={Profile}
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
                name="Analytics"
                component={UserTabs}
                options={{
                    drawerLabel: ({ focused }) => (
                        <Text style={{ color: focused ? "black" : "white", right: 26 }}>Analytics</Text>
                    ),
                    drawerIcon: ({ focused }) => (
                        <Ionicons name="analytics-sharp"
                            size={focused ? 25 : 20}
                            style={{ color: focused ? "black" : "white" }}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="Subscription"
                component={UserTabs}
                options={{
                    drawerLabel: ({ focused }) => (
                        <Text style={{ color: focused ? "black" : "white", right: 26 }}>Go Pro</Text>
                    ),
                    drawerIcon: ({ focused }) => (
                        <Entypo
                            name="trophy"
                            size={focused ? 25 : 20}
                            style={{ color: focused ? "black" : "white" }}
                        />
                    ),
                }}
            />

            <Drawer.Screen
                name="Questions"
                component={UserTabs}
                options={{
                    drawerLabel: ({ focused }) => (
                        <Text style={{ color: focused ? "black" : "white", right: 26 }}>Questions List</Text>
                    ),
                    drawerIcon: ({ focused }) => (
                        <MaterialIcons name="checklist"
                            size={focused ? 25 : 20}
                            style={{ color: focused ? "black" : "white" }}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="Notes"
                component={UserTabs}
                options={{
                    drawerLabel: ({ focused }) => (
                        <Text style={{ color: focused ? "black" : "white", right: 26 }}>Notes</Text>
                    ),
                    drawerIcon: ({ focused }) => (
                        <Foundation name="clipboard-notes"
                            size={focused ? 25 : 20}
                            style={{ color: focused ? "black" : "white" }}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name="Logout"
                component={UserTabs}
                options={{
                    drawerLabel: ({ focused }) => (
                        <Text style={{ color: focused ? "black" : "white", right: 26 }}>Logout</Text>
                    ),
                    drawerIcon: ({ focused }) => (
                        <AntDesign name="logout"
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
