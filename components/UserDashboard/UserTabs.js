import { React } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import UserStack from "./UserStack";
import { Text } from "react-native";

const Tab = createBottomTabNavigator();

function UserTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, size, color }) => {
                    let iconName;
                    if (route.name === "Home") {
                        iconName = "home";
                        size = focused ? 35 : 30;
                        color = focused ? "#fe3c72" : "white";
                    } else if (route.name === "Profile") {
                        iconName = "person";
                        size = focused ? 30 : 32;
                        color = focused ? "#fe3c72" : "white";
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={UserStack}
                options={{
                    tabBarLabel: ({ focused, color }) => (
                        <Text style={{ color: focused ? "#fe3c72" : "white", top: -12 }}>
                            Home
                        </Text>
                    ),
                    tabBarStyle: {
                        // display: getRouteName(route),
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
                name="Profile"
                component={UserStack}
                options={{
                    tabBarLabel: ({ focused, color }) => (
                        <Text style={{ color: focused ? "#fe3c72" : "white", top: -12 }}>
                            Profile
                        </Text>
                    ),
                    tabBarStyle: {
                        // display: getRouteName(route),
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
    backgroundColor: "black",
});

export default UserTabs