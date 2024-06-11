import { React } from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from "@expo/vector-icons";
import CustomDrawer from "../CustomDrawer";
import UserTabs from "./UserTabs";
import { Text } from "react-native";

const Drawer = createDrawerNavigator();

function UserDrawer() {
    return (
        <Drawer.Navigator
            // useLegacyImplementation
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                drawerType: "slide",
                drawerPosition: "left",
                drawerHideStatusBarOnOpen: true,
                drawerStyle: {
                    backgroundColor: "linear-gradient(135deg, rgba(253, 85, 100, 1) 0%, #f67a3c 100%)",
                    flex: 1,
                    width: 300,
                },
                headerShown: false,
                swipeEnabled: true,
                gestureEnabled: true,
                drawerActiveBackgroundColor: "white",
                drawerActiveBorderRadius: 30
            }}
        >
            <Drawer.Screen
                name="Dashboard"
                component={UserTabs}
                options={{
                    title: ({ focused }) => (
                        <Text
                            style={{ color: "black", right: 26 }}
                        >Dashboard
                        </Text>
                    ),
                    drawerIcon: ({ focused }) => (
                        <Ionicons
                            name="person"
                            size={focused ? 25 : 20}
                            style={{ color: "black" }}
                        />
                    ),
                }}
            />
        </Drawer.Navigator>
    )
}

export default UserDrawer