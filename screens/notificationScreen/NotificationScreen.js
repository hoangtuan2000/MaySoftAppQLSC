import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NotificationPage from '../../pages/notificationPage/NotificationPage';

const Stack = createNativeStackNavigator();

function NotificationScreen() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="NotificationPage" component={NotificationPage} />
        </Stack.Navigator>
    )
}

export default NotificationScreen