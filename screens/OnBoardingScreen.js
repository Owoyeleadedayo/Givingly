import { View, Text, SafeAreaView, Image, Pressable, TouchableOpacity } from "react-native";
import React from 'react'
import { useNavigation } from "@react-navigation/native";


const OnBoardingScreen = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#9ACD32",
        minHeight: "100%",
        flexDirection: "column",
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          top: 30,
        }}
      >
        <Text style={{ fontSize: 40, fontFamily: "Ubuntu-Bold" }}>
          Let's get started
        </Text>
      </View>
      <Image
        source={require("../assets/Images/apply.png")}
        style={{
          height: 400,
          width: 400,
          resizeMode: "contain",
          alignItems: "center",
          justifyContent: "center",
          top: 50,
        }}
      />

      <Pressable
        onPress={() => navigation.navigate("SignUp")}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 8,
          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "center",
          top: 110,
          marginHorizontal: 40,
        }}
      >
        <Text
          style={{ color: "white", fontFamily: "Ubuntu-Medium", fontSize: 24 }}
        >
          Sign Up
        </Text>
      </Pressable>
      <View
        style={{
          flexDirection: "row",
          top: 120,
          marginHorizontal: 70,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 14, fontFamily: "Ubuntu-Light" }}>
          Already have an account?{" "}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Navigation")}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Ubuntu-Medium",
              color: "maroon",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default OnBoardingScreen;