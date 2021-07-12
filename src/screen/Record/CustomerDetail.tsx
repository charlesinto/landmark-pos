import React, { useState } from "react";
import { SafeAreaView, ScrollView, StatusBar } from "react-native";
import Header from "../../components/Header";
import { Colors } from "../../util/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  TextInput,
} from "react-native-paper";
import helpers from "../../helpers";

interface IProps {
  navigation: any;
}

const CustomerDetail: React.FC<IProps> = ({ navigation }) => {
  const [pin, setPin] = useState("");
  const handlePayment = () => {
    if (pin.length !== 4) {
      return helpers.dispayMessage({
        message: "PIN is Invalid",
        description: "Please enter a 4-digit PIN",
        icon: "info",
        type: "info",
      });
    }

    helpers.dispayMessage({
      message: "Payment Success",
      description: "Payment is successful",
      icon: "success",
      type: "success",
    });

    navigation.goBack();
  };
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 16 }}>
      <StatusBar backgroundColor={Colors.WHITE} barStyle="dark-content" />
      <Header
        leftIconOnPress={() => navigation.goBack()}
        leftIcon={<Ionicons name="chevron-back-outline" size={32} />}
        title="Process Payment"
      />
      <ScrollView style={{ flex: 1, paddingVertical: 20 }}>
        <Card>
          <Card.Title title="Customer Name" subtitle="Charles Onuorah" />
          <Card.Content>
            <Title>Customer Account Number</Title>
            <Paragraph>002351891***</Paragraph>
          </Card.Content>
          <Card.Content style={{ paddingTop: 20, paddingBottom: 10 }}>
            <TextInput
              label="PIN"
              secureTextEntry
              onChangeText={(text) => setPin(text)}
              right={<TextInput.Icon name="eye" />}
            />
          </Card.Content>
          <Card.Actions style={{ paddingTop: 10 }}>
            <Button mode="contained" onPress={handlePayment}>
              Pay Now
            </Button>
            <Button color="red" onPress={() => navigation.goBack()}>
              Cancel
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomerDetail;
