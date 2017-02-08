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
} from 'react-native';

import {
  MKButton,
  MKColor,
} from 'react-native-material-kit';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Swiper from 'react-native-swiper';

const dot = (
  <View style={{backgroundColor:'white', width: 6, height: 6,borderRadius: 4, marginLeft: 5, marginRight: 5, marginTop: 3, marginBottom: 3,}} />
);

const activeDot = (
  <View style={{backgroundColor:'white', width: 8, height: 8,borderRadius: 4, marginLeft: 5, marginRight: 5, marginTop: 3, marginBottom: 3,}} />
);


class CarouselHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
          size: {width: Dimensions.get('window').width, height: Dimensions.get('window').width*0.72}
        };
    }

    render() {
      return(
        <Animated.View style={{marginTop:0,position:"relative"}}>
          <Swiper style={styles.wrapper} height={Dimensions.get('window').width*0.72}
            paginationStyle={{position:'absolute', bottom:10}}
            dot={dot}
            activeDot={activeDot}
          >
            <View style={styles.slide}>
              <Image
                style={styles.pictureCarousel}
                source={require('../images/neondemon.jpg')}
              >
                <View style={styles.textContainer}>
                  <Text style={styles.movieName}>Neon Demon</Text>
                  <Text style={styles.movieDirector}>de Nicolas Winding Refn</Text>
                </View>
              </Image>
            </View>

            <View style={styles.slide}>
              <Image
                style={styles.pictureCarousel}
                source={require('../images/oslo.jpg')}
              >
                <View style={styles.textContainer}>
                  <Text style={styles.movieName}>Oslo 31 Aout</Text>
                  <Text style={styles.movieDirector}>de Nicolas Winding Refn</Text>
                </View>
              </Image>
            </View>

            <View style={styles.slide}>
              <Image
                style={styles.pictureCarousel}
                source={require('../images/interstellar.jpg')}
              >
                <View style={styles.textContainer}>
                  <Text style={styles.movieName}>Interstellar</Text>
                  <Text style={styles.movieDirector}>de Nicolas Winding Refn</Text>
                </View>
              </Image>
            </View>
          </Swiper>
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
  pictureCarousel: {
    flex:1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
  },
  wrapper: {
    height:Dimensions.get('window').width*0.72,
   },
   slide: {
     flex: 1,
     backgroundColor: '#97CAE5',
     height:Dimensions.get('window').width*0.72,
   },
   text: {
     color: '#fff',
     fontSize: 21,
     fontWeight: 'bold',
     textShadowColor:"rgba(0,0,0,0.5)"
   },
   textContainer:{
      position:'absolute',
      bottom:32,
      width:Dimensions.get('window').width,
      alignItems:'center',
   },
   movieName:{
      color:"white",
      fontSize: 22,
      textShadowColor:"rgba(0,0,0,0.5)",
      textShadowOffset: {width: 0, height: 2},
      textShadowRadius:10
   },
   movieDirector:{
      color:"white",
      fontSize: 18,
      textShadowColor:"rgba(0,0,0,0.5)",
      textShadowOffset: {width: 0, height: 2},
      textShadowRadius:4,
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
    justifyContent: 'center',alignItems: 'center',
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

module.exports = CarouselHome;
