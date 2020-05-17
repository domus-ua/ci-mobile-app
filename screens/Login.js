import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  AsyncStorage
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import NavigationService from "../components/NavigationService";
const API_URL = "mednat.ieeta.pt:8442";

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      userName: "",
      userPassword: "",
      inputcolor1: "gray",
      inputcolor2: "gray",
      userToken: null,
      baseURL: "https://ci-flask-server.herokuapp.com/",
      name: null,
      companyName: null,
      userCode: null
    };
  }

  _storeData = async () => {
    try {
      /*console.log(this.state.userCode+" "+this.state.name+" "+this.state.companyName)
        await AsyncStorage.setItem('cod', this.state.userCode.toString());
        await AsyncStorage.setItem('name', this.state.name);
        await AsyncStorage.setItem('username', this.state.userName);
        await AsyncStorage.setItem('pwd', this.state.userPassword);
        */
      await AsyncStorage.setItem("token", this.state.userToken);
      /*await AsyncStorage.setItem('token', this.state.userToken);
        const nameCompany= await AsyncStorage.getItem('nameCompany');
        console.log("Teste ",nameCompany)*/
      await AsyncStorage.setItem("SignedIn", "App");
      NavigationService.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

  verifyCredentials(email, password) {
    // EMAIL VERIFICATIONS
    let invalidEmail = 0;
    let invalidPassword = 0;
    const words = email.split("@");

    if (words.length > 1) {
      const words2 = words[1].split(".");
      //console.log("WORDS2" + words2.length)
      if (words2.length <= 1) invalidEmail = 1;
    } else {
      invalidEmail = 1;
    }
    if (email == "" || invalidEmail == 1) {
      alert("error mail");
      return false;
    } else {
      if ((password = "" || password.length < 3)) {
        alert("error pass");
        return false;
      } else {
        console.log("password valida");
        return true;
      }
      // PASSWORD VERIFICATIONS
    }
  }

  async login() {
    const { userName, userPassword, baseURL, userToken } = this.state;

    // fetch data
    if (userName != "" && userPassword != "") {
      fetch(baseURL + "login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          //change these params later
          username: userName,
          password: userPassword,
          token: userToken
        })
      })
        .then(response => {
          if (!response.ok) {
            alert("Invalid credentials.");
            throw new Error(response.status);
          } else return response;
        })
        .then(data => {
          console.log(data);
          this._storeData();

          // Redirect to page ( pra ja para a area pessoal só para testar)
        })
        .catch(error => {
          console.log("error: " + error);
        });
    } else {
      alert("Invalid credentials.");
    }
  }

  componentDidMount() {
    this.register();
  }

  register = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (status !== "granted") {
      console.log("Permission not granted!");

      //this.removeNotificacao(token)
    } else {
      try {
        const token = await Notifications.getExpoPushTokenAsync();
        console.log("granted", token);
        this.setState({
          userToken: token
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  onBlur2() {
    this.setState({
      inputcolor2: "gray"
    });
  }
  onFocus2() {
    this.setState({
      inputcolor2: "#7A7EBC"
    });
  }
  onBlur1() {
    this.setState({
      inputcolor1: "gray"
    });
  }
  onFocus1() {
    this.setState({
      inputcolor1: "#7A7EBC"
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: moderateScale(400), width: moderateScale(300) }}>
          <View style={{ paddingBottom: 40 }}>
            <Text style={{ color: "white", fontSize: 28, textAlign: "center" }}>
              ACCOUNT LOGIN
            </Text>
          </View>
          <View style={{ backgroundColor: "white", flex: 1, borderRadius: 10 }}>
            <View
              style={{
                flex: 0.5,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 15,
                  marginTop: 15,
                  borderBottomWidth: 1,
                  borderColor: this.state.inputcolor1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Ionicons
                  name={"md-people"}
                  size={moderateScale(30)}
                  color={this.state.inputcolor1}
                  style={{ paddingHorizontal: 15 }}
                />

                <TextInput
                  placeholder="User name"
                  onFocus={() => this.onFocus1()}
                  onBlur={() => this.onBlur1()}
                  style={{
                    flex: 1,
                    height: moderateScale(40),
                    color: "#000",
                    fontSize: moderateScale(20)
                  }}
                  returnKeyType="next"
                  onSubmitEditing={() => this.passwordInput.focus()}
                  onChangeText={userName => this.setState({ userName })}
                />
              </View>
            </View>
            <View
              style={{
                flex: 0.5,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 15,
                  borderBottomWidth: 1,
                  borderColor: this.state.inputcolor2,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Ionicons
                  name={"md-lock"}
                  size={moderateScale(30)}
                  color={this.state.inputcolor2}
                  style={{ paddingHorizontal: 15 }}
                />

                <TextInput
                  placeholder="Password"
                  onFocus={() => this.onFocus2()}
                  onBlur={() => this.onBlur2()}
                  style={{
                    flex: 1,
                    height: moderateScale(40),
                    color: "#000",
                    fontSize: moderateScale(20)
                  }}
                  returnKeyType="done"
                  secureTextEntry={true}
                  onSubmitEditing={() => this.login()}
                  ref={input => (this.passwordInput = input)}
                  onChangeText={userPassword => this.setState({ userPassword })}
                />
              </View>
            </View>
            <View
              style={{
                flex: 0.6,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                style={styles.loginGoogleButton}
                onPress={() => this.login()}
              >
                <Text style={styles.loginButtonText}>LOGIN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#413C90",
    alignItems: "center",
    justifyContent: "center"
  },
  loginGoogleButton: {
    shadowColor: "rgba(0,0,0, .4)", // IOS
    backgroundColor: "#7A7EBC",
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
    width: moderateScale(150),
    height: moderateScale(40),
    margin: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  loginButtonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700",
    width: "100%",
    fontSize: moderateScale(15)
  }
});

const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const Base64 = {
  btoa: (input: string = "") => {
    let str = input;
    let output = "";

    for (
      let block = 0, charCode, i = 0, map = chars;
      str.charAt(i | 0) || ((map = "="), i % 1);
      output += map.charAt(63 & (block >> (8 - (i % 1) * 8)))
    ) {
      charCode = str.charCodeAt((i += 3 / 4));

      if (charCode > 0xff) {
        throw new Error(
          "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range."
        );
      }

      block = (block << 8) | charCode;
    }

    return output;
  },

  atob: (input: string = "") => {
    let str = input.replace(/=+$/, "");
    let output = "";

    if (str.length % 4 == 1) {
      throw new Error(
        "'atob' failed: The string to be decoded is not correctly encoded."
      );
    }
    for (
      let bc = 0, bs = 0, buffer, i = 0;
      (buffer = str.charAt(i++));
      ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
        ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
        : 0
    ) {
      buffer = chars.indexOf(buffer);
    }

    return output;
  }
};
