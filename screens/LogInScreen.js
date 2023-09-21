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
  ActivityIndicator,
} from "react-native";
import { useFormik, FormikProvider } from "formik";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { db } from "../firebaseConfig";
import {
  getDocs,
  collection,
  onSnapshot,
  doc,
  query,
  where,
} from "firebase/firestore";

const LogInScreen = () => {
  const navigation = useNavigation();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      login();
    },
  });

  const login = async () => {
    if (formik.values.email !== "" && formik.values.password !== "") {
      const q = query(
        collection(db, "users"),
        where("email", "==", formik.values.email),
        where("password", "==", formik.values.password)
      );

      const querySnapshot = await getDocs(q);
      if(querySnapshot.empty){
        formik.resetForm();
        alert('Email or Password is not correct')
      }else{
        formik.resetForm();
        navigation.navigate('HomePage');
      }
    } else {
      alert("kindly Supply Email and Password");
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (values) => {
    setIsLoading(true);

    // Simulate a signup process (Replace with your actual signup logic)
    setTimeout(() => {
      setIsLoading(false);
      alert("Signup Successful!"); // Replace with your desired success action
    }, 2000);
  };
  return (
      <ScrollView
        style={{ flexGrow: 1, flexDirection: "column", marginTop: 14 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView behavior="padding">
            <View>
              <Pressable onPress={() => navigation.navigate("SignUp")}>
                <AntDesign
                  name="arrowleft"
                  size={24}
                  color="black"
                  style={{ top: 10, left: 10, justifyContent: "flex-start" }}
                />
              </Pressable>
              <Image
                source={require("../assets/Images/Login.png")}
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
                  Log In
                </Text>
              </View>

              <FormikProvider value={formik}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    justifyContent: "center",
                    marginTop: 20,
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
                    alignItems: "center",
                    gap: 10,
                    justifyContent: "center",
                  }}
                >
                  <FontAwesome name="lock" size={24} color="black" />
                  <View
                    style={{
                      width: 255,
                      height: 40,
                      borderColor: "gray",
                      borderWidth: 1,
                      borderRadius: 8,
                      paddingLeft: 18,
                      justifyContent: "center",
                      marginVertical: 14,
                    }}
                  >
                    <TextInput
                      style={{
                        fontSize: 18,
                      }}
                      name="password"
                      value={formik.values.password}
                      onChangeText={formik.handleChange("password")}
                      placeholder="Password"
                      placeholderTextColor={"grey"}
                      secureTextEntry={true}
                    />
                  </View>
                </View>
              </FormikProvider>
              {isLoading ? (
                <ActivityIndicator size="large" color="crimson" />
              ) : (
                <Pressable
                  onPress={formik.handleSubmit}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 14,
                    borderRadius: 8,
                    backgroundColor: "black",
                    alignItems: "center",
                    justifyContent: "center",
                    top: 5,
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
                    Log In
                  </Text>
                </Pressable>
              )}
              <View
                style={{
                  top: 7,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  left: 8,
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
                  Don't have an account?.
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: "crimson",
                      fontFamily: "Ubuntu-Medium",
                      fontSize: 16,
                    }}
                    onPress={() => navigation.navigate("SignUp")}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ScrollView>
  );
};

export default LogInScreen;
