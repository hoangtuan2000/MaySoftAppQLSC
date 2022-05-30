import AsyncStorage from '@react-native-async-storage/async-storage';

const storeUserLogin = async (value) => {
    try {
        const auth = JSON.stringify(value)
        await AsyncStorage.setItem('auth', auth)
        return true
    } catch (e) {
        return false
    }
}

const getUserLogin = async () => {
    try {
        const auth = await AsyncStorage.getItem('auth')
        return auth != null ? JSON.parse(auth) : null;
    } catch (e) {
        return null
    }
}

const removeUserLogin = async () => {
    try {
        await AsyncStorage.removeItem('auth')
        return true
    } catch (e) {
        return false
    }
}

export {
    storeUserLogin,
    getUserLogin,
    removeUserLogin
}