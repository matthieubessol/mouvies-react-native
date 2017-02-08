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
var ItemMovie = require('../components/ItemMovie');

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[],
        };
    }

    componentWillMount() {
      this.getMoviesFromApiAsync(this.props.url);
    }

    getMoviesFromApiAsync(url) {
      return fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          if(this.props.type == "movie")
            this.setState({data:responseJson.cast});
          else if(this.props.type=="serie")
            this.setState({data:responseJson.cast});
          else
            this.setState({data:responseJson.results});
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
            var title = movie.title;
            return (
              <ItemMovie key={i} movie={movie} navigator={self.props.navigator} type={self.props.type}/>
            );
        });
      }
      return(
        <View style={{marginTop:10,position:"relative"}}>
          <Text style={styles.listTitle}>{this.props.title}</Text>
          <TouchableOpacity onPress={() => {console.log("okok"); self._navigate(self,self.state.data)}} style={{position:"absolute",right:13,top:8}}>
            <Text style={{fontWeight:"normal"}}>MORE</Text>
          </TouchableOpacity>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {contentNode}
          </ScrollView>
        </View>
      );
    }

    _navigate(ctx, data){
      console.log("ouais")
      ctx.props.navigator.push({
        name: 'ListProduct',
        dataMore: {
          data:data,
          title:ctx.props.title
        }
      })
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

module.exports = ListItem;
