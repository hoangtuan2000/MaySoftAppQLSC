
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { store } from './redux/store'
import { Provider } from 'react-redux'

// import { getUserLogin, storeUserLogin } from './asyncStorage/userLogin'
// import LoginPage from './pages/loginPage/LoginPage';
// import HomePage from './pages/listReportPage/ListReportPage';
import HomeScreen from './screens/homeScreen/HomeScreen';
import LoginScreen from './screens/loginScreen/LoginScreen';
// import FiltersReport from './pages/filtersReportPage/FiltersReportPage';

// import { AuthContext } from './components/context'
// import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function App() {

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
            />
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider >
  );
}

export default App;


