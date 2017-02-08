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
  ToolbarAndroid,
  WebView,
} from 'react-native';

var SearchBar = require('../components/SearchBar');
var ListItem = require('../components/ListItem');
var ListItemPeople = require('../components/ListItemPeople');

var PosterBackground = require('../components/product/PosterBackground')
var MainInfos = require('../components/product/MainInfos');
import YouTube from 'react-native-youtube';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  MKButton,
  MKColor,
} from 'react-native-material-kit';

const HEADER_SCROLL_DISTANCE = Dimensions.get('window').width*0.72;

class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {data: [], casting:[],images:[], reviews:[], renderPlaceholderOnly: true, isReady:false,status:null,quality:null,error:null,currentTime:0,duration:0,scrollY: new Animated.Value(0),};
    }

    getMoviesFromApiAsync(url, type) {
      return fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          switch(type) {
            case "movie" :
              this.setState({data:responseJson});
              break;
            case "casting" :
              this.setState({casting:responseJson});
              break;
            case "images" :
              this.setState({images:responseJson});
              break;
            case "reviews" :
              this.setState({reviews:responseJson});
              break;
          }
          return responseJson;
        })
        .catch((error) => {
          console.error(error);
        });
    }

    componentDidMount() {
      var url_movie   = "https://api.themoviedb.org/3/movie/"+this.props.currentMovieId+"?api_key="+this.props.apikey,
          url_acteurs = "https://api.themoviedb.org/3/movie/"+this.props.currentMovieId+"/credits?api_key="+this.props.apikey,
          url_images  = "https://api.themoviedb.org/3/movie/"+this.props.currentMovieId+"/images?api_key="+this.props.apikey,
          url_reviews = "https://api.themoviedb.org/3/movie/"+this.props.currentMovieId+"/reviews?api_key="+this.props.apikey;
      InteractionManager.runAfterInteractions(() => {
        this.setState({renderPlaceholderOnly: false});
        // Load movie info.
        this.getMoviesFromApiAsync(url_movie,"movie");
        // Load acteur info.
        this.getMoviesFromApiAsync(url_acteurs,"casting");
        // Load images.
        this.getMoviesFromApiAsync(url_images,"images");
        // Load Reviews.
        this.getMoviesFromApiAsync(url_reviews,"reviews");
      });
    }

    render() {

      const imageTranslate = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 100],
        extrapolate: 'clamp',
      });

      const fabScale = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE/2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 1,0],
        extrapolate: 'extend',
      });

      const navbarTranslate = this.state.scrollY.interpolate({
        inputRange: [HEADER_SCROLL_DISTANCE, HEADER_SCROLL_DISTANCE + 81],
        outputRange: [-81,0],
        extrapolate: 'clamp',
      });

      const API_KEY = "AIzaSyCtjxQ5m7XU8Brb4L3L5dOMCnZu5cC9lzg";

      var title = this.state.data.title || "", url_similar = "https://api.themoviedb.org/3/movie/"+this.props.currentMovieId+"/similar?api_key="+this.props.apikey;
      return(
        <View style={styles.container}>
          <ScrollView style={{flex:1}} onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
          )}>
          <Animated.View style={[
            styles.backgroundImage,
            {transform: [{translateY: imageTranslate}], position:"relative"},
          ]}>
          <PosterBackground data={this.state.data}/>
          </Animated.View>
          <View style={{backgroundColor:"white", position:"relative"}}>
              <MainInfos data={this.state.data} casting={this.state.casting}/>
              <ListItemPeople data={this.state.casting} navigator={this.props.navigator} title="Casting" apikey={this.props.apikey} />
              <ListItem title='Similar movies' url={url_similar} navigator={this.props.navigator}/>
          </View>
          <Animated.View style={{transform: [{scale: fabScale}],width: 56,
                height: 56,right:15,position:"absolute",
                top:Dimensions.get('window').width*0.72 - 28,}}>
            <MKButton style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 56,
                height: 56,
                borderRadius: 28,
                elevation:2,
                overflow:'visible',
              }}
              fab={true}
              rippleColor={MKColor.Red}
              backgroundColor={MKColor.Red}
              rippleLocation="center"
              >
              <Icon name="bookmark-border" size={30} color="white"/>
            </MKButton>
          </Animated.View>
            <TouchableOpacity style={{position:"absolute", top:44, left:15}}  onPress={() => {this.props.navigator.pop()}}>
              <Icon name="arrow-back" size={25} color="white"/>
            </TouchableOpacity>
          </ScrollView>

          <Animated.View style={{position:'absolute',top:0,height:81,width:Dimensions.get('window').width,transform: [{translateY: navbarTranslate}]}}>
            <View style={{backgroundColor:"#2196F3", height:25,}}></View>

            <Icon.ToolbarAndroid
                  title={title}
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
    backgroundColor:"white",
    position:"relative"
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

module.exports = Movie;


// <YouTube
//               ref="youtubePlayer"
//               videoId="syUnJJ7GNyU" // The YouTube video ID
//               play={true}           // control playback of video with true/false
//               hidden={false}        // control visiblity of the entire view
//               playsInline={true}    // control whether the video should play inline
//               loop={false}          // control whether the video should loop when ended
//               apiKey="AIzaSyCtjxQ5m7XU8Brb4L3L5dOMCnZu5cC9lzg"

//               onReady={(e)=>{this.setState({isReady: true})}}
//               onChangeState={(e)=>{this.setState({status: e.state})}}
//               onChangeQuality={(e)=>{this.setState({quality: e.quality})}}
//               onError={(e)=>{this.setState({error: e.error})}}
//               onProgress={(e)=>{this.setState({currentTime: e.currentTime, duration: e.duration})}}

//               style={{alignSelf: 'stretch', height: 300, backgroundColor: 'black', marginVertical: 10}}
//             />
