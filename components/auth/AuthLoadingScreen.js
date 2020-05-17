import React from 'react';



import {Platform,Animated} from 'react-native';

const {width, height}=Dimensions.get('screen');
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  Linking,
  Easing
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
export default class AuthLoadingScreen extends React.Component
 {

  
  constructor() {
    super();
    this.state={
      isLoading:true,
      dataSource: null,
      userToken:'',
      text:['A ferver água','A preparar os ingredientes','A empratar'],
      textused:'A ferver água',
      errorMessage:'',
      publicidade:false,
      fadeValue: new Animated.Value(0),
      xValue:new Animated.Value(500),
      xValue2:new Animated.Value(500)
      
  }
  }

  async componentDidMount () {
    

    
    
    await this._bootstrapAsync();
    console.log("My token:",this.state.userToken)
    this.props.navigation.navigate('Auth')
    if(this.state.userToken=='Auth'){
      console.log("Auth")
      this.props.navigation.navigate('Auth')
    }else{
    console.log("App")
    this.props.navigation.navigate('App')
    }
    


    
       
  }



  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('SignedIn');
    console.log("My userToken V2",userToken)
    if (userToken== null) {
      // We have data!!
      this.setState({
        userToken:'Auth'
      })
    }else{
      this.setState({
        userToken:userToken
      })
    }

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    //this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  
  // Render any loading content that you like here
  render() {
    
    
    return (
    <View style={styles.container}>
    <View style={{marginHorizontal:10,flex:1,justifyContent:"center",alignItems:"center"}}>
    <Image source={require('../../assets/domus-logo.png')} style={styles.companyImage} resizeMode="contain"
    
        />
    </View>  
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ?  0 : 20,
    
    backgroundColor:"#413C90"
  },
 
  companyImage: {
    width:moderateScale(200),
    height:moderateScale(200),
    
    

  },
  
});

