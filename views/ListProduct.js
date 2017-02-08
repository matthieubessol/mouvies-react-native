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
  ToolbarAndroid,
  PanResponder,
  PixelRatio,
} from 'react-native';

var ItemMovie = require('../components/ItemMovie');

import Icon from 'react-native-vector-icons/MaterialIcons';


class ListProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[]
        };
    }

    componentWillReceiveProps(newProps) {
      this.setState({data:newProps.data.data});
    }

    componentWillMount() {
      this.setState({data:this.props.data.data});
    }

    render() {
      var contentNode = (<View><Text>Loading ...</Text></View>);
      var self = this;
      if (this.state.data) {
        var i = 0;
        contentNode = this.state.data.map(function(movie,i) {
            var title = movie.title;
            return (
              <ItemMovie key={i} i={i} movie={movie} styleTheme="big-list" navigator={self.props.navigator}/>
            );
        });
      }

      return(
        <View style={styles.container}>
          <View style={{backgroundColor:"#2196F3", height:25}}></View>

          <Icon.ToolbarAndroid
                title={this.props.data.title}
                titleColor="white"
                navIconName="arrow-back"
                onIconClicked={this.props.navigator.pop}
                overflowIconName="more"
                style={{backgroundColor:"#2196F3",height:56}}

                actions={[
                  { title: 'search', iconName: 'search', iconSize: 25, show: 'always' },
                ]}

                onActionSelected={() => {console.log("open menu")}}
              />

          <ScrollView style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height - 85, paddingHorizontal:15, position:"relative",}}>
            {contentNode}
          </ScrollView>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white",
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

module.exports = ListProduct;
