/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  PixelRatio,
  StatusBar,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

var MainView    = require('./views/MainView');
var Movie       = require('./views/Movie');
var People       = require('./views/People');
var ListProduct = require('./views/ListProduct');

class MovieProject extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
           backgroundColor="rgba(0,0,0,0.5)"
           barStyle="light-content"
           translucent={true}
        />
        <Navigator
          style={{ flex:1 }}
          initialRoute={{ nameMainView: 'Home', name:"MainView",currentMovieId:"",currentPeopleId:"",dataMore:{data:[],title:""}}}
          renderScene={ this.renderScene }
          configureScene={(route) => {
              return Navigator.SceneConfigs.PushFromRight;
          }}
        />
      </View>
    );
  }

  renderScene(route, navigator) {
    if(route.name == "MainView") {
      return(<MainView navigator={navigator} apikey={api_key}/>);
    } else if(route.name == "Movie") {
      return(<Movie navigator={navigator} apikey={api_key} currentMovieId={route.currentMovieId}/>);
    } else if(route.name == "ListProduct") {
      return(<ListProduct navigator={navigator} apikey={api_key} data={route.dataMore}/>);
    } else if(route.name == "People") {
      return(<People navigator={navigator} apikey={api_key} currentPeopleId={route.currentPeopleId}/>)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  botttomNav: {
    height:PixelRatio.get()*24,
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

AppRegistry.registerComponent('MovieProject', () => MovieProject);
