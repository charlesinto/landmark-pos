import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {StatusIOSBar} from '.';
import Header from '../../components/Header';
import {Colors} from '../../util/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IProps {
  navigation: any;
}

const Customer: React.FC<IProps> = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.WHITE}}>
      <StatusIOSBar backgroundColor={Colors.WHITE} barStyle={'dark-content'} />
      <SafeAreaView style={{flex: 1, paddingHorizontal: 16}}>
        <StatusBar backgroundColor={Colors.WHITE} barStyle={'dark-content'} />
        <Header
          title="Customers"
          leftIcon={<Ionicons name="chevron-back-outline" size={32} />}
          leftIconOnPress={() => navigation.goBack()}
          rightIcon={<Ionicons name="add-outline" size={32} />}
          rightIconOnPress={() => {}}
        />
      </SafeAreaView>
    </View>
  );
};

export default Customer;
