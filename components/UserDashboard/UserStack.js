import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';

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
            </Stack.Navigator>
        </>
    )
}

export default UserStack