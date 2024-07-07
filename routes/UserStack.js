import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../components/UserDashboard/HomeScreen';
import Profile from '../components/Profile/UserProfile/Profile';
import EditProfile from '../components/Profile/UserProfile/EditProfile';
import UserNotification from '../components/Notifications/UserNotification';
import UserSearch from '../components/Search/UserSearch';
import UserSubscription from '../components/Subscription/UserSubscription';
import QuestionsList from '../components/QuestionsList/QuestionsList';
import PracticeQuickQs from '../components/PracticeQuickQs/PracticeQuickQs';
import TestReports from '../components/UserReport/TestReports';
import SpecificReportMain from '../components/UserReport/SpecificReport/SpecificReportMain';
import UserNotes from '../components/Notes/UserNotes';
import UserStatistics from '../components/UserStatistics/UserStatistics';
import UserSettings from '../components/Settings/UserSettings';
import ComingSoon from '../components/ComingSoon/ComingSoon';
import UserHelp from '../components/Help/UserHelp';

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
                <Stack.Screen name="UserSubscription" component={UserSubscription} />
                <Stack.Screen name="QuestionsList" component={QuestionsList} />
                <Stack.Screen name="PracticeQuickQs" component={PracticeQuickQs} />
                <Stack.Screen name="TestReports" component={TestReports} />
                <Stack.Screen name="SpecificReportMain" component={SpecificReportMain} />
                <Stack.Screen name="UserNotes" component={UserNotes} />
                <Stack.Screen name="UserStatistics" component={UserStatistics} />
                <Stack.Screen name="UserSettings" component={UserSettings} />
                <Stack.Screen name="UserHelp" component={UserHelp} />
                <Stack.Screen name="ComingSoon" component={ComingSoon} />
            </Stack.Navigator>
        </>
    )
}

export default UserStack