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

import {
  MKButton,
  MKColor,
} from 'react-native-material-kit';

import Icon from 'react-native-vector-icons/MaterialIcons';

class BottomNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
          whosActive:1,
        };
    }

    render() {
      var self = this;
      var mainColor = MKColor.BlueGrey, opacityFirst = 1, opacitySecond = opacityThird = opacityFourth = 0.65;
      switch(this.state.whosActive) {
        case 2 :
          mainColor = MKColor.Blue;
          opacitySecond = 1;
          opacityFirst = opacityThird = opacityFourth = 0.65;
          break;
        case 3 :
          mainColor = MKColor.Red;
          opacityThird = 1;
          opacityFirst = opacitySecond = opacityFourth = 0.65;
          break;
        case 4 :
          mainColor = MKColor.Amber;
          opacityFourth = 1;
          opacityFirst = opacitySecond = opacityThird = 0.65;
          break;
      }
      return(
        <Animated.View style={[styles.botttomNav, {backgroundColor:mainColor}]}>
          <MKButton
            style={{flex: 1,justifyContent: 'center',alignItems: 'center',opacity:opacityFirst,borderWidth:0, height:PixelRatio.get()*24}}
            onPress={() => {
              setTimeout(function() {
                self.setState({whosActive:1});
                self.props.setCurrentView("home")
              },100)
            }}
            >
            <Icon name="home" size={24} color="#fff" />
            <Text pointerEvents=""
                  style={{color: 'white', fontWeight: 'bold',textAlign:"center",fontSize:12, fontWeight:'normal'}}>
              Home
            </Text>
          </MKButton>
          <MKButton
            style={{flex: 1,justifyContent: 'center',alignItems: 'center', opacity:opacitySecond,borderWidth:0,height:PixelRatio.get()*24}}
            onPress={() => {
              setTimeout(function() {
                self.setState({whosActive:2});
                self.props.setCurrentView("discover")
              },100)
            }}
            >
            <Icon name="explore" size={24} color="#fff" />
            <Text pointerEvents=""
                  style={{color: 'white', fontWeight: 'bold',textAlign:"center",fontSize:12, fontWeight:'normal'}}>
              Discover
            </Text>
          </MKButton>
          <MKButton
            style={{flex: 1,justifyContent: 'center',alignItems: 'center', opacity:opacityThird,borderWidth:0,height:PixelRatio.get()*24}}
            onPress={() => {
              setTimeout(function() {
                self.setState({whosActive:3});
                self.props.setCurrentView("selection")
              },100)
            }}
            >
            <Icon name="star" size={24} color="#fff" />
            <Text pointerEvents=""
                  style={{color: 'white', fontWeight: 'bold',textAlign:"center",fontSize:12, fontWeight:'normal'}}>
              Selection
            </Text>
          </MKButton>
          <MKButton
            style={{flex: 1,justifyContent: 'center',alignItems: 'center', opacity:opacityFourth,borderWidth:0,height:PixelRatio.get()*24}}
            onPress={() => {
              setTimeout(function() {
                self.setState({whosActive:4});
                self.props.setCurrentView("schedule")
              },100)
            }}
            >
            <Icon name="schedule" size={24} color="#fff" />
            <Text pointerEvents=""
                  style={{color: 'white', fontWeight: 'bold',textAlign:"center",fontSize:12, fontWeight:'normal'}}>
              Schedule
            </Text>
          </MKButton>
        </Animated.View>
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
    height:PixelRatio.get()*19,
    flexDirection: "row",
    alignItems:'center',
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

module.exports = BottomNavigation;
