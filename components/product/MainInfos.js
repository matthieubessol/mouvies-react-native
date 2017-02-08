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

class MainInfos extends Component {
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
          title:newProps.data.title,
          rate:newProps.data.vote_average,
          release_date:newProps.data.release_date,
          length:newProps.data.runtime,
          overview:newProps.data.overview,
        });
      }

      if(newProps.casting) {
        var self = this;
        if(newProps.casting.crew) {
          var crewNodes = newProps.casting.crew.map(function(crew,i) {
            if(crew.job=="Director"){
              self.setState({director:crew.name});
            }
          });
        }
      }
    }

    render() {
      var hour = Math.floor(this.state.length/60) || 0,
          minutes = this.state.length - Math.floor(this.state.length/60)*60 || 0,
          rate = this.state.rate/2 || 0;
      // <Text style={{fontSize:12}}>{hour}h{minutes}</Text>
      return(
        <View style={{marginTop:0,position:"relative",flex:1,paddingHorizontal:15,marginTop:10, marginBottom:10}}>
          <Text style={{fontWeight:'400',fontSize:24,color:"black"}}>{this.state.title}</Text>
          <Text style={styles.textLight}>{this.state.director}</Text>
          <View style={{flexDirection: "row", marginTop:15}}>
            <View style={{flex:1, flexDirection: "row",}}>
              <Icon name="star" size={16} color="#FFC107" style={{marginRight:6,marginTop:2}}/>
              <Text style={{fontSize:15}}>{rate}/5</Text>
            </View>
            <View style={{flex:1, flexDirection: "row",}}>
              <Icon name="schedule" size={16} color="#2196F3" style={{marginRight:6,marginTop:2}}/>
              <Text style={{fontSize:15}}>{hour}h{minutes}</Text>
            </View>
            <View style={{flex:1, flexDirection: "row",}}>
              <Icon name="event" size={16} color="#DB4437" style={{marginRight:6,marginTop:2}}/>
              <Text style={{fontSize:15}}>{this.state.release_date}</Text>
            </View>
          </View>
          <View>
            <Text style={{marginTop:20,lineHeight:20,color:"rgba(0,0,0,0.54)"}}>{this.state.overview}</Text>
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

module.exports = MainInfos;
