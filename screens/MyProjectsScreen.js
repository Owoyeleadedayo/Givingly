import { View, Text, SafeAreaView, Image, Pressable } from 'react-native'
import React from 'react';
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import ProgressBar from '../components/ProgressBar';

const MyProjectsScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{ flexDirection: "column", marginHorizontal: 10, top: 20 }}
    >
      <Text
        style={{
          fontSize: 50,
          fontFamily: "LibreFranklin-SemiBold",
          marginHorizontal: 5,
        }}
      >
        My Projects
      </Text>
      <Image
        source={require("../assets/Images/corrn.jpg")}
        style={{
          height: 250,
          width: 400,
          resizeMode: "contain",
          alignItems: "center",
          justifyContent: "center",
          top: 10,
        }}
      />
      <Text
        style={{
          top: 20,
          fontSize: 18,
          fontFamily: "LibreFranklin-Regular",
          marginHorizontal: 5,
        }}
      >
        Feed 50,000 Nigerians Corn
      </Text>
      <View style={{ alignItems: "center", top: 30 }}>
        <ProgressBar progress={35} />
      </View>
      <View
        style={{
          top: 40,
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 5,
        }}
      >
        <View>
          <Text style={{ fontSize: 18, fontFamily: "LibreFranklin-Regular" }}>
            Raised:
          </Text>
          <Text style={{ fontSize: 22, fontFamily: "LibreFranklin-Regular" }}>
            $1,000
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 18, fontFamily: "LibreFranklin-Regular" }}>
            Goal:
          </Text>
          <Text style={{ fontSize: 22, fontFamily: "LibreFranklin-Regular" }}>
            $3,000
          </Text>
        </View>
      </View>
      <View
        style={{
          width: 390,
          height: 1.5,
          backgroundColor: "gray",
          top: 50,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 5,
          top: 70,
        }}
      >
        <Text style={{ fontSize: 22, fontFamily: "LibreFranklin-Regular" }}>
          Statistics
        </Text>
        <Pressable>
          <AntDesign name="right" size={24} color="black" />
        </Pressable>
      </View>
      <View
        style={{
          width: 390,
          height: 1.5,
          backgroundColor: "gray",
          top: 100,
        }}
      />
      <Pressable
        onPress={() => {
          navigation.navigate("NewProject");
        }}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 14,
          borderRadius: 8,
          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "center",
          top: 170,
          marginHorizontal: 5,
        }}
      >
        <Text
          style={{ color: "white", fontFamily: "Ubuntu-Medium", fontSize: 26 }}
        >
          New Project
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default MyProjectsScreen;

