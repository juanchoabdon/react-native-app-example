import React from "react";
import { ScrollView, Text, Linking, View , Image, TouchableHighlight } from "react-native";
import { Card, Button } from "react-native-elements";
import { MapView } from 'expo';
import services from '../services/maps';
import ordersServices from '../services/orders';

export default class Article extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      order: this.props.navigation.state.params,
      coords: [],
      origin: {
        latitude: 0,
        longitude: 0
      },
      destination: {
        latitude: 0,
        longitude: 0
      },
      metrics: {
        distance: {},
        duration: {}
      },
      info: {
        origin_addresses: '',
        destination_addresses: ''
      }
    }
     this.changeOrderStatus = this.changeOrderStatus.bind(this);
     this.openGoogleMaps = this.openGoogleMaps.bind(this);
  }

  async componentDidMount() {
     const order = this.state.order;
     navigator.geolocation.getCurrentPosition( async (position) => {
        let origin =  `${position.coords.latitude},${position.coords.longitude}`;
        let destination = `${order.lat_destiny},${order.lng_destiny}`;

        let responseRoute = await  services.getRoute(origin, destination);
        let responseMetrics = await services.getDistanceAndDuration(origin, destination);
          this.setState({
            coords: services.decode(responseRoute.routes[0].overview_polyline.points),
            origin: { latitude:position.coords.latitude, longitude: position.coords.longitude },
            destination: { latitude: order.lat_destiny, longitude: order.lng_destiny },
            metrics: responseMetrics.rows[0].elements[0],
            info: { origin_addresses: responseMetrics.origin_addresses, destination_addresses: responseMetrics.destination_addresses }
          })
     })
  }


  async changeOrderStatus() {
    const navigation = this.props.navigation
    const order = this.state.order;
    order.status++;
    let response = await ordersServices.changeOrderStatus(order.id, order.status);
    this.setState({order} , ()=> console.log(this.state.order))
  }

  openGoogleMaps() {
    let destination = `${this.state.destination.latitude},${this.state.destination.longitude}`;
    let url = `https://www.google.com/maps/dir/?api=1&parameters&destination=${destination}&dir_action=navigate`;
    Linking.openURL(url);
  }

 render() {
   return (
     <View style={{
          flex: 1,
          paddingBottom: 30
        }}>
      <MapView
        style={{
             flex: 0.5,
        }}
        region={{
          latitude: this.state.origin.latitude,
          longitude: this.state.origin.longitude,
          latitudeDelta: 0.096,
          longitudeDelta: 0.04,
        }}
      >
      <MapView.Polyline
          coordinates={[
              ...this.state.coords,
          ]}
          strokeWidth={4}
          strokeColor="#636363"
      />
      <MapView.Marker
        coordinate={{ latitude: this.state.origin.latitude,
                longitude: this.state.origin.longitude } }
      />
      <MapView.Marker
        coordinate={{ latitude: this.state.destination.latitude,
                longitude: this.state.destination.longitude } }
      />
      </MapView>
      <Text style={{padding: 15}}>{this.state.order.description}</Text>
      <Text style={{padding: 15}}>{ `${this.state.info.origin_addresses} a ${this.state.info.destination_addresses}`}</Text>
      <Text style={{padding: 15}}>{this.state.metrics.distance.text}</Text>
      <Text style={{padding: 15}}>{this.state.metrics.duration.text}</Text>

      { this.state.order.status === 1 &&
        <Button
          backgroundColor="rgba(0, 122, 12, 0.5)"
          title="Empezar"
          onPress={this.changeOrderStatus}
        /> }
      { this.state.order.status === 2 &&
        <View>
          <Button
            marginTop="10"
            color="#3A3A3A"
            backgroundColor="#FFFFFF"
            title="Abrir ruta"
            onPress={this.openGoogleMaps}
          />
        <Button
          marginTop="10"
          backgroundColor="rgba(198, 36, 36, 0.58)"
          title="Acabar"
          onPress={this.changeOrderStatus}
        />
       </View>
       }
     </View>
   );
 }

}
