import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import ConfirmationModal from '../constants/ConfirmationModal';
import {CommonActions} from '@react-navigation/native';

const SettingScreen = ({navigation}) => {
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);

  const pressToBack = () => {
    navigation.goBack();
  };

  const handlePressToDetail = () => {
    navigation.navigate('PersonScreen');
  };

  const handleLogout = () => {
    setConfirmationVisible(true);
  };

  const handleCancelLogout = () => {
    setConfirmationVisible(false);
  };

  const handleConfirmLogout = () => {
    setConfirmationVisible(false);
    navigation.navigate('Login');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Login'}],
      }),
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <StatusBar
          backgroundColor={'#0C0F14'}
          barStyle="light-content"></StatusBar>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.button} onPress={pressToBack}>
            <Image source={require('../../assets/images/back.png')}></Image>
          </TouchableOpacity>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Poppins-Regular',
              fontSize: 20,
              lineHeight: 36,
              fontWeight: '600',
            }}>
            SettingScreen
          </Text>
          <View></View>
        </View>

        <View
          style={{
            flex: 1,
            marginHorizontal: 20,
            // backgroundColor: 'white',
            marginTop: 30,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 50,
              borderBottomColor: 'gray',
              borderWidth: 1,
              marginBottom: 10,
            }}>
            <View
              style={{
                width: 25,
                height: 25,
                backgroundColor: '#D17842',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                marginRight: 40,
              }}>
              <Image
                style={{width: 15, height: 15}}
                tintColor="white"
                source={require('../../assets/images/time.png')}></Image>
            </View>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Poppins-Regular',
                fontSize: 16,
                lineHeight: 24,
                fontWeight: '700',
              }}>
              History
            </Text>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Image
                style={{width: 10, height: 18}}
                source={require('../../assets/images/arrowright.png')}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 50,
              borderBottomColor: 'gray',
              borderWidth: 1,
              marginBottom: 10,
            }}
            onPress={handlePressToDetail}>
            <View
              style={{
                width: 25,
                height: 25,
                backgroundColor: '#D17842',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                marginRight: 40,
              }}>
              <Image
                style={{width: 15, height: 15}}
                tintColor="white"
                source={require('../../assets/images/person.png')}></Image>
            </View>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Poppins-Regular',
                fontSize: 16,
                lineHeight: 24,
                fontWeight: '700',
              }}>
              Personal Details
            </Text>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Image
                style={{width: 10, height: 18}}
                source={require('../../assets/images/arrowright.png')}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 50,
              borderBottomColor: 'gray',
              borderWidth: 1,
              marginBottom: 10,
            }}>
            <View
              style={{
                width: 25,
                height: 25,
                backgroundColor: '#D17842',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                marginRight: 40,
              }}>
              <Image
                style={{width: 13, height: 15}}
                tintColor="white"
                source={require('../../assets/images/location.png')}></Image>
            </View>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Poppins-Regular',
                fontSize: 16,
                lineHeight: 24,
                fontWeight: '700',
              }}>
              Address
            </Text>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Image
                style={{width: 10, height: 18}}
                source={require('../../assets/images/arrowright.png')}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 50,
              borderBottomColor: 'gray',
              borderWidth: 1,
              marginBottom: 10,
            }}>
            <View
              style={{
                width: 25,
                height: 25,
                backgroundColor: '#D17842',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                marginRight: 40,
              }}>
              <Image
                style={{width: 15, height: 15}}
                tintColor="white"
                source={require('../../assets/images/payment.png')}></Image>
            </View>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Poppins-Regular',
                fontSize: 16,
                lineHeight: 24,
                fontWeight: '700',
              }}>
              Payment Method
            </Text>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Image
                style={{width: 10, height: 18}}
                source={require('../../assets/images/arrowright.png')}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 50,
              borderBottomColor: 'gray',
              borderWidth: 1,
              marginBottom: 10,
            }}>
            <View
              style={{
                width: 25,
                height: 25,
                backgroundColor: '#D17842',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                marginRight: 40,
              }}>
              <Image
                style={{width: 15, height: 15}}
                tintColor="white"
                source={require('../../assets/images/about.png')}></Image>
            </View>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Poppins-Regular',
                fontSize: 16,
                lineHeight: 24,
                fontWeight: '700',
              }}>
              About
            </Text>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Image
                style={{width: 10, height: 18}}
                source={require('../../assets/images/arrowright.png')}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 50,
              borderBottomColor: 'gray',
              borderWidth: 1,
              marginBottom: 10,
            }}>
            <View
              style={{
                width: 25,
                height: 25,
                backgroundColor: '#D17842',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                marginRight: 40,
              }}>
              <Image
                style={{width: 15, height: 15}}
                tintColor="white"
                source={require('../../assets/images/help.png')}></Image>
            </View>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Poppins-Regular',
                fontSize: 16,
                lineHeight: 24,
                fontWeight: '700',
              }}>
              Help
            </Text>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Image
                style={{width: 10, height: 18}}
                source={require('../../assets/images/arrowright.png')}></Image>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 50,
              borderBottomColor: 'gray',
            }}
            onPress={handleLogout}>
            <View
              style={{
                width: 25,
                height: 25,
                backgroundColor: '#D17842',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                marginRight: 40,
              }}>
              <Image
                style={{width: 15, height: 15}}
                tintColor="white"
                source={require('../../assets/images/logout.png')}></Image>
            </View>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Poppins-Regular',
                fontSize: 16,
                lineHeight: 24,
                fontWeight: '700',
              }}>
              Log out
            </Text>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <Image
                style={{width: 10, height: 18}}
                source={require('../../assets/images/arrowright.png')}></Image>
            </View>
          </TouchableOpacity>
          {/* Hiển thị hộp thoại xác nhận khi cần */}
          <ConfirmationModal
            isVisible={isConfirmationVisible}
            onCancel={handleCancelLogout}
            onConfirm={handleConfirmLogout}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0F14',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
  button: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#21262E',
    borderRadius: 10,
    borderWidth: 1,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export default SettingScreen;
