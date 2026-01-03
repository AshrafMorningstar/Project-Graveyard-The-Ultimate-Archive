/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Maintainer: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

import * as React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import Constants from 'expo-constants';

import LiveClock from './components/Function';

import {Card} from 'react-native-paper';

export default class App extends React.Component {
  
  render(){
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Live Clock
      </Text>
      <Card style={{height:100, width:500}}>
      <Text style={styles.timer}>
        <LiveClock />
      </Text>
      </Card>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent:"center",
    alignItems:"center",
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fdf3f9', //#ecf0f1 old color
    padding: 8,
    color:"red"
  },
  paragraph: {
    margin: 24,
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color:"red"
  },
  timer:{
    padding:20,
    textAlign:"center",
    fontSize:20,
    fontWeight:"bold"
  }
});