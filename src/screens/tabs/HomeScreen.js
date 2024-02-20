import React, {useState, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  FlatList,
} from 'react-native';

const HomeScreen = ({navigation}) => {
  const [dataTypesCoffee, setDataTypesCoffee] = useState([]);
  const [dataCoffee, setDataCoffee] = useState([]);
  const [dataBeansCoffee, setDataBeansCoffee] = useState([]);
  const [selectedCoffeeType, setSelectedCoffeeType] = useState('all');

  const pressToSetting = () => {
    navigation.navigate('SettingScreen');
  };

  const navigateToDetail = item => {
    navigation.navigate('DetailScreen', {coffeeData: item});
    console.log(item);
  };

  useEffect(() => {
    fetchData();
    fetchDataCoffee('all');
    fetchDataBeans();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.0.101:3000/coffeeTypes');
      const json = await response.json();
      setDataTypesCoffee(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchDataCoffee = async coffeeType => {
    try {
      const baseUrl = 'http://192.168.0.101:3000';
      const detailUrl =
        coffeeType === 'all'
          ? `${baseUrl}/${coffeeType}`
          : `${baseUrl}/all/?types=${coffeeType}`;
      const response = await fetch(detailUrl);
      const json = await response.json();
      setDataCoffee(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchDataBeans = async () => {
    try {
      const response = await fetch('http://192.168.0.101:3000/beans');
      const json = await response.json();
      setDataBeansCoffee(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[
        styles.coffeeTypeButton,
        selectedCoffeeType === item.id && styles.selectedCoffeeType,
      ]}
      onPress={() => {
        setSelectedCoffeeType(item.id);
        console.log('Selected Coffee Type:', item.id);
        fetchDataCoffee(item.id);
      }}>
      <Text
        style={[
          styles.coffeeTypeButtonText,
          selectedCoffeeType === item.id && styles.selectedCoffeeTypeText,
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  const renderCoffeeItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigateToDetail(item)}
      style={styles.coffeeItemContainer}>
      <Image style={styles.coffeeItemImage} source={{uri: item.image}} />
      <View
        style={{
          width: 53,
          height: 22,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderBottomLeftRadius: 26,
          borderTopRightRadius: 10,
          position: 'absolute',
          top: 12,
          right: 11,
        }}>
        <Image
          style={{width: 10, height: 10}}
          tintColor="#D17842"
          source={require('../../../assets/images/star.png')}
        />
        <Text
          style={{
            fontWeight: 'bold',
            fontFamily: 'Poppins-Regular',
            color: 'white',
            marginStart: 5,
            fontSize: 10,
          }}>
          {item.star}
        </Text>
      </View>
      <Text style={styles.coffeeItemName}>{item.name}</Text>
      <Text style={styles.coffeeItemDescription}>{item.description}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 7,
        }}>
        <Text
          style={{
            width: 53,
            height: 25,
            color: '#D17842',
            fontSize: 16,
            fontWeight: 'bold',
            fontFamily: 'Poppins-Regular',
            lineHeight: 20,
          }}>
          $<Text style={styles.coffeeItemPrice}>{`${item.price}`}</Text>
        </Text>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => navigateToDetail(item)}>
          <Image
            style={{width: 8, height: 8}}
            source={require('../../../assets/images/plus.png')}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
          <TouchableOpacity>
            <Image
              style={styles.profileImage}
              source={require('../../../assets/images/hat.jpg')}></Image>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Find the best coffee for you</Text>
        </View>

        {/* Search bar */}
        <View style={styles.searchContainer}>
          <Image
            style={styles.searchIcon}
            source={require('../../../assets/images/look.png')}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Find Your Coffee..."
            placeholderTextColor="#828282"
            keyboardType="search"
          />
        </View>

        {/* Coffee Types */}
        <FlatList
          data={dataTypesCoffee}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          style={{marginStart: 30, marginTop: 20}}
        />
        {/* Selected Coffees */}
        <FlatList
          data={dataCoffee}
          renderItem={renderCoffeeItem}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          style={{marginTop: 15, marginStart: 30}}
        />
        {/* Selected beens */}
        <View style={{marginStart: 30, marginTop: 20}}>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              color: 'white',
              fontSize: 16,
              fontWeight: '700',
              lineHeight: 36,
            }}>
            Coffee beans
          </Text>
        </View>
        <FlatList
          data={dataBeansCoffee}
          renderItem={renderCoffeeItem}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          style={{marginStart: 30, marginTop: 20}}
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
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  titleContainer: {
    width: 195,
    height: 72,
    marginStart: 30,
    marginTop: 30,
  },
  title: {
    fontFamily: 'Poppins-Regular',
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#141921',
    borderRadius: 15,
    width: 330,
    height: 45,
    marginStart: 30,
    alignItems: 'center',
    marginTop: 30,
  },
  searchIcon: {
    marginHorizontal: 20,
  },
  searchInput: {
    color: 'white',
    flex: 1,
    fontSize: 16,
  },
  coffeeTypeButton: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    marginEnd: 10,
  },
  coffeeTypeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  selectedCoffeeType: {
    backgroundColor: 'white',
  },
  selectedCoffeeTypeText: {
    color: '#0C0F14',
  },
  coffeeItemContainer: {
    width: 150,
    height: 245,
    marginEnd: 30,
    padding: 12,
    borderRadius: 23,
    backgroundColor: '#0C0F14',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
  },
  coffeeItemImage: {
    width: 125,
    height: 125,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  coffeeItemName: {
    width: 92,
    height: 23,
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    fontFamily: 'Poppins-Regular',
  },
  coffeeItemDescription: {
    width: 130,
    height: 20,
    color: 'white',
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 20,
    fontFamily: 'Poppins-Regular',
  },
  coffeeItemPrice: {
    color: 'white',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    fontWeight: 'bold',
    width: 53,
    height: 25,
  },
  addToCartButton: {
    backgroundColor: '#D17842',
    borderRadius: 7,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
