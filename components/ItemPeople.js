import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  Animated,
  Navigator,
  PixelRatio,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {
  MKButton,
  MKColor,
  getTheme,
} from 'react-native-material-kit';

import Icon from 'react-native-vector-icons/MaterialIcons';

const theme = getTheme();


class ItemMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
      var self = this;
      var url_image = "http://image.tmdb.org/t/p/w185/"+this.props.data.profile_path || "https://placeholdit.imgix.net/~text?txtsize=19&txt=200%C3%97300&w=200&h=300";
      return(
          <View>
            <TouchableOpacity onPress={() => { self._navigate(self, self.props.data.id) }}>
              <View style={{alignItems:"center", width:120}}>
                <Image source={{uri: url_image}} style={{width:100, height:150}}/>
                <Text ellipsizeMode='tail' numberOfLines={1} style={{color:'black'}}>{this.props.data.name}</Text>
                <Text ellipsizeMode='tail' numberOfLines={1}>{this.props.data.character}</Text>
              </View>
            </TouchableOpacity>
          </View>
      );
    }

    _navigate(ctx, id){
      console.log(id)
      ctx.props.navigator.push({
        name: 'People',
        currentPeopleId: id
      })
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pictureCarousel: {
    flex:1,
     flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
  },
  wrapper: {
    height:Dimensions.get('window').width*0.72,
   },
   slide: {
     flex: 1,
     backgroundColor: '#97CAE5',
     height:Dimensions.get('window').width*0.72,
   },
   text: {
     color: '#fff',
     fontSize: 21,
     fontWeight: 'bold',
     textShadowColor:"rgba(0,0,0,0.5)"
   },
   textContainer:{
      position:'absolute',
      bottom:32,
      width:Dimensions.get('window').width,
      alignItems:'center',
   },
   movieName:{
      color:"white",
      fontSize: 22,
      textShadowColor:"rgba(0,0,0,0.5)",
      textShadowOffset: {width: 0, height: 2},
      textShadowRadius:10
   },
   movieDirector:{
      color:"white",
      fontSize: 18,
      textShadowColor:"rgba(0,0,0,0.5)",
      textShadowOffset: {width: 0, height: 2},
      textShadowRadius:4,
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
    justifyContent: 'center',alignItems: 'center',
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

module.exports = ItemMovie;
