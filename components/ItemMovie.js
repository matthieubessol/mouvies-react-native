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
          size: {width: Dimensions.get('window').width, height: Dimensions.get('window').width*0.72}
        };
    }

    render() {
      var url_image = "http://image.tmdb.org/t/p/w185/"+this.props.movie.poster_path;
      var vote = this.props.movie.vote_average/2;
      var stars = [], compteurStar = 0;
      if(!this.props.type) {
        for(var i=0;i<Math.floor(vote);i++) {
          stars.push(<Icon key={i} name="star" size={16} color="rgba(0,0,0,0.54)" style={{flex:1}}/>);
            compteurStar++;
        }
        if(vote - Math.floor(vote) > 0.5) {
          stars.push(<Icon key={i} name="star-half" size={16} color="rgba(0,0,0,0.54)" style={{flex:1}}/>);
          compteurStar++;
        }
        for(var j=0;j<5-compteurStar;j++)
          stars.push(<Icon key={compteurStar+j} name="star-border" size={16} color="rgba(0,0,0,0.54)" style={{flex:1}}/>);
      }

      var self = this;

      var width = 100, ml = 10;
      var styles_specific = StyleSheet.create({item:{}});
      if(this.props.styleTheme == "big-list") {
        ml=0;
        width=155;
        styles_specific = StyleSheet.create({item:{width:160,marginLeft:3}});
        if(this.props.i%2==0)
          styles_specific = StyleSheet.create({item:{position:"absolute", right:0, width:160,marginLeft:3 }});
      }

      return(
        <TouchableOpacity style={[styles_specific.item]} onPress={() => { self._navigate(self, self.props.movie.id) }}>
          <View style={{marginTop:10,marginLeft:ml, width:width,elevation:2, backgroundColor:"white",marginBottom:10,}}>
            <Image source={{uri: url_image}} style={{width:width, height:width*1.5}}/>
            <Text ellipsizeMode='tail' numberOfLines={2} style={{paddingTop:5, paddingBottom:5,paddingLeft:4,paddingRight:4,textAlignVertical:'center', height:42}}>{this.props.movie.title || this.props.movie.name}</Text>
            <View style={{width:80,flexDirection: "row",marginLeft:4,marginBottom:5}}>
              { stars }
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    _navigate(ctx, id){
      ctx.props.navigator.push({
        name: 'Movie',
        currentMovieId: id
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
