//This is an example code for Bottom Navigation//
import React from "react";
//import react in our code.
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet,
  Image,
  AsyncStorage,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import { Ionicons, Feather, AntDesign, Entypo } from "@expo/vector-icons";
import { moderateScale } from "react-native-size-matters";
const { width, height } = Dimensions.get("screen");

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SharedLoading: true,
      userName: null,
      userPassword: null,
      userToken: null,
      userCode: null,
      name: null,
      nameCompany: null,
      baseURL: "https://ci-flask-server.herokuapp.com/",
      data: null,
      deployPipeline: null,
      mobilePipeline: null,
      restApiPipeline: null,
      webAppPipeline: null,
      refreshing: false,
      isLoading: true
    };
  }

  async getInfo() {
    const { baseURL } = this.state;

    // fetch data
    fetch(baseURL + "build-info", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then(data => {
        console.log(data);

        this.setState({
          isLoading: false,
          deployPipeline: data["deploy"],
          mobilePipeline: data["mobile"],
          restApiPipeline: data["rest_api"],
          webAppPipeline: data["web"],
          refreshing: false
        });
      })
      .catch(error => {
        console.log("error: " + error);
      });
  }

  _retrieveData = async () => {
    try {
      const userName = await AsyncStorage.getItem("username");
      const name = await AsyncStorage.getItem("name");
      const nameCompany = await AsyncStorage.getItem("nameCompany");

      const pwd = await AsyncStorage.getItem("pwd");
      const value = await AsyncStorage.getItem("cod");
      const token = await AsyncStorage.getItem("token");
      console.log(userName, name, nameCompany, pwd, value, token);
      if (
        value !== null &&
        pwd !== null &&
        userName !== null &&
        token !== null
      ) {
        // We have data!!

        this.setState({
          SharedLoading: false,
          userCode: value,
          userToken: token,
          userName: userName,
          userPassword: pwd,
          nameCompany: nameCompany,
          name: name,
          isLoading: true
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleRefresh = () => {
    // Refresh a zona de filtros tambem?

    this.setState(
      {
        refreshing: true
      },
      () => {
        this.getInfo();
      }
    );
  };

  async componentDidMount() {
    this.getInfo();
  }

  renderSquare(value, pipeline, icon) {
    console.log(value);

    if (value == "null") {
      return (
        <View style={styles.squareView}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {icon}

            <Text style={{ fontSize: moderateScale(15), color: "white" }}>
              {pipeline}
            </Text>
          </View>
          <View
            style={{
              flex: 1.8,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={styles.squaretext}>No info</Text>
          </View>
        </View>
      );
    } else if (value == "success") {
      return (
        <View style={styles.squareView4}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {icon}

            <Text style={{ fontSize: moderateScale(15), color: "white" }}>
              {pipeline}
            </Text>
          </View>
          <View
            style={{
              flex: 1.8,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={styles.squaretext}>Success</Text>
          </View>
        </View>
      );
    } else if (value == "failed") {
      return (
        <View style={styles.squareView5}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {icon}

            <Text style={{ fontSize: moderateScale(15), color: "white" }}>
              {pipeline}
            </Text>
          </View>
          <View
            style={{
              flex: 1.8,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={styles.squaretext}>Error</Text>
          </View>
        </View>
      );
    } else if (value == "running") {
      return (
        <View style={styles.squareView6}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {icon}

            <Text style={{ fontSize: moderateScale(15), color: "white" }}>
              {pipeline}
            </Text>
          </View>
          <View
            style={{
              flex: 1.8,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={styles.squaretext}>Running</Text>
          </View>
        </View>
      );
    }
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size={"large"} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ScrollView
            style={{ flex: 1, width: width }}
            vertical
            scrollEnabled
            scrollEventThrottle={16}
            contentContainerStyle={{
              flexGrow: 1
            }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
              />
            }
          >
            <View
              style={{
                flex: 0.3,
                alignItems: "center",
                padding: 20,
                marginVertical: 10
              }}
            >
              <Text style={{ fontSize: moderateScale(20), fontWeight: "400" }}>
                <Text style={{ color: "#413C90", fontWeight: "bold" }}>
                  Domus Project
                </Text>{" "}
                build status 📊
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  height: moderateScale(200),
                  justifyContent: "space-around"
                }}
              >
                {this.renderSquare(
                  this.state.deployPipeline,
                  "Deploy",
                  <Feather
                    name="server"
                    size={moderateScale(25)}
                    color="white"
                    style={{ paddingRight: 10 }}
                  />
                )}
                {this.renderSquare(
                  this.state.mobilePipeline,
                  "Mobile App",
                  <AntDesign
                    name={"mobile1"}
                    size={moderateScale(25)}
                    color="white"
                    style={{ paddingRight: 10 }}
                  />
                )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  height: moderateScale(200),
                  justifyContent: "space-around"
                }}
              >
                {this.renderSquare(
                  this.state.restApiPipeline,
                  "Rest Api",
                  <AntDesign
                    name={"API"}
                    size={moderateScale(25)}
                    color="white"
                    style={{ paddingRight: 10 }}
                  />
                )}
                {this.renderSquare(
                  this.state.webAppPipeline,
                  "Web App",
                  <Entypo
                    name={"browser"}
                    size={moderateScale(25)}
                    color="white"
                    style={{ paddingRight: 10 }}
                  />
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  squareView: {
    flex: 1,
    width: moderateScale(150),
    height: moderateScale(150),
    marginVertical: width * 0.03,
    marginHorizontal: moderateScale(11),
    borderRadius: moderateScale(10),
    backgroundColor: "#413C90",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  squareView2: {
    flex: 1,
    width: moderateScale(150),
    height: moderateScale(150),
    marginVertical: width * 0.03,
    marginHorizontal: moderateScale(11),
    borderRadius: moderateScale(10),
    backgroundColor: "#a23cb6",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  squareView3: {
    flex: 1,
    width: moderateScale(150),
    height: moderateScale(150),
    marginVertical: width * 0.03,
    marginHorizontal: moderateScale(11),
    borderRadius: moderateScale(10),
    backgroundColor: "#5ab25e",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  squareView4: {
    flex: 1,
    width: moderateScale(150),
    height: moderateScale(150),
    marginVertical: width * 0.03,
    marginHorizontal: moderateScale(11),
    borderRadius: moderateScale(10),
    backgroundColor: "#4caf50",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  squareView5: {
    flex: 1,
    width: moderateScale(150),
    height: moderateScale(150),
    marginVertical: width * 0.03,
    marginHorizontal: moderateScale(11),
    borderRadius: moderateScale(10),
    backgroundColor: "#ea4744",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  squareView6: {
    flex: 1,
    width: moderateScale(150),
    height: moderateScale(150),
    marginVertical: width * 0.03,
    marginHorizontal: moderateScale(11),
    borderRadius: moderateScale(10),
    backgroundColor: "#7A7EBC",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4
  },
  squaretext: {
    fontSize: moderateScale(25),
    textAlign: "center",
    width: "100%",
    color: "white",
    fontWeight: "bold"
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
