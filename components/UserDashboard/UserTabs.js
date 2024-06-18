import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text } from "react-native";
import UserStack from "./UserStack";
import Profile from "../UserProfile/Profile";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

function UserTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size, color }) => {
                    let iconName;
                    if (route.name === "Home") {
                        iconName = "home";
                    } else if (route.name === "UserProfile") {
                        iconName = "person";
                    } else if (route.name === "Settings") {
                        iconName = "settings";
                    } else if (route.name === "Help") {
                        iconName = "help-circle";
                    }
                    size = focused ? 30 : 25;
                    color = focused ? "lightblue" : "white";
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={UserStack}
                options={({ route }) => ({
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? "lightblue" : "white", top: -12 }}>
                            Home
                        </Text>
                    ),
                    tabBarStyle: {
                        display: getRouteName(route),
                        position: "absolute",
                        marginBottom: 2,
                        bottom: 5,
                        left: 15,
                        right: 15,
                        borderBottomLeftRadius: 60,
                        borderTopLeftRadius: 60,
                        borderBottomRightRadius: 60,
                        borderTopRightRadius: 60,
                        elevation: 0,
                        height: 80,
                        ...styles,
                    },
                    headerShown: false,
                })}
            />

            <Tab.Screen
                name="UserProfile"
                component={Profile}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? "lightblue" : "white", top: -12 }}>
                            Profile
                        </Text>
                    ),
                    tabBarStyle: {
                        position: "absolute",
                        marginBottom: 2,
                        bottom: 5,
                        left: 15,
                        right: 15,
                        borderBottomLeftRadius: 60,
                        borderTopLeftRadius: 60,
                        borderBottomRightRadius: 60,
                        borderTopRightRadius: 60,
                        elevation: 0,
                        height: 80,
                        ...styles,
                    },
                    headerShown: false,
                }}
            />

            <Tab.Screen
                name="Settings"
                component={UserStack}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? "lightblue" : "white", top: -12 }}>
                            Settings
                        </Text>
                    ),
                    tabBarStyle: {
                        position: "absolute",
                        marginBottom: 2,
                        bottom: 5,
                        left: 15,
                        right: 15,
                        borderBottomLeftRadius: 60,
                        borderTopLeftRadius: 60,
                        borderBottomRightRadius: 60,
                        borderTopRightRadius: 60,
                        elevation: 0,
                        height: 80,
                        ...styles,
                    },
                    headerShown: false,
                }}
            />

            <Tab.Screen
                name="Help"
                component={UserStack}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ color: focused ? "lightblue" : "white", top: -12 }}>
                            Help
                        </Text>
                    ),
                    tabBarStyle: {
                        position: "absolute",
                        marginBottom: 2,
                        bottom: 5,
                        left: 15,
                        right: 15,
                        borderBottomLeftRadius: 60,
                        borderTopLeftRadius: 60,
                        borderBottomRightRadius: 60,
                        borderTopRightRadius: 60,
                        elevation: 0,
                        height: 80,
                        ...styles,
                    },
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#1C1A5E",
});


const getRouteName = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (
        routeName?.includes("EditUserProfile") ||
        routeName?.includes("UserProfile") || 
        routeName?.includes("Settings")
    ) {
        return "none";
    }
    return "flex";
};

export default UserTabs;
