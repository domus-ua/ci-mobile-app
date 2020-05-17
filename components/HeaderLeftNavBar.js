//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import { Text, View, TouchableOpacity, StyleSheet,Image,AsyncStorage,ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


//import all the basic component we have used
 
export default class HeaderRightNavBar extends React.Component {
  //Detail Screen to show from any Open detail button

  constructor(props) {
    super(props);
    this.state = {
      SharedLoading:true,
      
      codigo:'',
      size: 0,
      sizenotif:null,

      
    };
  }

  _retrieveData = async () => {
    

    try {
      const value = await AsyncStorage.getItem('cod');
      if (value !== null) {
        // We have data!!
        this.setState({
          SharedLoading: false,
          codigo: value,
          isLoading:true,
          
        });
      }
    } catch (error) {
      console.log(error);
    }
  };


  async componentDidMount() {

    
  }

 

  render() {
    
    return (
        <View style={{flex:1,flexDirection:'row'}}>

          <TouchableOpacity
            onPress={() => {
             

            }
            }
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