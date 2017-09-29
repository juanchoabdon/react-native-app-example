import React from "react";
import { Platform, StatusBar } from "react-native";
import { StackNavigator, TabNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import NewOrders from "./screens/NewOrders";
import ActiveOrders from "./screens/ActiveOrders";
import FinishedOrders from "./screens/FinishedOrders";
import Article from "./screens/Article";
import Profile from "./screens/Profile";

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const SignedOut = StackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: "Ingresar",
      headerStyle
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "Sign Up",
      headerStyle
    }
  }
});

export const NewOrdersStack  = StackNavigator({
  NewOrders: {
    screen: NewOrders,
    navigationOptions: {
      title: "Ordenes nuevas",
      headerStyle
    }
  },
  Article: {
    screen: Article,
    navigationOptions: ({ navigation }) => ({
      headerStyle,
      title: navigation.state.params.description,
      tabBarVisible: false,
      gesturesEnabled: false,
    })
  }
});

export const ActiveOrdersStack  = StackNavigator({
  ActiveOrders: {
    screen: ActiveOrders,
    navigationOptions: {
      title: "Ordenes activas",
      headerStyle
    }
  },
  Article: {
    screen: Article,
    navigationOptions: ({ navigation }) => ({
      headerStyle,
      title: navigation.state.params.description,
      tabBarVisible: false,
      gesturesEnabled: false,
    })
  }
});

export const FinishedOrdersStack  = StackNavigator({
  FinishedOrders: {
    screen: FinishedOrders,
    navigationOptions: {
      title: "Ordenes finializadas",
      headerStyle
    }
  },
  Article: {
    screen: Article,
    navigationOptions: ({ navigation }) => ({
      headerStyle,
      title: navigation.state.params.description,
      tabBarVisible: false,
      gesturesEnabled: false,
    })
  }
});

export const ProfileStack  = StackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: "Mi cuenta",
      headerStyle
    }
  },
});

export const SignedIn = TabNavigator(
  {
    NewOrders: {
      screen: NewOrdersStack,
      navigationOptions: {
        tabBarLabel: "Nuevas",
        tabBarIcon: <Icon name="add-location" size={20} color="#fff" />
      }
    },
    ActiveOrders: {
      screen: ActiveOrdersStack,
      navigationOptions: {
        tabBarLabel: "Activas",
        tabBarIcon:  <Icon name="map" size={20} color="#fff" />
      }
    },
    FinishedOrders: {
      screen: FinishedOrdersStack ,
      navigationOptions: {
        tabBarLabel: "Finalizadas",
        tabBarIcon:  <Icon name="archive" size={20} color="#fff" />
      }
    },
    Profile: {
      screen: ProfileStack ,
      navigationOptions: {
        tabBarLabel: "Mi cuenta",
        tabBarIcon:  <Icon name="person" size={20} color="#fff" />
      }
    }
  },
  {
    tabBarOptions: {
      style: {
        paddingTop:  0,
        backgroundColor: '#34536E'
      },
      indicatorStyle: {
        backgroundColor: '#34536E'
      },
      labelStyle: {
       fontSize: 8,
       marginTop: 2,
       marginBottom: 0
     },
      showIcon: true,
      showLabel: true
    },
    tabBarPosition: 'bottom',
  }
);


export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      SignedIn: {
        screen: SignedIn,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      SignedOut: {
        screen: SignedOut,
        navigationOptions: {
          gesturesEnabled: false
        }
      }
    },
    {
      headerMode: "none",
      mode: "modal",
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
