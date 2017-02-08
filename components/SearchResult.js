import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Easing,
  Dimensions,
  ScrollView,
  Animated,
  Navigator,
  PixelRatio,
  TextInput,
} from 'react-native';

import {
  MKButton,
  MKColor,
} from 'react-native-material-kit';
var SearchItem = require('./SearchItem');

import Icon from 'react-native-vector-icons/MaterialIcons';

var sort_by = function(field, reverse, primer){

   var key = primer ?
       function(x) {return primer(x[field])} :
       function(x) {return x[field]};

   reverse = !reverse ? 1 : -1;

   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     }
}

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[],
          pan: new Animated.Value(0),
          isActive:false,
        };
        this._changeTimer = false;
    }

    componentWillMount() {
      if(this.props.searchText != "")
        this.getMoviesFromApiAsync(this.props.searchText);
    }

    componentWillReceiveProps(newProps) {

      console.log(newProps.searchResultActive)
      var self = this;
      if(this.changeTimer !== false) clearTimeout(this.changeTimer);
      this.changeTimer = setTimeout(function(){
          if(newProps.searchText != "")
            self.getMoviesFromApiAsync(newProps.searchText);
          self.changeTimer = false;
      },200);

      if(newProps.searchResultActive && this.state.isActive == false) {
        this.setState({isActive:true});
        this.state.pan.setValue(0);
        Animated.parallel([
          Animated.timing(this.state.pan, {
            toValue: 1,
            easing: Easing.elastic(0.8),
            duration:400,
          })
        ]).start();
      }

      if(newProps.searchResultActive == false && this.state.isActive == true) {
        this.setState({isActive:false});
        this.state.pan.setValue(1);
        Animated.parallel([
          Animated.timing(this.state.pan, {
            toValue: 0,
            easing: Easing.elastic(0.8),
            duration:400,
          })
        ]).start();
      }
    }

    getMoviesFromApiAsync(searchText) {
      return fetch("http://api.themoviedb.org/3/search/multi?api_key="+this.props.apikey+"&query="+searchText)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.results) {
            responseJson.results = responseJson.results.sort(sort_by('popularity', true, parseFloat));
            this.setState({data: responseJson.results})
          }
            return responseJson.results;
        })
        .catch((error) => {
          console.error(error);
        });
    }

    render() {
      var contentNode = (<View><Text>Loading ...</Text></View>);
      var self = this;
      if (this.state.data) {
        var i = 0;
        contentNode = this.state.data.map(function(movie,i) {
            return (
              <SearchItem movie={movie} key={i} navigator={self.props.navigator}/>
            );
        });
      }

      var pointer_state = "none";
      if(this.state.isActive) pointer_state = "auto";
      return(
        <Animated.View
          pointerEvents={pointer_state}
          style={{position:"absolute",top:0,backgroundColor:"white",width:Dimensions.get('window').width,height:Dimensions.get('window').height,
          transform: [{scaleY: this.state.pan}], opacity:this.state.pan
        }}>
          <ScrollView style={{height:50, marginTop:80}}>
            {contentNode}
          </ScrollView>
        </Animated.View>
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

module.exports = SearchResult;
