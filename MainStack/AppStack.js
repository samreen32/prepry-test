import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../components/Welcome/Welcome';
// import Login from '../components/Login/Login';
// import Signup from "../components/Signup/Signup";
// import UserDrawer from "../components/UserDashboard/UserDrawer";

const Stack = createNativeStackNavigator();

export default function AppStack() {
    return (
        <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="Welcome" component={Welcome} />
            {/* <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="UserDrawer" component={UserDrawer} /> */}
        </Stack.Navigator>
    );
}