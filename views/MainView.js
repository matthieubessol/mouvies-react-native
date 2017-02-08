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

var Home  = require('./Home');
var Discover  = require('./Discover');
var Selection  = require('./Selection');
var Schedule  = require('./Schedule');
var BottomNavigation  = require('../components/BottomNavigation');

class MainView extends Component {
    constructor(props) {
        super(props);
        this.state = {
          currentView:"home",
        };

    }

    setCurrentView(currentView) {
      this.setState({currentView:currentView});
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
      switch(this.state.currentView) {
        case "discover" :
          contentView = (<Discover apikey={this.props.apikey} navigator={this.props.navigator}/>);
          break;
        case "selection" :
          contentView = (<Selection apikey={this.props.apikey} navigator={this.props.navigator}/>);
          break;
        case "schedule" :
          contentView = (<Schedule apikey={this.props.apikey} navigator={this.props.navigator}/>);
          break;
        default:
          contentView = (<Home apikey={this.props.apikey} navigator={this.props.navigator}/>);
          break;
      }
      return(
        <View style={styles.container}>
          {contentView}
          <BottomNavigation navigator={this.props.navigator} setCurrentView={this.setCurrentView.bind(this)} />
        </View>
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

module.exports = MainView;
