import React from 'react';
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

const PersonScreen = ({navigation}) => {
  const pressToBack = () => {
    navigation.goBack();
  };

  const handlePressToDetail = () => {};

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
            PersonScreen
          </Text>
          <View></View>
        </View>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Image
            style={{width: 153, height: 153, borderRadius: 10}}
            source={require('../../assets/images/hat.jpg')}></Image>
        </View>
        <View
          style={{
            flex: 1,
            marginHorizontal: 20,
            marginTop: 30,
            borderWidth: 1,
            borderColor: '#252A32',
            width: 342,
            height: 48,
            justifyContent: 'center',
            paddingLeft: 20,
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Poppins-Regular',
              fontSize: 16,
              fontWeight: '500',
            }}>
            Ha Van Dao
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            marginHorizontal: 20,
            marginTop: 10,
            borderWidth: 1,
            borderColor: '#252A32',
            width: 342,
            height: 48,
            justifyContent: 'center',
            paddingLeft: 20,
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Poppins-Regular',
              fontSize: 16,
              fontWeight: '500',
            }}>
            hadao1204@gmail.com
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            marginHorizontal: 20,
            marginTop: 10,
            borderWidth: 1,
            borderColor: '#252A32',
            width: 342,
            height: 48,
            justifyContent: 'center',
            paddingLeft: 20,
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Poppins-Regular',
              fontSize: 16,
              fontWeight: '500',
            }}>
            0972189694
          </Text>
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

export default PersonScreen;
