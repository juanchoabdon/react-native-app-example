import React from "react";
import { ScrollView, Text, Linking, View, RefreshControl } from "react-native";
import { Card, Button } from "react-native-elements";
import services from '../services/employees';
import { AsyncStorage } from "react-native";

export default class NewOrders extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      refreshing: false,
    }
    this.getOrders = this.getOrders.bind(this);
  }

 componentDidMount() {
   this.getOrders()
 }

 componentDidUpdate() {
   console.log("siii");
 }

 async getOrders() {
   let user = await AsyncStorage.getItem('user');
   user = JSON.parse(user);
    try {
          let response = await services.getNewOrders(user.id);
          let orders = response.data;
          this.setState({orders})
        } catch(error) {
          alert(error.message_error);
        }
 }

async  _onRefresh() {
   this.setState({refreshing: true});
   await this.getOrders();
   this.setState({refreshing: false});
 }

 render() {
   return (
     <View style={{
         flex: 1
         }}>
       <ScrollView contentContainerStyle={{ paddingVertical: 20 }}

       refreshControl={
       <RefreshControl
           refreshing={this.state.refreshing}
           onRefresh={this._onRefresh.bind(this)}
         />
       }

        >
         {this.state.orders.map( (order) => (
           <Card title={order.description} image={{uri: 'https://www.wired.com/wp-content/uploads/2016/11/GoogleMap-1-200x100-e1479510769475.jpg'}} key={order.id}>
             <Text style={{ marginBottom: 10 }}>

             </Text>
             <Button
               backgroundColor="#89bdd3"
               title="Ver"
               onPress={() => this.props.navigation.navigate('Article' , order) }
             />
           </Card>
         ))}
       </ScrollView>
     </View>
   );
 }

}
