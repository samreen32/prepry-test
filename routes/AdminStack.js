import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminHomeMain from '../components/AdminDashboard/AdminHomeMain';
import AdminNotification from '../components/Notifications/AdminNotification';
import ViewQuestions from '../components/ManageAdminService/ViewQuestions';
import ViewTests from '../components/ManageAdminService/ViewTests';
import ViewReports from '../components/ManageAdminService/ViewReports';
import ViewDetailedReport from '../components/ManageAdminService/ViewDetailedReport';
import ViewPracticeQs from '../components/ManageAdminService/ViewPracticeQs';

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
                <Stack.Screen name="ViewQuestions" component={ViewQuestions} />
                <Stack.Screen name="ViewTests" component={ViewTests} />
                <Stack.Screen name="ViewReports" component={ViewReports} />
                <Stack.Screen name="ViewDetailedReport" component={ViewDetailedReport} />
                <Stack.Screen name="ViewPracticeQs" component={ViewPracticeQs} />
            </Stack.Navigator>
        </>
    )
}

export default AdminStack