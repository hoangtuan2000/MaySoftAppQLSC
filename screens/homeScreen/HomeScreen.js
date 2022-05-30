import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ListReportScreen from '../listReportScreen/ListReportScreen';
import FollowScreen from '../followScreen/FollowScreen';
import ChartScreen from '../chartScreen/ChartScreen';
import Notification from '../notificationScreen/NotificationScreen'
import AccountScreen from '../accountScreen/NotificationScreen';

const Tab = createBottomTabNavigator();

function HomeScreen() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'ListReportScreen') {
                        iconName = focused ? 'list' : 'list';
                    } else if (route.name === 'FollowScreen') {
                        iconName = focused ? 'tv' : 'tv-outline';
                    } else if (route.name === 'ChartScreen') {
                        iconName = focused ? 'pie-chart' : 'pie-chart';
                    } else if (route.name === 'Notification') {
                        iconName = focused ? 'notifications' : 'notifications';
                    } else if (route.name === 'AccountScreen') {
                        iconName = focused ? 'person' : 'person';
                    } 

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#0095ff',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="ListReportScreen" component={ListReportScreen} options={{ title: 'Danh Sách' }} />
            <Tab.Screen name="FollowScreen" component={FollowScreen} options={{ title: 'Theo dõi & Xem xét' }} />
            <Tab.Screen name="ChartScreen" component={ChartScreen} options={{ title: 'Biểu Đồ' }}/>
            <Tab.Screen name="Notification" component={Notification} options={{ title: 'Thông Báo' }}/>
            <Tab.Screen name="AccountScreen" component={AccountScreen} options={{ title: 'Cá Nhân' }}/>
        </Tab.Navigator>
    )
}

export default HomeScreen