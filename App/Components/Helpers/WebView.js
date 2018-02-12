import React, {Component} from 'react';
import {StyleSheet, View, WebView} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
    flexDirection: 'column'
  }
});

export default class WebViewComp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <WebView source={{uri: this.props.url}}/>
      </View>
    )
  }
}

WebViewComp.propTypes = {
  url: PropTypes.string.isRequired
};