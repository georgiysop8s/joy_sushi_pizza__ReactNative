import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect } from 'react'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import { db, auth } from '../firebase'
import { getAuth, sendPasswordResetEmail,sendEmailVerification } from "firebase/auth";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Button,
  Image,
  Dimensions,
  Alert,
} from 'react-native'

// const Pizza25 = [
//   {
//     id: "2594609",
//     category_id: "15220",
//     name: "Тори но Шиитаке сарада",
//     description: "Курица, грибы Шиитаке, огурец, соус Тар-тар, зеленый лук, укроп",
//     price: 229,
//     picture: "https://dlvry.ru/upload/resize_cache/iblock/87f/900_900_1/tori-no-shiitake-sarada.jpg",
//   },
//   {
//     id: "2594616",
//     category_id: "15220",
//     name: "Цезарь с креветкой",
//     description: "Креветка, сыр Пармезан, салат Айсберг, капуста пекинская, томаты, яйцо, соус Цезарь, гренки",
//     price: 349,
//     picture: "https://dlvry.ru/upload/resize_cache/iblock/d7d/900_900_1/tsezar-s-krevetkoy.jpg",
//   },
//   {
//     id: "2594622",
//     category_id: "15220",
//     name: "Цезарь с курицей",
//     description: "Курица, сыр Пармезан, салат Айсберг, капуста пекинская, томаты, яйцо, соус Цезарь, гренки",
//     price: 259,
//     picture: "https://dlvry.ru/upload/resize_cache/iblock/508/900_900_1/tsezar-s-kuritsey.jpg",
//   },
//   {
//     id: "2594628",
//     category_id: "15220",
//     name: "Чука сарада",
//     description: "Салат Чука, водоросли Вакамэ, лимон, ореховый соус.",
//     price: 249,
//     picture: "https://dlvry.ru/upload/resize_cache/iblock/01a/900_900_1/chuka-sarado.jpg",
//   }
// ]

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height
const pol_width = WIDTH / 2 - 20

const Login = () => {
  let [fontsLoaded] = useFonts({
    'Philosopher-Regular': require('../assets/fonts/Philosopher-Regular.ttf'),
    'Philosopher-Bold': require('../assets/fonts/Philosopher-Bold.ttf'),
  })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace('all')
      }
    })
    return unsubscribe
  }, [])

  const now = new Date()

  const handleSingUp = async () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user
        console.log('Зарегистрирован: ', user.email)
        sendEmailVerification(getAuth().currentUser)
        return db
          .collection('users')
          .doc(userCredentials.user.uid)
          .set({
            email: email,
            name: '',
            phone: '',
            street: '',
            house: '',
            pod: '',
            kv: '',
            createdAt: now,
          })
      })
      .catch((error) => alert(error.message))
  }

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user
        console.log('в системе: ', user.email)
      })
      .catch((error) => alert(error.message))
  }

  // const addCol = () => {
  //   Pizza25.forEach(function(obj) {
  //     return db
  //       .collection('Салаты')
  //       .doc()
  //       .set({
  //         id: obj.id,
  //         category_id: obj.category_id,
  //         name: obj.name,
  //         description: obj.description,
  //         price: obj.price,
  //         picture: obj.picture,
  //       })
  //       .then(function(docRef) {
  //         console.log('Document written with ID: ')
  //       })
  //       .catch(function(error) {
  //         console.error('Error adding document: ', error)
  //       })
  //   })
  // }

  if (!fontsLoaded) {
    return <AppLoading />
  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inputcontainer}>
        <Image
          source={require('../assets/authorization/user.png')}
          style={styles.user}
        />
        <TextInput
          placeholder="email"
          placeholderTextColor={'red'}
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="password"
          placeholderTextColor={'red'}
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.buttoncontainer}>
        {/* <TouchableOpacity style={[styles.button, styles.buttonOutLine]}>
          <Text style={styles.buttonOutLineText}>Войти с телефона </Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Войти</Text>
        </TouchableOpacity>
        {/* <Button title="Добавить товары" onPress={addCol} /> */}
        <TouchableOpacity
          onPress={handleSingUp}
          style={[styles.button, styles.buttonOutLine]}
        >
          <Text style={styles.buttonOutLineText}>Регистрация</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginBottom: 30, marginTop: 10 }}
          onPress={() => {
            if (email != '') {
              sendPasswordResetEmail(getAuth(), email)
                .then(function() {
                  console.log('sent ')
                })
                .catch(function(error) {
                  console.log(error.message)
                })
            } else {
              Alert.alert('', 'Введите почту')
            }
          }}
        >
          <Text style={{ color: 'blue', fontFamily: 'Philosopher-Regular' }}>
            Забыли пароль ?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Fast')
          }}
        >
          <Text style={styles.buttonText}>Быстрый заказ</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.btnstyle2}>
          <Text style={styles.btntext2}>авторизироваться через </Text>
          <Image
            source={require('../assets/authorization/google.png')}
            style={styles.image}
          />
        </TouchableOpacity> */}
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inputcontainer: { width: '80%' },
  input: {
    backgroundColor: '#FFF0F5',
    paddingHorizontal: 15,
    paddingVertical: 10,
    // borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    color: 'red',
    fontSize: 20,
    fontFamily: 'Philosopher-Regular',
    opacity: 0.4,
  },
  buttoncontainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    marginTop: 5,
    backgroundColor: 'red',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutLine: {
    backgroundColor: '#fff',
    marginTop: 5,
    borderColor: 'red',
    borderWidth: 1,
  },
  buttonText: { color: '#fff', fontSize: 16, fontFamily: 'Philosopher-Bold' },
  buttonOutLineText: {
    color: 'red',
    fontSize: 16,
    fontFamily: 'Philosopher-Bold',
  },
  user: {
    resizeMode: 'contain',
    height: HEIGHT * 0.08,
    width: '100%',
    marginBottom: 10,
  },
  btnstyle2: {
    marginTop: 5,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF0000',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
  },
  btntext2: {
    color: '#FF0000',
    fontSize: 15,
  },
  image: {
    width: 20,
    height: 20,
  },
})
