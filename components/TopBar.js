import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

const TopBar = ({ title, backgroundColor }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: "100%",
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#9ACD32",
        paddingHorizontal: 10,
      }}
    >
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Entypo name="menu" size={24} color="black" />
      </TouchableOpacity>
      <View>
        <Text style={{ fontSize: 26, fontFamily: "Ubuntu-Medium" }}>
          Givingly
        </Text>
      </View>
      <FontAwesome name="search" size={24} color="black" />
    </View>
  );
};

export default TopBar