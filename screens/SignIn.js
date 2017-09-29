import React from "react";
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from "../auth";
import * as firebase from "firebase";
import services from '../services/employees';

firebase.initializeApp({
    apiKey: "AIzaSyCAO0U_DA_uRd7IOBT7EtWT2WPlrvdVSno",
    authDomain: "proyx-8922d.firebaseapp.com",
    databaseURL: "https://proyx-8922d.firebaseio.com",
    projectId: "proyx-8922d",
    storageBucket: "proyx-8922d.appspot.com",
    messagingSenderId: "682511304896"
});

export default class SignIn extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       email: '',
       pass: '',
       error: ''
     }
     this.setEmail = this.setEmail.bind(this);
     this.setPass = this.setPass.bind(this);
     this.login = this.login.bind(this);
   }


  async login() {
    const navigation = this.props.navigation;
    try {
       await firebase.auth()
            .signInWithEmailAndPassword(this.state.email.trim(), this.state.pass);
      try {
        let response = await services.login(this.state.email);
        onSignIn(response.data).then(() => navigation.navigate("SignedIn"));
      } catch(error) {
        console.log(error)
      }

    } catch (error) {
        alert(error.toString())
    }
  }

  setEmail(email) {
    this.setState({
      email
    })
  }

  setPass(pass) {
    this.setState({
      pass
    })
  }

 render() {
   return (
     <View style={{ paddingVertical: 20 }}>
       <Card>
         <FormLabel>Email</FormLabel>
         <FormInput value={this.state.email} onChangeText={this.setEmail} placeholder="Email..." />
         <FormLabel>Contraseña</FormLabel>
         <FormInput value={this.state.pass} onChangeText={this.setPass} secureTextEntry placeholder="Contraseña..." />

         <Button
           buttonStyle={{ marginTop: 20 }}
           backgroundColor="#89bdd3"
           title="INGRESAR"
           onPress={this.login}
         />
       </Card>
     </View>
   )
 }

}
