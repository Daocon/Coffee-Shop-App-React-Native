import React, {useState, useEffect} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import ConfirmSuc from '../constants/ConfirmSuc';

const paymentMethods = [
  {
    id: 'wallet',
    name: 'Wallet',
    image: require('../../assets/images/wallet.png'),
  },
  {
    id: 'googlePay',
    name: 'Google Pay',
    image: require('../../assets/images/ggpay.png'),
  },
  {
    id: 'applePay',
    name: 'Apple Pay',
    image: require('../../assets/images/apple.png'),
  },
  {
    id: 'amazon',
    name: 'Amazon',
    image: require('../../assets/images/amazon.png'),
  },
];

const PaymentScreen = ({route}) => {
  const {totalAmount, dataCartItems, quantityBuy} = route.params;
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0]);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const navigation = useNavigation();

  console.log('Total Amount:', totalAmount);
  // console.log('Cart Items:', dataCartItems);

  // console.log(selectedMethod);
  const handlePayment = async () => {
    const currentTime = new Date();
    const year = currentTime.getFullYear();
    const month = currentTime.getMonth() + 1; // Tháng bắt đầu từ 0, cần cộng thêm 1
    const day = currentTime.getDate();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    console.log(formattedTime);

    const paymentData = {
      dataCartItems: dataCartItems,
      paymentMethod: selectedMethod.name,
      totalAmount: totalAmount,
      quantityBuy: quantityBuy,
      completionTime: formattedTime,
    };

    try {
      const response = await fetch('http://192.168.0.101:3000/billOrders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        console.log('Thanh toán thành công!');
        setIsPaymentSuccessful(true); // Hiển thị modal khi thanh toán thành công
      } else {
        console.error('Lỗi khi thanh toán:', response.status);
      }
    } catch (error) {
      console.error('Lỗi khi thực hiện thanh toán:', error);
    }
  };

  const pressToSetting = () => {
    navigation.goBack();
  };
  const handlePaymentMethodSelect = method => {
    setSelectedMethod(method);
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
          <TouchableOpacity style={styles.button} onPress={pressToSetting}>
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
            PaymentScreen
          </Text>
          <View></View>
        </View>

        <View style={{alignItems: 'center', marginTop: 30}}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Poppins-Regular',
              fontSize: 16,
              lineHeight: 36,
              fontWeight: '600',
            }}>
            Please choose a payment method:
          </Text>
        </View>

        {/* Payment Methods */}
        <View style={styles.paymentMethodsContainer}>
          {paymentMethods.map(method => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethodButton,
                selectedMethod.id === method.id && styles.selectedMethodButton,
              ]}
              onPress={() => handlePaymentMethodSelect(method)}>
              <Image source={method.image} style={styles.paymentMethodImage} />
              <Text style={styles.paymentMethodName}>{method.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Display Payment Details */}
        <View
          style={{
            marginTop: 330,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginEnd: 30,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 100,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: '#AEAEAE',
                fontSize: 12,
                fontWeight: 'bold',
                lineHeight: 20,
              }}>
              Total
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: '#D17842',
                fontSize: 16,
                fontWeight: 'bold',
                fontFamily: 'Poppins-Regular',
                lineHeight: 20,
              }}>
              ${totalAmount}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#D17842',
              borderRadius: 20,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => handlePayment()}>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Poppins-Regular',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Pay from {selectedMethod.name}
            </Text>
          </TouchableOpacity>
        </View>
        <ConfirmSuc
          isVisible={isPaymentSuccessful}
          onClose={() => {
            setIsPaymentSuccessful(false);
            // Chuyển hướng đến màn hình HomeScreen
            navigation.reset({
              index: 0,
              routes: [{name: 'HomeScreen'}],
            });
          }}
        />
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
  paymentMethodsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  paymentMethodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#262B33',
    marginTop: 10,
    height: 50,
  },
  selectedMethodButton: {
    borderColor: '#D17842',
    borderWidth: 2,
    borderRadius: 10,
  },
  paymentMethodImage: {
    width: 21,
    height: 25,
    marginLeft: 10,
    marginRight: 20,
  },
  paymentMethodName: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
  paymentDetailsContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  paymentDetailsText: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
});

export default PaymentScreen;
