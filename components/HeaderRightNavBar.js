//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import { Text, View, TouchableOpacity, StyleSheet,Image,AsyncStorage,ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NavigationService from '../components/NavigationService'


//import all the basic component we have used
 
export default class HeaderRightNavBar extends React.Component {
  //Detail Screen to show from any Open detail button

  constructor(props) {
    super(props);
    this.state = {
      SharedLoading:true,
      userName:null,
      userPassword:null,
      userToken:null,
      userCode:null,
      baseURL: "https://ci-flask-server.herokuapp.com/",

    

      
    };
  }

  _deleteData = async () => {
    
    try {
      /*await AsyncStorage.removeItem('cod');
      await AsyncStorage.removeItem('name');
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('pwd');
      await AsyncStorage.removeItem('nameCompany');*/
      await AsyncStorage.removeItem('token');

      await AsyncStorage.setItem('SignedIn', 'Auth');

     
    }
    catch(exception) {
      return false;
    }

  };

  async deleteToken() {
    const { userToken,baseURL} = this.state;


    var details = {
      'token':userToken,
    }

    // fetch data
    fetch(baseURL + "tokens", {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details)

    })
    .then(response => {
      if (!response.ok) throw new Error(response.toString());
      else return response;
    })
    .then(data => {
      console.log(data)

      this._deleteData();
      NavigationService.navigate('Login');




      

      //INSERT LOGOUT LOGIC HERE
      
    })
    .catch(error => {
      console.log("error: " + error);
    });
  
  }

  _retrieveData = async () => {
    

    try {
    
      const token = await AsyncStorage.getItem('token');

      if ( token!==null) {
        // We have data!!
        this.setState({
          SharedLoading: false,
          
          userToken:token,
         
          
        });

      }
    } catch (error) {
      console.log(error);
    }
  };


  async componentDidMount() {

    this._retrieveData();
    
  }

 

  render() {
    
    return (
        <View style={{flex:1,flexDirection:'row'}}>

          <TouchableOpacity
            onPress={this.deleteToken.bind(this)}
          >
            <View style={{ paddingHorizontal: 15 }}>
             
              
                <Ionicons name="md-exit" size={32} color="white"/>
              
            </View>
          </TouchableOpacity>
          

      </View>
    );
  }
}

const styles = StyleSheet.create({
    icons: {
      paddingHorizontal:15
    }
  });


const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const Base64 = {
  btoa: (input:string = '')  => {
    let str = input;
    let output = '';

    for (let block = 0, charCode, i = 0, map = chars;
    str.charAt(i | 0) || (map = '=', i % 1);
    output += map.charAt(63 & block >> 8 - i % 1 * 8)) {

      charCode = str.charCodeAt(i += 3/4);

      if (charCode > 0xFF) {
        throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
      }
      
      block = block << 8 | charCode;
    }
    
    return output;
  },

  atob: (input:string = '') => {
    let str = input.replace(/=+$/, '');
    let output = '';

    if (str.length % 4 == 1) {
      throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (let bc = 0, bs = 0, buffer, i = 0;
      buffer = str.charAt(i++);

      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
      buffer = chars.indexOf(buffer);
    }

    return output;
  }
};