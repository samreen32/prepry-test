import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminHomeMain from '../components/AdminDashboard/AdminHomeMain';
import AdminNotification from '../components/Notifications/AdminNotification';

const Stack = createNativeStackNavigator();

function AdminStack() {
    return (
        <>
            <Stack.Navigator
                initialRouteName="AdminHomeMain"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="AdminHomeMain" component={AdminHomeMain} />
                <Stack.Screen name="AdminNotification" component={AdminNotification} />

            </Stack.Navigator>
        </>
    )
}

export default AdminStack