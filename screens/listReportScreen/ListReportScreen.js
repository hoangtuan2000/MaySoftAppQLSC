import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListReportPage from '../../pages/listReportPage/ListReportPage';
import FiltersReportPage from '../../pages/filtersReportPage/FiltersReportPage';

const Stack = createNativeStackNavigator();

function ListReportScreen() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="ListReportPage" component={ListReportPage} />
            <Stack.Screen name="FiltersReportPage" component={FiltersReportPage} />
        </Stack.Navigator>
    )
}

export default ListReportScreen