import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
import Api from '../Utils/Api';
import Separator from './Helpers/Separator';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 10
  },
  rowContainer: {
    padding: 10,
  },
  footerContainer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row'
  },
  note: {
    marginBottom: 15,
    fontSize: 20,
  }
});

export default class Notes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      note: '',
      loading: false,
      error: null,
      refreshing: false,
    };
  }

  handleSubmit(ev) {
    const note = this.state.note;
    this.setState({
      note: ''
    });

    Api.addNote(this.props.userInfo.login, note);
  }

  handleChange(ev) {
    this.setState({
      note: ev.nativeEvent.text
    })
  }

  footer() {
    return (
      <View style={styles.footerContainer}>
        <TextInput
          style={styles.searchInput}
          value={this.state.note}
          onChange={this.handleChange.bind(this)}
          placeholder="New Note"/>
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="#88D4F5">
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.notes}
          renderItem={(note) => (
            <View
              style={styles.rowContainer}>
              <Text style={styles.note}>{note.item.key}</Text>
              <Separator/>
            </View>
          )}
        />
        {this.footer()}
      </View>
    )
  }
}

Notes.propTypes = {
  userInfo: PropTypes.object.isRequired,
  notes: PropTypes.object.isRequired
};