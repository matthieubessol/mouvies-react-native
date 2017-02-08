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
  InteractionManager,
} from 'react-native';

var SearchBar = require('../components/SearchBar');
var ListItem = require('../components/ListItem');
var ListItemPeople = require('../components/ListItemPeople');

var PosterBackground = require('../components/product/PosterBackground')
var MainInfosPeople = require('../components/product/MainInfosPeople');

import Icon from 'react-native-vector-icons/MaterialIcons';

const HEADER_SCROLL_DISTANCE = Dimensions.get('window').width*0.72;

import {
  MKButton,
  MKColor,
} from 'react-native-material-kit';

class People extends Component {
    constructor(props) {
        super(props);
        this.state = {data: [], movies:[],tvs:[], images:[],renderPlaceholderOnly:true,scrollY: new Animated.Value(0),};
    }

    getMoviesFromApiAsync(url, type) {
      return fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          switch(type) {
            case "person" :
              this.setState({data:responseJson});
              break;
            case "images" :
              this.setState({images:responseJson});
              break;
          }
          return responseJson;
        })
        .catch((error) => {
          console.error(error);
        });
    }

    componentDidMount() {
      var url_person   = "https://api.themoviedb.org/3/person/"+this.props.currentPeopleId+"?api_key="+this.props.apikey,
          url_images  = "https://api.themoviedb.org/3/person/"+this.props.currentPeopleId+"/tagged_images?api_key="+this.props.apikey;

      // Load movie info.
      InteractionManager.runAfterInteractions(() => {
        this.setState({renderPlaceholderOnly: false});
        // Load person info.
        this.getMoviesFromApiAsync(url_person,"person");
        // Load images.
        this.getMoviesFromApiAsync(url_images,"images");
      });
    }

    componentWillReceiveProps(newProps) {
      var url_person   = "https://api.themoviedb.org/3/person/"+newProps.currentPeopleId+"?api_key="+this.props.apikey,
          url_images  = "https://api.themoviedb.org/3/person/"+newProps.currentPeopleId+"/tagged_images?api_key="+this.props.apikey;

      // Load movie info.
      InteractionManager.runAfterInteractions(() => {
        this.setState({renderPlaceholderOnly: false});
        // Load person info.
        this.getMoviesFromApiAsync(url_person,"person");
        // Load images.
        this.getMoviesFromApiAsync(url_images,"images");
      });
    }

    render() {

      const imageTranslate = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 100],
        extrapolate: 'clamp',
      });

      const navbarTranslate = this.state.scrollY.interpolate({
        inputRange: [HEADER_SCROLL_DISTANCE, HEADER_SCROLL_DISTANCE + 81],
        outputRange: [-81,0],
        extrapolate: 'clamp',
      });

      var url_movies = "https://api.themoviedb.org/3/person/"+this.props.currentPeopleId+"/movie_credits?api_key="+this.props.apikey,
          url_series = "https://api.themoviedb.org/3/person/"+this.props.currentPeopleId+"/tv_credits?api_key="+this.props.apikey;

      return(
        <View style={styles.container}>
          <ScrollView style={{flex:1}} onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
          )}>
            <Animated.View style={[
              styles.backgroundImage,
              {transform: [{translateY: imageTranslate}], position:"relative"},
            ]}>
              <PosterBackground data={this.state.images} noPlay={true}/>
            </Animated.View>
            <View style={{backgroundColor:"white", position:"relative"}}>
            <MainInfosPeople navigator={this.props.navigator} data={this.state.data} />
            <ListItem type="movie" title='Movies' url={url_movies} navigator={this.props.navigator}/>
            <ListItem type="serie" title='Series' url={url_series} navigator={this.props.navigator}/>
            </View>
            <TouchableOpacity style={{position:"absolute", top:44, left:15}}  onPress={() => {this.props.navigator.pop()}}>
              <Icon name="arrow-back" size={25} color="white"/>
            </TouchableOpacity>

          </ScrollView>
          <Animated.View style={{position:'absolute',top:0,height:81,width:Dimensions.get('window').width,transform: [{translateY: navbarTranslate}]}}>
            <View style={{backgroundColor:"#2196F3", height:25,}}></View>

            <Icon.ToolbarAndroid
                  title={this.state.data.name}
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
              </Animated.View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white"
  },
  scrollView: {
    height:Dimensions.get('window').height - 50,
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

module.exports = People;
