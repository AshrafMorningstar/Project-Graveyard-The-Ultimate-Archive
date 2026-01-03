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
import { Text, View, StyleSheet, Image } from 'react-native';

export default class LiveClock extends React.Component {
  constructor(){
    super();
    this.state = {currentTime : new Date()}
  }

  componentDidMount(){
    setInterval(()=> this.tick(), 1000) //tick() is called after every 1 sec or 1000ms
  }

  tick=()=>{
    this.setState({currentTime:new Date()})
  }

  render() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
       {this.state.currentTime.toLocaleTimeString('en-US')}
      </Text>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  paragraph: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
