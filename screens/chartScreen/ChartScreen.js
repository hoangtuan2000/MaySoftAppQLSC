import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChartPage from '../../pages/chartPage/ChartPage';

const Stack = createNativeStackNavigator();

function ChartScreen() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="ChartPage" component={ChartPage} />
        </Stack.Navigator>
    )
}

export default ChartScreen