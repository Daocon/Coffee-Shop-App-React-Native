import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const ConfirmPay = ({isVisible, onCancel, onConfirm, amount}) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={onCancel}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            Bạn có chắc chắn muốn thanh toán ${amount} không?
          </Text>
          <View style={{flexDirection: 'row', width: '100%'}}>
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 5,
                backgroundColor: '#D17842',
                marginHorizontal: 10,
              }}
              onPress={onCancel}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Exit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 5,
                backgroundColor: 'green',
                marginHorizontal: 10,
              }}
              onPress={onConfirm}>
              <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                Pay
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {},
  button: {},
  buttonText: {},
});

export default ConfirmPay;
