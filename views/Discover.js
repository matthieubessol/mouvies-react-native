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

class Discover extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
      return(
        <View><Text>Discover</Text></View>
      )
    }

    _navigate(){
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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

module.exports = Discover;
