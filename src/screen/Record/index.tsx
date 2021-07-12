import { Text } from "native-base";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../../components/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../util/Colors";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { BarCodeScanner } from "expo-barcode-scanner";
import BarcodeMask from "react-native-barcode-mask";
import helpers from "../../helpers";

interface Props {
  navigation: any;
  cart: any;
  getCart: Function;
}

const Record: React.FC<Props> = function ({ navigation, cart, getCart }) {
  const [amount, setAmount] = useState<string[]>([]);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [scanned, setScanned] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    // (async () => {
    //   console.log("called her");
    //   const { status } = await BarCodeScanner.requestPermissionsAsync();
    //   console.log(status);
    //   setHasPermission(true);
    // })();

    setShowScanner(false);

    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    if (status === "granted") {
      setHasPermission(true);
    }
  };

  const handleScanCode = () => {
    setShowScanner(true);
  };

  const handleBarCodeScanned = ({ type, data }: { type: any; data: any }) => {
    setShowScanner(false);
    setScanned(true);
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
    navigation.navigate("CustomerDetail");
  };

  if (hasPermission === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No access to camera</Text>
      </View>
    );
  }
  const handleDelete = () => {
    setAmount((amount) => {
      amount.splice(amount.length - 1, 1);
      return [...amount];
    });
  };
  // const getCartItems = async () => {
  //   try {
  //     await getCart();
  //     setNumberOfItemsInCart(cart.length);
  //   } catch (error) {
  //     console.log(error);
  //   }

  // };
  // useEffect(() => {
  //   getCartItems();
  // }, [cart.length]);

  return (
    <View style={{ flex: 1 }}>
      {showScanner ? (
        <>
          <BarCodeScanner
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <BarcodeMask edgeColor="#62B1F6" showAnimatedLine />
          <View
            style={{
              height: 40,
              paddingHorizontal: 16,
              position: "absolute",
              bottom: 16,
              left: 0,
              width: "100%",
            }}
          >
            <Button
              text="Cancel"
              onPress={() => {
                setShowScanner(false);
                setScanned(false);
              }}
            />
          </View>
        </>
      ) : (
        <SafeAreaView
          style={{ flex: 1, backgroundColor: "#fff", position: "relative" }}
        >
          <StatusBar
            backgroundColor="#fff"
            barStyle={Platform.OS === "ios" ? "dark-content" : "dark-content"}
          />

          <KeyboardAvoidingView style={{ flex: 1 }} behavior={"height"}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              style={{ backgroundColor: "#fff" }}
            >
              <View>
                <Text style={styles.titleHeader}>Record Transaction</Text>
              </View>
              <View
                style={{
                  flex: 2,
                  justifyContent: "center",
                  alignItems: "flex-end",
                  paddingHorizontal: 16,
                }}
              >
                <Text
                  style={{
                    // fontFamily: "SFUIText-Regular",
                    fontSize: 28,
                    fontWeight: "normal",
                    letterSpacing: 2,
                  }}
                >
                  {amount.join("").replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Text>
              </View>
              <View
                style={[
                  styles.noteContainer,
                  { flexDirection: "row", justifyContent: "center" },
                ]}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ textAlign: "right", paddingRight: 8 }}>
                    Note
                  </Text>
                  <Ionicons name="pencil-outline" size={24} />
                </View>
                <View style={{ flex: 3, marginLeft: 8 }}>
                  <TextInput style={{ flex: 1, textAlign: "center" }} />
                </View>
                {/* <View style={{flex: 3}}></View> */}
              </View>
              <View style={{ flex: 3 }}>
                <View style={{ flexDirection: "row", flex: 1 }}>
                  <TouchableOpacity
                    style={styles.keyPadStyle}
                    onPress={() => setAmount((amount) => [...amount, "1"])}
                  >
                    <View>
                      <Text style={styles.keyPadText}>1</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.keyPadStyle}
                    onPress={() => setAmount((amount) => [...amount, "2"])}
                  >
                    <View>
                      <Text style={styles.keyPadText}>2</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.keyPadStyle}
                    onPress={() => setAmount((amount) => [...amount, "3"])}
                  >
                    <View>
                      <Text style={styles.keyPadText}>3</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "row", flex: 1 }}>
                  <TouchableOpacity
                    style={styles.keyPadStyle}
                    onPress={() => setAmount((amount) => [...amount, "4"])}
                  >
                    <View>
                      <Text style={styles.keyPadText}>4</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.keyPadStyle}
                    onPress={() => setAmount((amount) => [...amount, "5"])}
                  >
                    <View>
                      <Text style={styles.keyPadText}>5</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.keyPadStyle}
                    onPress={() => setAmount((amount) => [...amount, "6"])}
                  >
                    <View>
                      <Text style={styles.keyPadText}>6</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", flex: 1 }}>
                  <TouchableOpacity
                    style={styles.keyPadStyle}
                    onPress={() => setAmount((amount) => [...amount, "7"])}
                  >
                    <View>
                      <Text style={styles.keyPadText}>7</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.keyPadStyle}
                    onPress={() => setAmount((amount) => [...amount, "8"])}
                  >
                    <View>
                      <Text style={styles.keyPadText}>8</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.keyPadStyle}
                    onPress={() => setAmount((amount) => [...amount, "9"])}
                  >
                    <View>
                      <Text style={styles.keyPadText}>9</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", flex: 1 }}>
                  <TouchableOpacity
                    style={styles.keyPadStyle}
                    onPress={() => setAmount((amount) => [...amount, "00"])}
                  >
                    <View>
                      <Text style={styles.keyPadText}>00</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.keyPadStyle}
                    onPress={() => setAmount((amount) => [...amount, "0"])}
                  >
                    <View>
                      <Text style={styles.keyPadText}>0</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.keyPadStyle]}
                    onPress={handleDelete}
                  >
                    <View>
                      <Text
                        style={[
                          styles.keyPadText,
                          { color: Colors.RED, fontWeight: "bold" },
                        ]}
                      >
                        {" "}
                        {"<"}{" "}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
              <View style={[styles.buttonWrapper, { height: 50 }]}>
                <Button text="Scan QR Code" onPress={handleScanCode} />
              </View>
            </View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 16,
                paddingBottom: 16,
              }}
              onPress={() => {
                helpers.removeItem("xxx-token");
                helpers.removeItem("xxx-user");
                navigation.navigate("login");
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    // fontFamily: "SFUIText-Regular",
                    fontSize: 16,
                    fontWeight: "bold",
                    marginLeft: 4,
                  }}
                >
                  Logout
                </Text>
              </View>
              <Ionicons name="log-out" size={32} color={Colors.BLACK} />
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </SafeAreaView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  keyPadStyle: {
    flex: 1,
    alignItems: "center",
  },
  keyPadText: {
    justifyContent: "center",
    // fontFamily: 'SFUIText-Regular',
    fontSize: 24,
    fontWeight: "400",
  },
  buttonWrapper: {
    maxWidth: 300,
    width: "100%",
    height: 40,
  },
  titleHeader: {
    textAlign: "center",
    // fontFamily: 'SFUIText-Regular',
    marginVertical: 20,
    fontSize: 24,
  },
  noteContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    width: "100%",
    borderBottomColor: "#F2F2F2",
    borderTopColor: "#F2F2F2",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
});

const mapStateToProps = (state: any) => {
  const {
    product: { cart },
  } = state;
  console.log("cart length: ", cart);
  return { cart };
};

export default Record;
