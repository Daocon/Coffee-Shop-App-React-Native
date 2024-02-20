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
  FlatList,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ConfirmPay from '../../constants/ConfirmPay';

const CartScreen = ({route}) => {
  const {cartItems} = route.params ?? {cartItems: []};
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const navigation = useNavigation();
  console.log(totalPrice);
  // console.log(cartItems);
  console.log('So luong:' + quantity);

  const handlePay = () => {
    setConfirmationVisible(true);
  };

  const onCancelPayment = () => {
    setConfirmationVisible(false);
  };

  const onConfirmPayment = () => {
    // Combine cartItems and totalPrice
    const paymentData = {
      dataCartItems: cartItems,
      totalAmount: totalPrice,
      quantityBuy: quantity,
    };
    console.log(cartItems);
    // Navigate to PaymentScreen with paymentData
    navigation.navigate('PaymentScreen', paymentData);

    // Hide the confirmation modal
    setConfirmationVisible(false);
  };

  const calculateTotalPrice = () => {
    let total = 0;
    cartItems.forEach(item => {
      // console.log(item.coffeeData.price + '---' + quantity);
      total += item.coffeeData.price * quantity;
    });
    setTotalPrice(total);
    console.log('total:' + total);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [quantity, cartItems]);

  const handleQuantityChange = newQuantity => {
    setQuantity(newQuantity);
  };

  const pressToSetting = () => {
    navigation.navigate('SettingScreen');
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
            <Image
              source={require('../../../assets/images/Vector.png')}></Image>
          </TouchableOpacity>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Poppins-Regular',
              fontSize: 20,
              lineHeight: 36,
              fontWeight: '600',
            }}>
            Cart
          </Text>
          <TouchableOpacity>
            <Image
              style={styles.profileImage}
              source={{
                uri: 'https://avatars.githubusercontent.com/u/69995920?s=280&v=4',
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          {cartItems.length > 0 ? (
            <>
              <FlatList
                data={cartItems}
                keyExtractor={item => item.coffeeData.id.toString()}
                renderItem={({item}) => (
                  <View
                    style={{
                      backgroundColor: '#061530',
                      width: 330,
                      height: 154,
                      borderRadius: 23,
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 10,
                    }}>
                    <Image
                      style={{width: 126, height: 126, borderRadius: 23}}
                      source={{uri: item.coffeeData.image}}
                    />
                    <View style={{height: 126, flex: 1, marginLeft: 13}}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          color: 'white',
                          fontSize: 15,
                          fontWeight: '400',
                          lineHeight: 20,
                        }}>
                        {item.coffeeData.name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          color: '#AEAEAE',
                          fontSize: 12,
                          fontWeight: '400',
                          lineHeight: 20,
                        }}>
                        From Africa
                      </Text>
                      <View
                        style={{
                          marginTop: 10,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            width: 72,
                            height: 35,
                            backgroundColor: '#0C0F14',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            marginRight: 20,
                          }}>
                          <Text
                            style={{
                              fontFamily: 'Poppins-Regular',
                              color: '#AEAEAE',
                              fontSize: 12,
                              fontWeight: 'bold',
                            }}>
                            {item.selectedSize}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              color: '#D17842',
                              fontSize: 20,
                              fontWeight: 'bold',
                              fontFamily: 'Poppins-Regular',
                              lineHeight: 20,
                            }}>
                            $
                            <Text
                              style={{
                                color: 'white',
                                fontFamily: 'Poppins-Regular',
                                fontSize: 20,
                                fontWeight: 'bold',
                              }}>
                              {`${item.coffeeData.price}`}
                            </Text>
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 10,
                          backgroundColor: '',
                        }}>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => handleQuantityChange(quantity - 1)}
                          disabled={quantity === 1}>
                          <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <View
                          style={{
                            width: 50,
                            height: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#0C0F14',
                            borderRadius: 10,
                            marginHorizontal: 10,
                            borderColor: '#D17842',
                            borderWidth: 1.5,
                          }}>
                          <Text style={styles.quantityText}>{quantity}</Text>
                        </View>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => handleQuantityChange(quantity + 1)}>
                          <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              />
              <View
                style={{
                  marginTop: 400,
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
                    ${totalPrice.toFixed(2)}{' '}
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
                  onPress={() => handlePay()}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Poppins-Regular',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    Pay
                  </Text>
                </TouchableOpacity>
                <ConfirmPay
                  isVisible={isConfirmationVisible}
                  onCancel={onCancelPayment}
                  onConfirm={onConfirmPayment}
                  amount={totalPrice}
                />
              </View>
            </>
          ) : (
            <View
              style={{
                marginTop: 100,
                alignItems: 'center',
              }}>
              <Image
                source={require('../../../assets/images/coca.png')}
                style={{width: 100, height: 100}}
              />
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: '#AEAEAE',
                  fontSize: 12,
                  fontWeight: 'bold',
                  lineHeight: 20,
                  marginTop: 20,
                }}>
                Please choose something...
              </Text>
            </View>
          )}
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
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D17842',
    borderRadius: 10,
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityText: {
    color: 'white',
    fontSize: 16,
    marginHorizontal: 10,
  },
});

export default CartScreen;
