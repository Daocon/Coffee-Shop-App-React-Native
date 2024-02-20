import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
  View,
  ImageBackground,
} from 'react-native';

const FavoriteScreen = ({navigation}) => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  // console.log(favoriteItems);
  const fetchAllItems = async () => {
    try {
      const response = await fetch('http://192.168.0.101:3000/all');
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error('Failed to fetch all items. Status:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error fetching all items:', error);
      return null;
    }
  };

  const fetchFavoriteItems = async () => {
    try {
      const allItems = await fetchAllItems();

      if (allItems) {
        const favoriteItems = allItems.filter(item => item.favorites === true);
        setFavoriteItems(favoriteItems);
      }
    } catch (error) {
      console.error('Error fetching favorite items:', error);
    }
  };

  useEffect(() => {
    // Gọi hàm để lấy và lọc dữ liệu
    fetchFavoriteItems();
  }, []);

  const pressToSetting = () => {
    navigation.navigate('SettingScreen');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <StatusBar backgroundColor={'#0C0F14'} barStyle="light-content" />
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.button} onPress={pressToSetting}>
            <Image source={require('../../../assets/images/Vector.png')} />
          </TouchableOpacity>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Poppins-Regular',
              fontSize: 20,
              lineHeight: 36,
              fontWeight: '600',
            }}>
            Favorites
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
        {/* body */}
        <View>
          {favoriteItems.length > 0 ? (
            <>
              <FlatList
                data={favoriteItems}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <View
                    style={{
                      flex: 1,
                      marginHorizontal: 15,
                      alignItems: 'center',
                      marginTop: 40,
                      height: 520,
                    }}>
                    <ImageBackground
                      style={{
                        flex: 7,
                        resizeMode: 'cover',
                        width: 350,
                      }}
                      source={{uri: item.image}}>
                      {/* header */}
                      <View
                        style={{
                          flex: 6,
                          alignItems: 'flex-end',
                          marginTop: 20,
                          marginRight: 20,
                        }}>
                        <TouchableOpacity
                          style={{
                            width: 33,
                            height: 33,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#21262E',
                            borderRadius: 10,
                          }}>
                          <Image
                            style={{width: 18, height: 16}}
                            tintColor="#D17842"
                            source={require('../../../assets/images/favor.png')}
                          />
                        </TouchableOpacity>
                      </View>
                      {/* body */}
                      <View
                        style={{
                          flex: 3,
                          backgroundColor: 'rgba(20, 25, 33, 0.7)',
                          borderTopLeftRadius: 20,
                          borderTopRightRadius: 20,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{marginStart: 22}}>
                          <Text
                            style={{
                              fontFamily: 'Poppins-Regular',
                              color: 'white',
                              fontSize: 18,
                              fontWeight: 'bold',
                              lineHeight: 36,
                              marginTop: 10,
                            }}>
                            {item.name}
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
                              width: 53,
                              height: 22,
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginTop: 15,
                            }}>
                            <Image
                              style={{width: 20, height: 20}}
                              tintColor="#D17842"
                              source={require('../../../assets/images/star.png')}
                            />
                            <Text
                              style={{
                                fontWeight: 'bold',
                                fontFamily: 'Poppins-Regular',
                                color: 'white',
                                marginStart: 5,
                                fontSize: 14,
                              }}>
                              {item.star}
                            </Text>
                          </View>
                        </View>
                        <View style={{marginEnd: 22, alignItems: 'center'}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              height: 50,
                              width: 140,
                              marginTop: 10,
                            }}>
                            <View
                              style={{
                                width: 50,
                                height: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#21262E',
                                borderRadius: 10,
                                marginRight: 20,
                              }}>
                              <Image
                                tintColor="#D17842"
                                style={{width: 27, height: 24}}
                                source={
                                  item.category === 'Coffee'
                                    ? require('../../../assets/images/hatcoffee.png')
                                    : require('../../../assets/images/beanImg.png')
                                }
                              />
                              <Text
                                style={{
                                  fontFamily: 'Poppins-Regular',
                                  color: '#AEAEAE',
                                  fontSize: 10,
                                  fontWeight: '400',
                                  lineHeight: 20,
                                }}>
                                {item.category}
                              </Text>
                            </View>
                            <View
                              style={{
                                width: 50,
                                height: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#21262E',
                                borderRadius: 10,
                              }}>
                              {item.category === 'Coffee' ? (
                                <View
                                  style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <Image
                                    style={{width: 17, height: 20}}
                                    tintColor="#D17842"
                                    source={require('../../../assets/images/water.png')}
                                  />
                                  <Text
                                    style={{
                                      fontFamily: 'Poppins-Regular',
                                      color: '#AEAEAE',
                                      fontSize: 10,
                                      fontWeight: '400',
                                      lineHeight: 20,
                                      marginTop: 4,
                                    }}>
                                    {item.ingredient}
                                  </Text>
                                </View>
                              ) : (
                                <View
                                  style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <Image
                                    tintColor="#D17842"
                                    source={require('../../../assets/images/location.png')}
                                  />
                                  <Text
                                    style={{
                                      fontFamily: 'Poppins-Regular',
                                      color: '#AEAEAE',
                                      fontSize: 12,
                                      fontWeight: '400',
                                      lineHeight: 20,
                                      marginTop: 4,
                                    }}>
                                    {item.location}
                                  </Text>
                                </View>
                              )}
                            </View>
                          </View>
                          <View
                            style={{
                              width: 140,
                              height: 40,
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: '#21262E',
                              borderRadius: 10,
                              marginTop: 10,
                            }}>
                            <Text
                              style={{
                                fontFamily: 'Poppins-Regular',
                                color: '#AEAEAE',
                                fontSize: 12,
                                fontWeight: '400',
                                lineHeight: 20,
                              }}>
                              Medium Roasted
                            </Text>
                          </View>
                        </View>
                      </View>
                    </ImageBackground>
                    {/* footer */}
                    <View
                      style={{
                        flex: 2.5,
                        backgroundColor: '#061530',
                        width: 350,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                        paddingHorizontal: 20,
                      }}>
                      <View>
                        <Text
                          style={{
                            fontFamily: 'Poppins-Regular',
                            color: '#AEAEAE',
                            fontSize: 17,
                            fontWeight: 'bold',
                            lineHeight: 36,
                            marginTop: 10,
                          }}>
                          Description
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Poppins-Regular',
                            color: '#FFFFFF',
                            fontSize: 12,
                            fontWeight: '400',
                            lineHeight: 20,
                            height: 60,
                          }}
                          numberOfLines={3}>
                          {item.description}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
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
});

export default FavoriteScreen;
