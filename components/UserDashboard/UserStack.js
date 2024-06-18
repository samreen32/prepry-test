import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import Profile from '../Profile/UserProfile/Profile';
import EditProfile from '../Profile/UserProfile/EditProfile';

const Stack = createNativeStackNavigator();

function UserStack() {
    return (
        <>
            <Stack.Navigator
                initialRouteName="HomeScreen"
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="UserProfile" component={Profile} />
                <Stack.Screen name="EditUserProfile" component={EditProfile} />
            </Stack.Navigator>
        </>
    )
}

export default UserStack