import React, { useEffect } from "react";
import { Image, StatusBar, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(()=> {
    const timer = setTimeout(()=> {
      navigation.navigate('Login');
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigation])


  return (
    
    <View style={{flex: 1, backgroundColor:'#0C0F14', alignItems: 'center', justifyContent: 'center'}}>
      <StatusBar
          backgroundColor={'#0C0F14'}
          barStyle="light-content"></StatusBar>
      <Image 
      source={require('../../../assets/images/cofee.png')} 
      style={{width: 189, height: 189}} />
    </View>
  )
}

export default SplashScreen;