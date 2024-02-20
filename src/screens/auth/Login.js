import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Icon,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleTextPressRegister = () => {
    console.log('Register');
    navigation.navigate('Register');
  };

  const handleTextPressReset = () => {
    console.log('Reset');
  };

  const handleSubmit = async () => {
    // Alert.alert('Sai roiii');

    if (email.length == 0) {
      Alert.alert('No email has been entered');
      return;
    }
    if (password.length == 0) {
      Alert.alert('No password has been entered');
      return;
    }
    let url_check_login = 'http://192.168.0.101:3000/login?email=' + email;
    fetch(url_check_login)
      .then(res => res.json())
      .then(async res_login => {
        console.log(res_login.length);
        if (res_login.length != 1) {
          Alert.alert('Account does not exist. Please register');
          return;
        } else {
          let objU = res_login[0];
          if (objU.password != password) {
            Alert.alert('Not correct password!');
            return;
          } else {
            navigation.navigate('HomeScreen');
            // try {
            //   await AsyncStorage.setItem('loginInfor', JSON.stringify(objU));

            // } catch (e) {
            //   // saving error
            //   console.log(e);
            // }
          }
        }
      });
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <StatusBar
          backgroundColor={'#0C0F14'}
          barStyle="light-content"></StatusBar>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../../assets/images/cofee.png')}></Image>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Poppins-Regular.ttf',
              fontSize: 16,
              lineHeight: 26,
              fontWeight: 700,
            }}>
            Welcome to Lungo !!
          </Text>
        </View>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text
            style={{
              color: '#828282',
              fontFamily: 'Poppins-Regular.ttf',
              fontSize: 12,
              lineHeight: 26,
              fontWeight: 700,
            }}>
            Register to Continue
          </Text>
        </View>
        <View style={styles.inputsContainer}>
          <View style={styles.emailInput}>
            <TextInput
              placeholder="Enter your email address"
              placeholderTextColor="#828282"
              secureTextEntry={true}
              inputMode="email"
              value={email}
              onChangeText={setEmail}
              style={styles.textInput}
            />
          </View>
          <View style={styles.passWordInput}>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="#828282"
              secureTextEntry={!showPassword}
              style={styles.textInput}
              value={password}
              onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={{
                position: 'absolute',
                right: 45,
                top: 19,
              }}>
              <Image
                source={
                  showPassword
                    ? require('../../../assets/images/eye.png')
                    : require('../../../assets/images/eyeClose.png')
                }
                style={{width: 20, height: 20}}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.signInButton} onPress={handleSubmit}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.signInWithGGButton}
            onPress={handleSubmit}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 25,
              }}>
              <Image
                source={require('../../../assets/images/google.png')}
                style={styles.googleIcon}
              />
              <Text style={styles.signInWithGGButtonText}>
                Sign in with Google
              </Text>
              <View></View>
            </View>
          </TouchableOpacity> */}
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <View>
            <Text
              style={{
                fontFamily: 'Poppins-Regular.ttf',
                color: '#828282',
                fontSize: 12,
                fontWeight: 700,
                lineHeight: 26,
              }}>
              Don't have an account? Click
            </Text>
          </View>
          <View style={{marginStart: 5}}>
            <TouchableOpacity onPress={handleTextPressRegister}>
              <Text
                style={{
                  color: '#D17842',
                  fontFamily: 'Poppins-Regular.ttf',
                  fontSize: 12,
                  fontWeight: 700,
                  lineHeight: 26,
                }}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <View>
            <Text
              style={{
                fontFamily: 'Poppins-Regular.ttf',
                color: '#828282',
                fontSize: 12,
                fontWeight: 700,
                lineHeight: 26,
              }}>
              Forget Password? Click
            </Text>
          </View>
          <View style={{marginStart: 5}}>
            <TouchableOpacity onPress={handleTextPressReset}>
              <Text
                style={{
                  color: '#D17842',
                  fontFamily: 'Poppins-Regular.ttf',
                  fontSize: 12,
                  fontWeight: 700,
                  lineHeight: 26,
                }}>
                Reset
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#0C0F14',
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
  inputsContainer: {
    paddingStart: 30,
    marginTop: 25,
  },
  emailInput: {},
  passWordInput: {
    marginTop: 10,
  },
  text: {
    fontSize: 15,
    color: '#828282',
  },
  textInput: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#252A32',
    marginBottom: 0,
    height: 48,
    color: '#828282',
    paddingStart: 25,
    marginEnd: 30,
    marginTop: 5,
  },
  signInButton: {
    backgroundColor: '#D17842',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 12,
    height: 57,
    marginEnd: 30,
    marginTop: 40,
  },
  signInButtonText: {
    color: '#ffffff',
    fontFamily: 'Poppins-Regular.ttf',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 26,
  },
  signInWithGGButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 12,
    height: 57,
    marginEnd: 30,
    marginTop: 5,
  },
  signInWithGGButtonText: {
    color: 'black',
    fontFamily: 'Poppins-Regular.ttf',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 26,
  },
  googleIcon: {
    width: 15,
    height: 15,
  },
});

export default Login;
