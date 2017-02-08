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
  ListView,
  TouchableOpacity,
} from 'react-native';

import {
  MKButton,
  MKColor,
} from 'react-native-material-kit';

import Icon from 'react-native-vector-icons/MaterialIcons';
var ItemPeople = require('../components/ItemPeople');

class ListItemPeople extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[],
        };
    }

    componentWillReceiveProps(newProps) {
      if(newProps.data) {
        this.setState({data:newProps.data});
      }
    }

    render() {
      var peopleNodes = (<View><Text>Loading ...</Text></View>);
      var self = this;
      if(this.props.data.cast) {
        peopleNodes = this.props.data.cast.map(function(people,i) {
          if(i<15)
            return (<ItemPeople key={i} data={people} navigator={self.props.navigator} apikey={self.props.apikey}/>);
        });
      }
      return(
        <View style={{marginVertical:10,position:"relative"}}>
          <Text style={styles.listTitle}>{this.props.title}</Text>
          <TouchableOpacity onPress={() => {}} style={{position:"absolute",right:13,top:8}}>
            <Text style={{fontWeight:"normal"}}>MORE</Text>
          </TouchableOpacity>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{paddingLeft:5}}>
            {peopleNodes}
          </ScrollView>
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
  listTitle:{
    color:"black",
    fontSize:23,
    marginLeft:13,
    marginBottom:8
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

module.exports = ListItemPeople;
