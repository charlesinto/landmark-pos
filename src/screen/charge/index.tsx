import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  Platform,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';
import TitleText from '../../components/TitleText';

const bankIcon = require('../../../assets/images/bank.png');
const hardwareIcon = require('../../../assets/images/hardware.png');
const cashIcon = require('../../../assets/images/cash.png');

const connectBg = require('../../../assets/images/connect.png');

enum PaymentMethod {
  BANK_TRANSFER = 'BANK_TRANSFER',
  CASH = 'CASH',
  HARDWARE = 'HARDWARE',
}

interface Props {
  navigation: any;
}

interface PaymentRowProps {
  onDropdownItemPressed: (paymentMethod: PaymentMethod) => void;
  onMenuItemPressed: () => void;
  showDropDownMenu: boolean;
  selectedPaymentMethod: PaymentMethod;
}

interface getPaymentMethodProps {
  paymentMethod: PaymentMethod;
}

const getPaymentMethod = (
  paymentMethod: PaymentMethod,
  onMenuItemPressed: () => void,
) => {
  switch (paymentMethod) {
    case PaymentMethod.BANK_TRANSFER:
      return (
        <TouchableOpacity style={styles.paymentRow} onPress={onMenuItemPressed}>
          <Image
            source={bankIcon}
            style={{width: 16, height: 16}}
            resizeMethod="auto"
            resizeMode="contain"
          />
          <View style={{flex: 1}}>
            <Text style={{paddingLeft: 16}}>Bank Transfer</Text>
          </View>
          <Ionicons name="chevron-down-outline" size={24} />
        </TouchableOpacity>
      );
    case PaymentMethod.CASH:
      return (
        <TouchableOpacity style={styles.paymentRow} onPress={onMenuItemPressed}>
          <Image
            source={cashIcon}
            style={{width: 16, height: 16}}
            resizeMethod="auto"
            resizeMode="contain"
          />
          <View style={{flex: 1}}>
            <Text style={{paddingLeft: 16}}>Cash</Text>
          </View>
          <Ionicons name="chevron-down-outline" size={24} />
        </TouchableOpacity>
      );
    case PaymentMethod.HARDWARE:
      return (
        <TouchableOpacity style={styles.paymentRow} onPress={onMenuItemPressed}>
          <Image
            source={hardwareIcon}
            style={{width: 16, height: 16}}
            resizeMethod="auto"
            resizeMode="contain"
          />
          <View style={{flex: 1}}>
            <Text style={{paddingLeft: 16}}>Connect Hardware</Text>
          </View>
          <Ionicons name="chevron-down-outline" size={24} />
        </TouchableOpacity>
      );
    default:
      return <View></View>;
  }
};

const PaymentRow: React.FC<PaymentRowProps> = ({
  showDropDownMenu,
  selectedPaymentMethod,
  onMenuItemPressed,
  onDropdownItemPressed,
}) => {
  return (
    <View>
      {getPaymentMethod(selectedPaymentMethod, onMenuItemPressed)}

      {showDropDownMenu && (
        <DropDown
          selectedPayemntMethod={selectedPaymentMethod}
          onDropdownItemPressed={onDropdownItemPressed}
        />
      )}
    </View>
  );
};

interface DropDownProps {
  selectedPayemntMethod: PaymentMethod;
  onDropdownItemPressed: (text: PaymentMethod) => void;
}

