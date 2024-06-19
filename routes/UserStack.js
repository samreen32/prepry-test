import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../components/UserDashboard/HomeScreen';
import Profile from '../components/Profile/UserProfile/Profile';
import EditProfile from '../components/Profile/UserProfile/EditProfile';
import UserNotification from '../components/Notifications/UserNotification';
import UserSearch from '../components/Search/UserSearch';

const Stack = createNativeStackNavigator();

function UserStack() {
    return (
        <>
            <Stack.Navigator
                initialRouteName="HomeScreen"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="UserProfile" component={Profile} />
                <Stack.Screen name="EditUserProfile" component={EditProfile} />
                <Stack.Screen name="UserNotification" component={UserNotification} />
                <Stack.Screen name="UserSearch" component={UserSearch} />
            </Stack.Navigator>
        </>
    )
}

export default UserStack