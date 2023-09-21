import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useFormik, FormikProvider } from "formik";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { db } from "../firebaseConfig";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      Signup();
    },
  });

  const Signup = async () => {
    if (
      formik.values.email !== "" &&
      formik.values.password !== "" &&
      formik.values.confirmPassword === formik.values.password
    ) {
      const docRef = await addDoc(collection(db, "users"), {
        email: formik.values.email,
        password: formik.values.password,
      });
      console.log("User has been added");
      formik.resetForm();
      navigation.navigate("LogIn");
    } else {
      alert("kindly fill all fields!");
    }
  };
  return (
      <ScrollView
        style={{ flexGrow: 1, flexDirection: "column", marginTop: 14 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView behavior="padding">
            <View>
              <Pressable onPress={() => navigation.navigate("Welcome")}>
                <AntDesign
                  name="arrowleft"
                  size={24}
                  color="black"
                  style={{ top: 10, left: 10, justifyContent: "flex-start" }}
                />
              </Pressable>
              <Image
                source={require("../assets/Images/mobile.png")}
                style={{
                  height: 300,
                  width: 400,
                  resizeMode: "contain",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 50,
                    fontFamily: "Ubuntu-Bold",
                    marginHorizontal: 15,
                  }}
                >
                  Sign Up
                </Text>
              </View>

              <FormikProvider value={formik}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 7,
                    justifyContent: "center",
                    marginTop: 10,
                    marginBottom: 12,
                  }}
                >
                  <MaterialCommunityIcons
                    name="email"
                    size={24}
                    color="black"
                  />
                  <View
                    style={{
                      width: 255,
                      height: 40,
                      borderColor: "gray",
                      borderWidth: 1,
                      borderRadius: 8,
                      paddingLeft: 18,
                      justifyContent: "center",
                      marginRight: 6,
                    }}
                  >
                    <TextInput
                      style={{
                        fontSize: 18,
                      }}
                      name="email"
                      value={formik.values.email}
                      onChangeText={formik.handleChange("email")}
                      placeholder="Email"
                      placeholderTextColor="grey"
                      keyboardType="email-address"
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    justifyContent: "center",
                    marginBottom: 13,
                  }}
                >
                  <FontAwesome
                    name="lock"
                    size={24}
                    color="black"
                    style={{ justifyContent: "center", top: 8 }}
                  />
                  <View
                    style={{
                      width: 255,
                      height: 40,
                      borderColor: "gray",
                      borderWidth: 1,
                      borderRadius: 8,
                      paddingLeft: 18,
                      justifyContent: "center",
                    }}
                  >
                    <TextInput
                      style={{ fontSize: 18 }}
                      name="password"
                      value={formik.values.password}
                      onChangeText={formik.handleChange("password")}
                      placeholder="Password"
                      placeholderTextColor={"grey"}
                      secureTextEntry={true}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      justifyContent: "center",
                    }}
                  >
                    <FontAwesome
                      name="lock"
                      size={24}
                      color="black"
                      style={{ justifyContent: "center", top: 5 }}
                    />
                    <View
                      style={{
                        width: 255,
                        height: 40,
                        borderColor: "gray",
                        borderWidth: 1,
                        borderRadius: 8,
                        paddingLeft: 18,
                        justifyContent: "center",
                      }}
                    >
                      <TextInput
                        style={{
                          fontSize: 18,
                        }}
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChangeText={formik.handleChange("confirmPassword")}
                        placeholder="Confirm Password"
                        disabled={
                          formik.values.confirmPassword !==
                          formik.values.password
                        }
                        placeholderTextColor="grey"
                        secureTextEntry={true}
                      />
                    </View>
                  </View>
                  {formik.values.confirmPassword !== formik.values.password && (
                    <Text
                      style={{
                        color: "crimson",
                        fontFamily: "Ubuntu-Medium",
                      }}
                    >
                      Password does not match
                    </Text>
                  )}
                </View>
              </FormikProvider>
              <Pressable
                onPress={formik.handleSubmit}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                  borderRadius: 8,
                  backgroundColor: "black",
                  alignItems: "center",
                  justifyContent: "center",
                  top: 20,
                  marginHorizontal: 30,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontFamily: "Ubuntu-Medium",
                    fontSize: 26,
                  }}
                >
                  Sign Up
                </Text>
              </Pressable>
              <View
                style={{
                  top: 23,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  left: 18,
                  gap: 2,
                  paddingHorizontal: 20,
                }}
              >
                <Text
                  style={{
                    color: "gray",
                    fontFamily: "Ubuntu-Medium",
                    fontSize: 16,
                  }}
                >
                  Already have an account.
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: "crimson",
                      fontFamily: "Ubuntu-Medium",
                      fontSize: 16,
                    }}
                    onPress={() => navigation.navigate("LogIn")}
                  >
                    Log In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ScrollView>
  );
};

export default SignUpScreen;
