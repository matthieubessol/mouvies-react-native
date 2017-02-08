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
} from 'react-native-material-kit';

import Icon from 'react-native-vector-icons/MaterialIcons';


class SearchItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[],
        };

    }

    render() {
      var title  = this.props.movie.title || this.props.movie.name,
          poster = this.props.movie.poster_path || this.props.movie.profile_path,
          url_image = "http://image.tmdb.org/t/p/w92/"+poster || "http://placehold.it/50x50";

      var self = this;
      var second_info = this.props.movie.release_date || this.props.movie.first_air_date
      return(
        <TouchableOpacity onPress={() => { self._navigate(self, self.props.movie.id) }}>
          <View style={{flexDirection:"row",paddingVertical:5,paddingHorizontal:20}}>
            <View style={{width:30,height:30,marginRight:20}}>
              <Image source={{uri:url_image}} style={{width:30,height:30,}}/>
            </View>
            <View style={{justifyContent: 'center', marginLeft:0}}>
              <Text style={{marginTop:-3}}>{title}</Text>
              <Text style={{opacity:0.6, fontSize:12}}>{second_info}</Text>
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

module.exports = SearchItem;
