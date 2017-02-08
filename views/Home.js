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
  TouchableOpacity,
  Navigator,
  TouchableHighlight,
  PanResponder,
  PixelRatio,
} from 'react-native';

var SearchBar = require('../components/SearchBar');
var CarouselHome = require('../components/CarouselHome');
var ListItem = require('../components/ListItem');
import Icon from 'react-native-vector-icons/MaterialIcons';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
      var url_popular   = "http://api.themoviedb.org/3/movie/popular?api_key="+this.props.apikey,
          url_new       = "http://api.themoviedb.org/3/movie/now_playing?api_key="+this.props.apikey,
          url_best      = "http://api.themoviedb.org/3/movie/top_rated?api_key="+this.props.apikey,
          url_upcoming  = "http://api.themoviedb.org/3/movie/upcoming?api_key="+this.props.apikey;

      return(
        <View style={styles.container}>
          <View>
            <ScrollView style={styles.scrollView}>
              <CarouselHome/>
              <ListItem title='Nouveautés' url={url_new} navigator={this.props.navigator}/>
              <ListItem title='Populaire' url={url_popular} navigator={this.props.navigator}/>
              <ListItem title='Prochaines Sorties' url={url_upcoming} navigator={this.props.navigator}/>
              <ListItem title='Meilleures Notes' url={url_best} navigator={this.props.navigator}/>
            </ScrollView>
            <SearchBar navigator={this.props.navigator} apikey={this.props.apikey}/>
          </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    height:Dimensions.get('window').height - 50,
    position:'relative',
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

module.exports = Home;