const DropDown: React.FC<DropDownProps> = ({
  onDropdownItemPressed,
  selectedPayemntMethod,
}) => {
  return (
    <View style={styles.dropDownContainer}>
      <TouchableWithoutFeedback
        onPress={e => onDropdownItemPressed(PaymentMethod.HARDWARE)}>
        <View style={styles.dropDownWrapper}>
          <Image
            source={hardwareIcon}
            style={{width: 16, height: 16}}
            resizeMethod="auto"
            resizeMode="contain"
          />
          <View style={{flex: 1}}>
            <Text style={{paddingLeft: 16}}>Connect Hardware</Text>
          </View>
          {selectedPayemntMethod === PaymentMethod.HARDWARE && (
            <Ionicons name="checkmark-outline" size={24} color="#51a3f7" />
          )}
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={e => onDropdownItemPressed(PaymentMethod.CASH)}>
        <View style={styles.dropDownWrapper}>
          <Image
            source={cashIcon}
            style={{width: 16, height: 16}}
            resizeMethod="auto"
            resizeMode="contain"
          />
          <View style={{flex: 1}}>
            <Text style={{paddingLeft: 16}}>Cash</Text>
          </View>
          {selectedPayemntMethod === PaymentMethod.CASH && (
            <Ionicons name="checkmark-outline" size={24} color="#51a3f7" />
          )}
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={e => onDropdownItemPressed(PaymentMethod.BANK_TRANSFER)}>
        <View style={styles.dropDownWrapper}>
          <Image
            source={bankIcon}
            style={{width: 16, height: 16}}
            resizeMethod="auto"
            resizeMode="contain"
          />
          <View style={{flex: 1}}>
            <Text style={{paddingLeft: 16}}>Bank Transfer</Text>
          </View>
          {selectedPayemntMethod === PaymentMethod.BANK_TRANSFER && (
            <Ionicons name="checkmark-outline" size={24} color="#51a3f7" />
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const Charge: React.FC<Props> = ({navigation}) => {
  const [selectedPaymentMethod, onPaymentChange] = useState<PaymentMethod>(
    PaymentMethod.BANK_TRANSFER,
  );
  const [showMenutItems, onShowMenuItems] = useState(false);
  const handleChargeOnPress = () => {
    switch (selectedPaymentMethod) {
      case PaymentMethod.CASH:
        navigation.navigate('cashSuccess');
      case PaymentMethod.BANK_TRANSFER:
        navigation.navigate('bankSuccess');
        break;
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar
        backgroundColor="#fff"
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={32} />
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <Text style={styles.headerText}>Record Transaction</Text>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={{marginBottom: 10, alignItems: 'center'}}>
            <Ionicons name="person-circle-outline" size={48} />
          </View>
          <View style={{marginBottom: 10, alignItems: 'center'}}>
            <TitleText text="Luxury Fit Nig" />
            <Text style={{color: '#808080'}}>Admin</Text>
          </View>
          <View
            style={{
              marginBottom: 10,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#808080'}}>Transaction On </Text>
            <Text style={{fontFamily: 'SFUIText-Regular'}}>NOV 9th 2020</Text>
          </View>
          <View
            style={{
              marginBottom: 10,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#808080'}}>Note </Text>
            <Text style={{fontFamily: 'SFUIText-Regular'}}>Phone</Text>
          </View>
          <View
            style={{
              marginBottom: 10,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'SFUIText-Regular',
                color: '#1479f6',
                fontSize: 24,
              }}>
              2,500
            </Text>
          </View>
          {getConnectStatus(selectedPaymentMethod)}
        </View>
      </View>
      <View style={styles.lowerBanner}>
        <View style={styles.paymentMethodTextContainer}>
          <Text style={styles.paymentMethodText}>Payment Method</Text>
        </View>
        <View>
          <View>
            <PaymentRow
              selectedPaymentMethod={selectedPaymentMethod}
              onMenuItemPressed={() => onShowMenuItems(state => !state)}
              showDropDownMenu={showMenutItems}
              onDropdownItemPressed={method => {
                onShowMenuItems(false);
                onPaymentChange(method);
              }}
            />
            <View style={{height: 40, marginVertical: 16}}>
              <Button
                backgroundColor={
                  selectedPaymentMethod === PaymentMethod.HARDWARE
                    ? '#808080'
                    : '#0F0F0F'
                }
                text={
                  selectedPaymentMethod === PaymentMethod.HARDWARE
                    ? 'Charge'
                    : 'Confirm'
                }
                onPress={handleChargeOnPress}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const getConnectStatus = (paymentMethod: PaymentMethod) => {
  switch (paymentMethod) {
    case PaymentMethod.BANK_TRANSFER:
      return (
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: '#f8f2f3',
              width: 180,
              height: 40,
              borderRadius: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#3b2280', fontFamily: 'SFUIText-Regular'}}>
              Bank Tranfer
            </Text>
          </View>
        </View>
      );
    case PaymentMethod.CASH:
      return (
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: '#f2fdf2',
              width: 180,
              height: 40,
              borderRadius: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#65a062', fontFamily: 'SFUIText-Regular'}}>
              Cash
            </Text>
          </View>
        </View>
      );
    case PaymentMethod.HARDWARE:
      return (
        <View style={{alignItems: 'center'}}>
          <ImageBackground
            source={connectBg}
            resizeMethod="auto"
            resizeMode="contain"
            style={{width: 180, height: 40}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}>
              <Text>Connect Hardware</Text>
            </View>
          </ImageBackground>
        </View>
      );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
  },
  headerText: {
    textAlign: 'center',
    fontFamily: 'SFUIText-Regular',

    fontSize: 24,
  },
  lowerBanner: {
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#f2f2f2',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  paymentMethodTextContainer: {
    marginBottom: 20,
  },
  paymentMethodText: {
    color: '#808080',
    fontFamily: 'SFUIText-Regular',
    fontSize: 18,
  },
  paymentRow: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  dropDownContainer: {
    position: 'absolute',
    top: -115,
    left: 0,
    width: '100%',
  },
  dropDownWrapper: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default Charge;
