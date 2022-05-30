import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FollowPage from '../../pages/followPage/FollowPage';

const Stack = createNativeStackNavigator();

function FollowScreen() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="FollowPage" component={FollowPage} />
        </Stack.Navigator>
    )
}

export default FollowScreen