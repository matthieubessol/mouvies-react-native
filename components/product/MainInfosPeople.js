import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  Navigator,
  PixelRatio,
  ListView,
  TouchableOpacity,
} from 'react-native';

import {
  MKButton,
  MKColor,
} from 'react-native-material-kit';

import Icon from 'react-native-vector-icons/MaterialIcons';

class MainInfosPeople extends Component {
    constructor(props) {
        super(props);

        this.state = {
          title:"...",
          director:"...",
          rate:0,
          length:0,
          release_date:"",
          overview:"",
        }
    }

    componentWillReceiveProps(newProps) {
      if(newProps.data){
        this.setState({
          name:newProps.data.name,
          overview:newProps.data.overview,
        });
      }
    }

    render() {
      var hour = Math.floor(this.state.length/60) || 0,
          minutes = this.state.length - Math.floor(this.state.length/60)*60 || 0,
          rate = this.state.rate/2 || 0;
      // <Text style={{fontSize:12}}>{hour}h{minutes}</Text>
      return(
        <View style={{marginTop:0,position:"relative",flex:1,paddingHorizontal:15,marginTop:10, marginBottom:10}}>
          <Text style={{fontWeight:'400',fontSize:24,color:"black"}}>{this.props.data.name}</Text>
          <Text style={styles.textLight}>{this.props.data.place_of_birth}</Text>
          <Text style={styles.textLight}>{this.props.data.birthday}</Text>
          <View>
            <Text style={{marginTop:20,lineHeight:20,color:"rgba(0,0,0,0.54)"}}>{this.props.data.biography}</Text>
          </View>
        </View>
      );
    }

    _navigate(){

    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textLight:{
    color:"rgba(61,61,61,0.44)",
    fontSize:15,
  },
  pictureBackground:{
    flex: 1,
    width: null,
    height: null,
  },
  listTitle:{
    color:"black",
    fontSize:23,
    marginLeft:8,
  },
  card: {
    elevation:2,
    width:Dimensions.get('window').width - 16,
    height:48,
    marginTop:8,
    alignItems:"center",
    backgroundColor:"white",
    borderRadius:2,
    marginLeft:8,
    position:"absolute",
    justifyContent: 'center',alignItems: 'center',
    marginTop:30,
  },
  botttomNav: {
    position:'absolute',
    bottom:0,
    flex:1,
    width:Dimensions.get('window').width,
    height:PixelRatio.get()*24,
    flexDirection: "row",
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // height: Dimensions.get('window').height,
    // width: Dimensions.get('window').width,
    backgroundColor: "#000"
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

module.exports = MainInfosPeople;
