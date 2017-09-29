import React from "react";
import { View } from "react-native";
import { Card, Button, Text } from "react-native-elements";
import { onSignOut } from "../auth";
import { AsyncStorage } from "react-native";

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: []
    }
  }

async componentDidMount() {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user !== null){
        this.setState({user: JSON.parse(user) });
      }
    } catch (error) {
      console.log(error)
    }
  }


  render() {
    const navigation = this.props.navigation;
    let shorName;
    if(this.state.user.first_name) {
     shorName =  this.state.user.first_name.split('')[0] + this.state.user.last_name.split('')[0]
    }

    return  (
      <View style={{ paddingVertical: 20 }}>
        <Card title={ `${this.state.user.first_name} ${this.state.user.last_name}`}>
          <View
            style={{
              backgroundColor: "#bcbec1",
              alignItems: "center",
              justifyContent: "center",
              width: 80,
              height: 80,
              borderRadius: 40,
              alignSelf: "center",
              marginBottom: 20
            }}
          >
            <Text style={{ color: "white", fontSize: 28 }}>{shorName}</Text>
          </View>
          <Button
            backgroundColor="#89bdd3"
            title="Salir"
            onPress={() => onSignOut().then(() => navigation.navigate("SignedOut"))}
          />
        </Card>
      </View>
    );
  }

}
