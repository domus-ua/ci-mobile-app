//This is an example code for Bottom Navigation//
import React from 'react';
import { Button, Text, View, TouchableOpacity, StyleSheet,Platform,StatusBar } from 'react-native';
//import all the basic component we have used
//import Ionicons to show the icon for bottom options
//For React Navigation 2.+ import following
//import {createStackNavigator,createBottomTabNavigator} from 'react-navigation';
//For React Navigation 3.+ import following
import {
  

  createAppContainer,
  createSwitchNavigator,
  
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
//import createStackNavigator, createBottomTabNavigator, createAppContainer in our project



import Login from './screens/Login'
import AuthLoadingScreen from './components/auth/AuthLoadingScreen'
import HeaderRightNavBar from './components/HeaderRightNavBar'



import Home from './screens/Home';


const LoginStack = createStackNavigator( //SignedOut Stack
  {
    //Defination of Navigaton from home screen
    Login: { screen: Login ,
      navigationOptions: {
          header: null,
        }
    },
    

  },
  {
    //For React Navigation 2.+ change defaultNavigationOptions->navigationOptions
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      
      headerStyle: {
        marginTop: Platform.OS === "android" ?  0 : 20  
      },
     
    }
    
  }
);



const AppNavigator = createStackNavigator( //Signed In Stack
  {
    
    Home: { screen: Home },
    
    
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#413C90",
        marginTop: Platform.OS === "android" ? 0 : 20,
      
      },
      headerTitleStyle: {
        color: 'white'
      },
      title:'Domus CI',
      headerRight: (
        <HeaderRightNavBar/>
      )

      
    }),
    tabBarOptions: {
      activeTintColor: '#c73737',
      inactiveTintColor: 'gray',
      
    },
  }
);




//For React Navigation 2.+ need to export App only
//export default App;
//For React Navigation 3.+

//Business Mode Routing, mudar nas opçoes
const AppNavigatorFinal = createSwitchNavigator(
    {
      App:{
        screen: AppNavigator
      },
      
      Auth:{
        screen: LoginStack
      },
      AuthLoading: AuthLoadingScreen,
      

  },
  {
    initialRouteName: 'AuthLoading', 
  }
);

export default createAppContainer(AppNavigatorFinal);