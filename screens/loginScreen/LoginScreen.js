import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from '../../pages/loginPage/LoginPage';

const Stack = createNativeStackNavigator();

function LoginScreen() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="LoginPage" component={LoginPage} />
        </Stack.Navigator>
    )
}

export default LoginScreen