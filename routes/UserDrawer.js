import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons, AntDesign, Entypo, Foundation, MaterialIcons } from "@expo/vector-icons";
import CustomDrawer from "./CustomDrawer";
import UserTabs from "./UserTabs";
import { Text } from "react-native";
import Profile from "../components/Profile/UserProfile/Profile";
import UserSubscription from "../components/Subscription/UserSubscription";
import QuestionsList from "../components/QuestionsList/QuestionsList";
import UserStatistics from "../components/UserStatistics/UserStatistics";
import UserNotes from "../components/Notes/UserNotes";

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
                name="QuestionsList"
                component={QuestionsList}
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
                component={UserNotes}
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
                name="Analytics"
                component={UserStatistics}
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
                name="UserSubscription"
                component={UserSubscription}
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

        </Drawer.Navigator>
    );
}

export default UserDrawer;
