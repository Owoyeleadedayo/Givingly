import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";


const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#9ACD32",
        flexDirection: "column",
        minHeight: "100%",
      }}
    >
      <Text
        style={{
          fontFamily: "Ubuntu-Bold",
          fontSize: 80,
          marginHorizontal: 15,
        }}
      >
        Givingly
      </Text>
      <Image
        source={require("../assets/Images/undraw.png")}
        style={{
          height: 350,
          width: 400,
          resizeMode: "cover",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
      <View>
        <Text
          style={{
            fontSize: 30,
            fontFamily: "Ubuntu-Medium",
            marginHorizontal: 15,
          }}
        >
          Supporting great causes, {"\n"}made easy
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Ubuntu-Light",
            padding: 15,
          }}
        >
          We have helped over 3,500 projects and causes. Sign in today and get
          your idea kicked off or help others kick off their amazing projects.
        </Text>
      </View>
      <Pressable
        onPress={() => navigation.navigate("SignUp")}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 14,
          borderRadius: 8,
          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "center",
          top: 20,
          marginHorizontal: 15,
        }}
      >
        <Text
          style={{ color: "white", fontFamily: "Ubuntu-Medium", fontSize: 24 }}
        >
          Start today
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});


