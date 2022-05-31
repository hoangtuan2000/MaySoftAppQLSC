import * as React from 'react';
import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios'

import { getUserLogin, storeUserLogin } from '../../asyncStorage/userLogin'
import { ValidatePassword, ValidateUsername } from '../../validate/ValidateForm';

export default function LoginPage({ navigation }) {

  React.useEffect(() => {
    const checkLogin = async () => {
      let isLogin = await getUserLogin();
      isLogin != null ? navigation.navigate("HomeScreen") : navigation.navigate('LoginScreen')
    }
    checkLogin()
  }, [])

  const [usernameLogin, setUsernameLogin] = React.useState('')
  const [passwordLogin, setPasswordLogin] = React.useState('')

  const [usernameFail, setUsernameFail] = React.useState('')
  const [passwordFail, setPasswordFail] = React.useState('')

  const checkUsername = (username) => {
    if (ValidateUsername(username)) {
      setUsernameLogin(username)
      setUsernameFail('')
      return true
    } else {
      setUsernameLogin('')
      setUsernameFail('Tên không được bỏ trống')
      return false
    }
  }

  const checkPassword = (password) => {
    if (ValidatePassword(password)) {
      setPasswordLogin(password)
      setPasswordFail('')
      return true
    } else {
      setPasswordLogin('')
      setPasswordFail('Mật khẩu không được bỏ trống')
      return false
    }
  }

  const login = () => {
    if (checkUsername(usernameLogin) && checkPassword(passwordLogin)) {
      axios.post('https://qlsc.maysoft.io/server/api/auth/login', {
        username: usernameLogin,
        password: passwordLogin
      })
        .then((res) => {
          if (res.data.status) {
            storeUserLogin(res.data.data)
            navigation.navigate('HomeScreen')
          } else {
            setPasswordFail(res.data.errors)
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 50 }}>
        <Image
          source={{ uri: 'https://is1-ssl.mzstatic.com/image/thumb/Purple123/v4/33/b6/0c/33b60c91-3463-7f18-e1e4-13e923ce28c5/source/200x200bb.jpg' }}
          style={{ width: 100, height: 100 }}
        />
      </View>

      <View style={{ marginBottom: 15 }}>
        <Text style={{ fontWeight: 'bold' }}>Tên tài khoản</Text>
        <TextInput
          style={styles.input}
          autoFocus
          placeholder="Nhập tên tài khoản"
          onChangeText={(value) => checkUsername(value)}
        />
        <Text style={styles.textFail}>{usernameFail}</Text>
      </View>

      <View style={{ marginBottom: 25 }}>
        <Text style={{ fontWeight: 'bold' }}>Mật khẩu</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Nhập mật khẩu"
          onChangeText={(value) => checkPassword(value)}
        />
        <Text style={styles.textFail}>{passwordFail}</Text>
      </View>

      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={login}
        >
          <Text style={styles.textButton}>Đăng Nhập</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#16b6f5",
    padding: 10,
    width: 250,
    borderRadius: 10
  },
  input: {
    height: 40,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    width: 250,
    borderRadius: 8
  },
  textButton: {
    color: 'white'
  },
  textFail: {
    color: 'red'
  }
});





