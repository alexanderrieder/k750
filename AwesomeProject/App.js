import React,  { Component }  from 'react';
import { StyleSheet, Text, View, AppRegistry, Image } from 'react-native';

export default class App extends Component {
  render() {
    
      let banana = {
        uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
      };
    
      return (
        <View style={{alignItems: 'center'}}>
        <Test picture='https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'/>
        </View>
      );
    }
  }

  class Test extends Component {
    render() {
      return (
        <Image source={{uri: this.props.picture}} style={{width: 193, height: 110}}/>
      )
    }
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
