import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView
} from "react-native";
import api from "./services/api";

export default class App extends Component {
  state = {
    data: [],
    user: '',
    noLogged: true,
  };

  login = async () => {
    const resp = await api.get("/" + this.state.user + "/repos");
    this.setState({ data: resp.data });
    this.setState({ noLogged: false })
  };
  logoff = () => {
    this.setState({ user: '' })
    this.setState({ data: [] })
    this.setState({ noLogged: true })
  }
  render() {
    const { data } = this.state;
    return (
      <ScrollView style={styles.conteinerScroll} >
      <View style={styles.container}>
          <Text style={{
            fontSize: 25,
            textAlign: "center",
            margin: 15,
            color: 'red',
          }}>Pratica api gitGub </Text>
        {this.state.noLogged &&
          <View>
            <TextInput style={styles.containerForm}
              placeholder="Informe o usuário"
              autoCapitalize="none"
              onChangeText={text => {
                this.setState({ user: text });
              }}
            />

          </View>
        }

        <View style={styles.containerButton}>
          {this.state.noLogged &&
            <Button title="logar" onPress={this.login} />
          }
          {!this.state.noLogged &&
            <Button title="Sair" onPress={this.logoff} />
          }
        </View>
        {!this.state.noLogged &&
          <View style={styles.containerRepo}>
            {data.map(repo => (
              <Text key={repo.id} style={styles.text}>
                {repo.name}
              </Text>
            ))}

          </View>
        }
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  conteinerScroll:{
    flex: 1,
    backgroundColor: "#b0c4de",
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: "center",
    backgroundColor: "#b0c4de"
  },

  containerRepo: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    margin: 20,
  },

  containerForm: {
    width: 300,
    padding: 5,
    backgroundColor: 'white',
  },

  containerButton: {
    margin: 15,
  },

  text: {
    fontSize: 15,
    textAlign: "center",
    margin: 5,
    color: 'orange',
    fontWeight: 'bold'
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
