import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../components/Welcome/Welcome';
import Login from '../components/Login/Login';
import Signup from "../components/Signup/Signup";
import UserDrawer from "../routes/UserDrawer";
import ChooseView from "../components/ChooseView/ChooseView";
import AdminLogin from "../components/AdminLogin/AdminLogin";
import AdminDrawer from "../routes/AdminDrawer";
import { useAuth } from "../frontend/context/AuthContext";
import { ActivityIndicator } from "react-native-paper";
import { View } from "react-native";

const Stack = createNativeStackNavigator();

const AppStack = () => {
    const { token, adminToken, isAuthenticated, authLoading } = useAuth();

    if (authLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
                headerShown: false,
            }}
        >
            {!isAuthenticated ? (
                <>
                    <Stack.Screen name="Welcome" component={Welcome} />
                    <Stack.Screen name="ChooseView" component={ChooseView} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Signup" component={Signup} />
                    <Stack.Screen name="AdminLogin" component={AdminLogin} />
                </>
            ) : (
                <>
                    {token && <Stack.Screen name="UserDrawer" component={UserDrawer} />}
                    {adminToken && <Stack.Screen name="AdminDrawer" component={AdminDrawer} />}
                </>
            )}
        </Stack.Navigator>
    );
};

export default AppStack;