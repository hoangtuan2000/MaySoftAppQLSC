import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { removeUserLogin } from '../../asyncStorage/userLogin'

function AccountPage({ navigation }) {

    return (
        <View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    removeUserLogin()
                    navigation.navigate('LoginScreen');
                }}
            >
                <Text style={{ color: 'white' }}>Đăng Xuất</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AccountPage

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "#16b6f5",
        padding: 10,
        margin: 10,
        width: 100,
        borderRadius: 10,
    },
});