import React, {Component} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from "react-native";
import Api from "../Utils/Api";
import Dashboard from "./Dashboard";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff',
    height: 45,
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      isLoading: false,
      error: false
    }
  }

  handleChange(ev) {
    this.setState({
      username: ev.nativeEvent.text
    })
  }

  handleSubmit(ev) {
    // update our indicatorIOS spinner
    this.setState({
      isLoading: true
    });

    // fetch data from github
    Api.getBio(this.state.username)
      .then(res => {
        if (res.message === 'Not Found') {
          this.setState({
            error: 'User not found',
            isLoading: false
          })
        } else {
          this.props.navigator.push({
            title: res.name || "Select an Option",
            component: Dashboard,
            passProps: {userInfo: res}
          });

          this.setState({
            isLoading: false,
            error: false,
            username: ''
          })
        }
      }).catch(err => {

      });
    // reroute to next route passing github info
  }

  render() {
    const showErr = this.state.error ? <Text> {this.state.error} </Text> : <View/>;

    return (
      <KeyboardAvoidingView
        style={styles.mainContainer}
        keyboardVerticalOffset={-100}
        behavior="position">
        <Text style={styles.title}>
          Search for a Github User
        </Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          onChange={this.handleChange.bind(this)}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="white"
        >
          <Text style={styles.buttonText}>SEARCH</Text>
        </TouchableHighlight>
        <ActivityIndicator
          animating={this.state.isLoading}
          color="#111"
          size="large">
        </ActivityIndicator>
        {showErr}
      </KeyboardAvoidingView>
    )
  }
}