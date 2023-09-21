import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import WelcomeScreen from "./screens/WelcomeScreen";
import NavigationScreen from "./screens/NavigationScreen";
import OnBoardingScreen from "./screens/OnBoardingScreen";
import SignUpScreen from "./screens/SignUpScreen";
import LogInScreen from "./screens/LogInScreen";
import MyProjectsScreen from "./screens/MyProjectsScreen";
import SupportPageScreen from "./screens/DonatePageScreen";
import DonatePageScreen from "./screens/DonatePageScreen";
import TopBar from "./components/TopBar";
import HomePageScreen from "./screens/HomePageScreen";
import Icon from "react-native-vector-icons/FontAwesome5";
import NewProjectScreen from "./screens/NewProjectScreen";
import DonationScreen from "./screens/DonationScreen";
import ThankYouScreen from "./screens/ThankYouScreen";
import DetailScreen from "./screens/DetailScreen";



const Drawer = createDrawerNavigator();
const MyTabs = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#9ACD32",
        },
        drawerStyle: {
          backgroundColor: "black",
          width: 240,
        },
        drawerLabelStyle: {
          fontSize: 20,
          fontFamily: "Ubuntu-Medium",
          color: "white",
        },
        drawerIcon: ({ color, size }) => <Icon color="white" size={size} />,
        title: "Givingly",
        headerTitleStyle: { fontFamily: "Ubuntu-Bold", fontSize: 24 },
      }}
    >
    {
      
    }
      <Drawer.Screen
        name="Home"
        component={HomePageScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Icon name="home" size={size} color={"white"} />
          ),
          drawerLabel: "Home",
        }}
      />
      <Drawer.Screen
        name="Projects"
        component={MyProjectsScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Icon name="tools" size={size} color={"white"} />
          ),
          drawerLabel: "My Projects",
        }}
      />
    </Drawer.Navigator>
  );
}

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#9ACD32",
          },
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Navigation"
          component={NavigationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OnBoarding"
          component={OnBoardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LogIn"
          component={LogInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Donation"
          component={DonationScreen}
          options={{
            headerShown: true,
            title: "Donation",
            headerTitleStyle: { fontFamily: "Ubuntu-Bold", fontSize: 24 },
          }}
        />
        <Stack.Screen name="HomePage" component={MyTabs} />
        <Stack.Screen name="DonatePage" component={DonatePageScreen} />
        <Stack.Screen name="MyProjects" component={MyTabs} />
        <Stack.Screen
          name="Tabs"
          component={MyTabs}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="NewProject"
          component={NewProjectScreen}
          options={{
            headerShown: true,
            title: "New Project",
            headerTitleStyle: { fontFamily: "Ubuntu-Bold", fontSize: 24 },
          }}
        />
        <Stack.Screen
          name="ThankYou"
          component={ThankYouScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
            headerShown: true,
            title: "",
            headerTitleStyle: { fontFamily: "Ubuntu-Bold", fontSize: 24 },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
