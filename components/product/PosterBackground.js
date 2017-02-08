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

class PosterBackground extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      var url_backdrop = "http://image.tmdb.org/t/p/w1000/"+this.props.data.backdrop_path || "http://image.tmdb.org/t/p/w1000/"+this.props.data.results[0].file_path || "http://placehold.it/1920x1080";
      if(this.props.data.results) {
         url_backdrop = "http://image.tmdb.org/t/p/w1000/"+this.props.data.results[0].file_path;
      }

      var content = (
        <View></View>
      );

      if(!this.props.noPlay) {
        content = (
          <View style={{flex:1, backgroundColor:"rgba(0,0,0,0.4)", height:Dimensions.get('window').width*0.72,alignItems:"center",justifyContent:'center',flexDirection:"row"}}>
            <Icon name="play-arrow" size={70} color="white"/>
          </View>
        );
      }


      return(
        <View style={{marginTop:0,position:"relative",height:Dimensions.get('window').width*0.72}}>
          <MKButton rippleLocation="tapLocation" backgroundColor={"black"} style={{flex:1}}>
            <Image
                  style={styles.pictureBackground}
                  source={{uri: url_backdrop}}
            >
              {content}
            </Image>
          </MKButton>
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
  pictureBackground:{
    flex: 1,
    width: null,
    height: null,
    alignItems:"center",
    justifyContent:'center',
    flexDirection:"row"
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

module.exports = PosterBackground;
