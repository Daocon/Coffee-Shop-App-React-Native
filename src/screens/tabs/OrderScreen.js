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
  FlatList,
  View,
} from 'react-native';

const OrderScreen = ({navigation}) => {
  const [billData, setBillData] = useState([]);

  // console.log(billData);
  const pressToSetting = () => {
    navigation.navigate('SettingScreen');
  };

  useEffect(() => {
    fetch('http://192.168.0.101:3000/billOrders')
      .then(response => response.json())
      .then(data => setBillData(data))
      .catch(error => console.error('Error fetching bill data:', error));
  }, []);

  const renderBillItem = ({item}) => (
    <View style={styles.billItemContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderWidth: 1,
          borderBottomColor: 'gray',
          borderTopColor: 'transparent',
          borderRightColor: 'transparent',
          borderLeftColor: 'transparent',
          height: 30,
        }}>
        <Text style={styles.itemText}>{item.completionTime}</Text>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            color: 'white',
            fontSize: 15,
            fontWeight: '400',
            lineHeight: 20,
          }}>
          Method: {item.paymentMethod}
        </Text>
      </View>
      <View style={styles.cartItemContainer}>
        {item.dataCartItems.map(cartItem => (
          <View key={cartItem.coffeeData.id} style={styles.cartItem}>
            <Image
              style={styles.itemImage}
              source={{uri: cartItem.coffeeData.image}}
            />
            <View style={styles.itemDetails}>
              <Text style={styles.itemText}>{cartItem.coffeeData.name}</Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: '#D17842',
                  fontSize: 12,
                  fontWeight: '400',
                  lineHeight: 20,
                }}>
                Size: {cartItem.selectedSize}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingRight: 20,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: '#D17842',
                    fontSize: 12,
                    fontWeight: '400',
                    lineHeight: 20,
                  }}>
                  Quantity Buy: {item.quantityBuy}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: '#D17842',
                    fontSize: 15,
                    fontWeight: '700',
                    lineHeight: 20,
                  }}>
                  $
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: 'white',
                      fontSize: 15,
                      fontWeight: '700',
                      lineHeight: 20,
                    }}>
                    {item.totalAmount.toFixed(2)}
                  </Text>
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: '#D17842',
                  fontSize: 12,
                  fontWeight: '400',
                  lineHeight: 20,
                }}>
                Price: ${cartItem.coffeeData.price.toFixed(2)}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

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
            History Bill
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

        <View>
          {billData.length > 0 ? (
            <>
              <FlatList
                data={billData}
                keyExtractor={item => item.id.toString()}
                renderItem={renderBillItem}
              />
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
  billItemContainer: {
    backgroundColor: '#061530',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    marginTop: 20,
  },
  itemText: {
    fontFamily: 'Poppins-Regular',
    color: 'white',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 20,
  },
  cartItemContainer: {
    marginTop: 10,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  itemDetails: {
    marginLeft: 10,
    flex: 1,
  },
});

export default OrderScreen;
