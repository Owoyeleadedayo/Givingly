import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  Pressable,
  Alert
} from "react-native";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from "yup";
import { SelectList } from "react-native-dropdown-select-list";

const DonationScreen = () => {
    const navigation = useNavigation();
    const [isChecked, setChecked] = useState(false);
    const [amount, setAmount] = useState("");
    const [select, setSelect] = useState("$");


    const handleCalculate = () => {
      let calculatedAmount = parseFloat(amount);

      if (isChecked) {
        calculatedAmount = calculatedAmount * 1.02; // Add 2%
      }

      alert(`Final Amount: $${calculatedAmount.toFixed(2)}`);
    };
       

    const data = [
      { key: "1", value: "$" },
      { key: "2", value: "£" },
      { key: "3", value: "₦" },
    ];

    const projectSchema = yup.object().shape({
      amount: yup.string().required("Please enter amount"),
    });

    const handleSubmit = (values, {resetForm}) => {
      resetForm();
      navigation.navigate("ThankYou"); 
    };

  return (
    <Formik
      initialValues={{
        amount: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={projectSchema}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
      }) => (
        <SafeAreaView
          style={{ flexDirection: "column", top: 20, marginHorizontal: 15 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView>
              <Text style={{ fontSize: 30, fontFamily: "Ubuntu-Medium" }}>
                Enter the Donation {"\n"}amount:
              </Text>
              <View
                style={{
                  top: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 7,
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      marginBottom: 10,
                      fontFamily: "Ubuntu-Medium",
                    }}
                  >
                    Select Currency:
                  </Text>
                    <SelectList
                    setSelected={(val) => setSelect(val)}
                    data={data}
                    save="value"
                    fontFamily="Ubuntu-Medium"
                    dropdownItemStyles={{
                      borderBottomWidth: 1,
                    }}
                    dropdownTextStyles={{
                      fontSize: 18,
                    }}
                    inputStyles={{ fontSize: 18 }}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Ubuntu-Medium",
                      left: 3,
                    }}
                  >
                    Enter amount:
                  </Text>
                  <TextInput
                    value={values.amount}
                    onChangeText={handleChange("amount")}
                    placeholder="20,000"
                    placeholderTextColor="grey"
                    keyboardType="numeric"
                    style={{
                      alignSelf: "stretch",
                      fontSize: 16,
                      height: 25,
                      borderBottomWidth: 1,
                      borderBottomColor: "black",
                      marginBottom: 10,
                      width: 230,
                      top: 20,
                    }}
                  />
                  {errors.amount && (
                    <Text
                      style={{
                        color: "crimson",
                        fontFamily: "Ubuntu-Medium",
                        paddingTop: 10,
                      }}
                    >
                      {touched.amount && errors.amount}
                    </Text>
                  )}
                </View>
              </View>
              <View
                style={{
                  top: 30,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: "Ubuntu-Light",
                  }}
                >
                  Add 2% for charity
                </Text>
                <Checkbox
                  style={{ margin: 8, borderRadius: 4, bottom: 2 }}
                  value={isChecked}
                  onValueChange={setChecked}
                  color={isChecked ? "#9ACD32" : undefined}
                />
              </View>
              <Pressable
                onPress={handleSubmit}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                  borderRadius: 8,
                  backgroundColor: "black",
                  alignItems: "center",
                  justifyContent: "center",
                  top: 400,
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
                  Pay Now
                </Text>
              </Pressable>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default DonationScreen;
