import { View, Text, SafeAreaView, Pressable, TouchableOpacity, Alert } from "react-native";
import React, { useState } from 'react';
import Checkbox from "expo-checkbox";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const NavigationScreen = () => {
  const [isSelected, setIsSelected] = useState(false);
  const [selected, setSelected] = useState(false);

  const navigation = useNavigation();

  const handleCheckboxToggle = () => {
    setIsSelected(!isSelected); 
    setSelected(false);
  };

  const handleCheckboxToggleTwo = () => {
    setSelected(!selected);
    setIsSelected(false);
  }

  const handleNavigate = () => {
    if(!isSelected && !selected){
       Alert.alert(
         "Alert",
         "Please check at least one checkbox before proceeding.",
         [
           {
             text: "Cancel",
             onPress: () => console.log("Cancel Pressed"),
             style: "cancel",
           },
           { text: "OK", onPress: () => console.log("OK Pressed") },
         ]
       );
    } else if (isSelected) {
      navigation.navigate('HomePage');
    } else if (selected) {
      navigation.navigate("MyProjects");
    }
  }
  return (
    <SafeAreaView style={{ flexDirection: "column", marginVertical: 10 }}>
      <Text
        style={{ textAlign: "center", fontFamily: "Ubuntu-Bold", fontSize: 24 }}
      >
        I want to:
      </Text>
      <View
        style={{
          flexDirection: "row",
          top: 100,
          marginHorizontal: 30,
          gap: 10,
          marginTop: 25,
          left: 60,
        }}
      >
        <TouchableOpacity>
          <Checkbox
            value={isSelected}
            onValueChange={handleCheckboxToggle}
            color={isSelected ? "#9ACD32" : undefined}
            style={{ marginTop: 25, padding: 10, borderRadius: 5 }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 55, fontFamily: "Ubuntu-Bold" }}>Support</Text>
        <View style={{ flexDirection: "column", top: 60, right: 220 }}>
          <Text style={{ fontSize: 24, fontFamily: "LibreFranklin-Regular" }}>
            other projects
          </Text>
        </View>
      </View>
      <View
        style={{
          width: 390,
          height: 1.5,
          backgroundColor: "gray",
          top: 170,
          left: 10,
          right: 10,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          top: 170,
          marginHorizontal: 30,
          gap: 10,
          marginTop: 25,
          left: 60,
        }}
      >
        <Pressable>
          <Checkbox
            value={selected}
            onValueChange={handleCheckboxToggleTwo}
            color={selected ? "#9ACD32" : undefined}
            style={{ marginTop: 25, padding: 10, borderRadius: 5 }}
          />
        </Pressable>
        <Text style={{ fontSize: 55, fontFamily: "Ubuntu-Bold" }}>
          Kick-off
        </Text>
        <View style={{ flexDirection: "column", top: 60, right: 220 }}>
          <Text style={{ fontSize: 24, fontFamily: "LibreFranklin-Regular" }}>
            my project
          </Text>
        </View>
      </View>
      <Pressable
        style={{
          width: 70,
          height: 40,
          borderWidth: 1,
          borderRadius: 8,
          justifyContent: "center",
          alignItems: "center",
          marginRight: 10,
          flexDirection: "row",
          top: 400,
          left: 335,
          right: 40,
          backgroundColor: "#9ACD32",
          borderColor: "#9ACD32",
        }}
        onPress={handleNavigate}
      >
        <Text style={{ fontSize: 16, fontFamily: "LibreFranklin-Regular" }}>
          Next
        </Text>
        <AntDesign name="arrowright" size={24} color="black" />
      </Pressable>
    </SafeAreaView>
  );
}

export default NavigationScreen