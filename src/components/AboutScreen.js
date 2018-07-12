import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

class AboutScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{
          backgroundColor: '#fff',
          marginTop: 60,
          marginLeft: 24
        }}>
          <Text style={{
            color: '#393939',
            fontSize: 34,
            fontWeight: 'bold'
          }}>О приложении</Text>
        </View>
      </View>
    );
  }
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  }
});

export default AboutScreen;
