import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AccountPage from '../../pages/accountPage/AccountPage';

const Stack = createNativeStackNavigator();

function AccountScreen() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="AccountPage" component={AccountPage} />
        </Stack.Navigator>
    )
}

export default AccountScreen