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
  TouchableOpacity,
  PixelRatio,
  TextInput,
} from 'react-native';

import {
  MKButton,
  MKColor,
} from 'react-native-material-kit';

import Icon from 'react-native-vector-icons/MaterialIcons';
var SearchResult = require('./SearchResult');

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          searchText:"",
          searchResultActive:false,
        };
    }

    render() {
      var icon_name = "search";
      if(this.state.searchResultActive) icon_name = "arrow-back";
      return(
        <View style={{position:"absolute",top:0,}}>
          <SearchResult navigator={this.props.navigator} searchResultActive={this.state.searchResultActive} searchText={this.state.searchText} apikey={this.props.apikey}/>
          <Animated.View style={styles.card}>
            <TouchableOpacity onPress={()=>{this.setState({searchResultActive:false})}} style={{position:'absolute',left:16, top:12}}>
              <Icon name={icon_name} size={24} color="rgba(0,0,0,0.54)"/>
            </TouchableOpacity>
            <Icon name="mic" size={24} color="rgba(0,0,0,0.54)" style={{position:'absolute',right:16, top:12}}/>
            <TextInput
              ref={textInput => (this._textInput = textInput)}
              placeholder="Search movies and series"
              underlineColorAndroid='rgba(0,0,0,0)'
              style={{height: 40, borderColor: 'gray', borderWidth: 1, width:Dimensions.get('window').width - 130}}
              onChangeText={(text) => this.setState({searchText:text})}
              value={this.state.searchText}
              onFocus={() => this.setState({searchResultActive:true})}
            />
          </Animated.View>
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

module.exports = SearchBar;
