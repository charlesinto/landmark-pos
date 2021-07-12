import React, { useState } from "react";
import {
  View,
  Platform,
  SafeAreaView,
  StatusBar,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from "react-native";
import TextField from "../../components/TextField";
import TitleText from "../../components/TitleText";
import Button from "../../components/Button";
import helpers from "../../helpers";
import http_service from "../../http_service";
import { Colors } from "../../util/Colors";
// import { Colors } from "react-native/Libraries/NewAppScreen";

const backgroundImage = require("../../../assets/images/bg2.jpg");
const splishPay = require("../../../assets/images/splishpay.png");

const Banner: React.FC<any> = () => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={backgroundImage} style={styles.image}>
        <Image
          source={splishPay}
          resizeMode="contain"
          style={styles.splishPayIcon}
        />
      </ImageBackground>
    </View>
  );
};

interface Props {
  navigation: any;
}

const Login: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleLoginPress = async () => {
    try {
      if (email.trim() === "" || password.trim() === "") {
        return helpers.dispayMessage({
          message: "Validation failed",
          icon: "info",
          type: "info",
          description: "Please provide email address and password",
        });
      }
      setIsLoading(true);
      const response: any = await http_service.login({
        emailAddress: email,
        password,
      });
      await helpers.setItem("xxx-token", email);
      await helpers.setItem("xxx-user", email);
      setIsLoading(false);
      navigation.navigate("appHome");
    } catch (error) {
      setIsLoading(false);
      helpers.catchHttpError(error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar
        backgroundColor={Colors.WHITE}
        barStyle={Platform.OS === "ios" ? "dark-content" : "dark-content"}
      />
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ marginHorizontal: 24, marginTop: 20 }}>
          <TitleText text="Log In" styles={{ textAlign: "center" }} />
        </View>
        <View
          style={{
            marginHorizontal: 24,
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <TextField
            color="#808080"
            iconName="mail-outline"
            labelName="Email"
            onChange={(text) => setEmail(text)}
            value={email}
          />
          <TextField
            color="#808080"
            iconName="lock-closed-outline"
            labelName="Password"
            obscureText
            onChange={(text) => setPassword(text)}
            value={password}
          />
          <View style={{ marginTop: 40 }}>
            <View style={[styles.buttonContainer, { height: 50 }]}>
              <Button
                isLoading={isLoading}
                text="Log In"
                onPress={handleLoginPress}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  splishPayIcon: {
    width: 180,
    resizeMode: "contain",
    height: 180,
  },
  buttonContainer: {
    height: 40,
    width: "100%",
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 30,
    left: 16,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Login;
