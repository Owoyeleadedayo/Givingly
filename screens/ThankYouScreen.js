import { View, Text, SafeAreaView, Pressable } from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const ThankYouScreen = () => {
        const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{ flexDirection: "column", top: 10, marginHorizontal: 15 }}
    >
      <Lottie
        source={require("../assets/lottie-animation/animation_llaxkpiy.json")}
        loop={true}
        autoPlay
        style={{
          width: 350,
          height: 300,
          alignSelf: "center",
        }}
      />
      <Text
        style={{
          fontSize: 35,
          fontFamily: "Ubuntu-Medium",
          textAlign: 'center'
        }}
      >
        for your support
      </Text>
      <Pressable
        onPress={() => navigation.navigate("Donation")}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 14,
          borderRadius: 8,
          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "center",
          top: 200,
          marginHorizontal: 5,
        }}
      >
        <Text
          style={{
            color: "white",
            fontFamily: "Ubuntu-Medium",
            fontSize: 26,
          }}
        >
          Make another Donation
        </Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("HomePage")}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 14,
          borderRadius: 8,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
          top: 220,
          marginHorizontal: 5,
          borderColor: 'black',
          borderWidth: 1
        }}
      >
        <Text
          style={{
            color: "black",
            fontFamily: "Ubuntu-Medium",
            fontSize: 26,
          }}
        >
          Go to homepage
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default ThankYouScreen