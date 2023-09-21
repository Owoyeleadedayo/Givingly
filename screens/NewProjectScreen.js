import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Alert,
  Button,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DatePicker from "react-native-date-ranges";
import * as ImagePicker from "expo-image-picker";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import * as yup from "yup";
import { SelectList } from "react-native-dropdown-select-list";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { storage, db } from "../firebaseConfig";

const NewProjectScreen = () => {
  const [selectedDate, setSelected] = useState(new Date());
  const [image, setImage] = useState("");
  const [select, setSelect] = useState("$");
  const navigation = useNavigation();
  const [files, setFiles] = useState([]);

  const data = [
    { key: "1", value: "$" },
    { key: "2", value: "£" },
    { key: "3", value: "₦" },
  ];

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "files"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type == "added") {
          console.log("New File", change.doc.data());
          setFiles((prevFiles) => [...prevFiles, change.doc.data()]);
        }
      });
    });

    return () => unsubscribe();
  }, []);

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      // upload the image
      await upLoadImage(result.assets[0].uri, "image");
    }
  }

  async function upLoadImage(uri, fileType) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, "Images/" + new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob);

    //Listen for events

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("file available at", downloadURL);
          await saveImage(fileType, downloadURL, new Date().toISOString());
          setImage(downloadURL);
        });
      }
    );
  }

  async function saveImage(fileType, url, createdAt) {
    try {
      const docRef = await addDoc(collection(db, "files"), {
        fileType,
        url,
        createdAt,
      });
      console.log("document saved correctly", docRef.id);
    } catch (e) {
      console.log(e);
    }
  }

  // const handleFormSubmit = async (values) => {
  //   const response = await fetch(values);
  //   const storageRef = ref(storage, "Values/" + new Date().getTime());
  // };

  const handleDateChange = (date) => {
    setSelected(date);
    console.log(date);
  };

  const minSelectableDate = new Date(2023, 7, 29);

  const customButton = (onConfirm) => {
    return (
      <Button
        onPress={onConfirm}
        style={{
          container: { width: "80%", marginHorizontal: "3%" },
          text: { fontSize: 20, color: "black" },
        }}
        primary
        title="Submit"
      />
    );
  };

  const projectSchema = yup.object().shape({
    projectName: yup
      .string()
      .min(2, "Too Short!")
      .max(30, "Too Long!")
      .required("This is required"),
    aboutProject: yup
      .string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("This is required"),
    goal: yup.string().required("Add Goal"),
  });

  const handleSubmit = (values, { resetForm }) => {
    resetForm();
    navigation.navigate("HomePage");
  };

  const addProject = async ({ projectName, goal, aboutProject }) => {
    const docRef = await addDoc(collection(db, "Projects"), {
      projectName,
      goal,
      aboutProject,
      image,
    });

    navigation.navigate("Donation");
  };

  return (
    <Formik
      initialValues={{
        projectName: "",
        aboutProject: "",
        goal: "",
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
        handleReset,
        touched,
      }) => (
        <SafeAreaView
          style={{ flex: 1, flexDirection: "column", marginHorizontal: 15 }}
        >
          <ScrollView style={{ flexGrow: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <KeyboardAvoidingView>
                <Text
                  style={{
                    fontSize: 40,
                    fontFamily: "Ubuntu-Medium",
                    marginTop: 50,
                  }}
                >
                  Kick off {"\n"}your project
                </Text>
                <View style={{ top: 20 }}>
                  <Text style={{ fontSize: 18, fontFamily: "Ubuntu-Medium" }}>
                    Name of your project
                  </Text>
                  <TextInput
                    placeholder="Want to feed people more agbado"
                    value={values.projectName}
                    onChangeText={handleChange("projectName")}
                    multiline
                    autoCorrect={false}
                    placeholderTextColor="grey"
                    style={{
                      height: 40,
                      borderBottomWidth: 1,
                      borderBottomColor: "black",
                      width: 380,
                      top: 3,
                      fontSize: 16,
                      paddingTop: 18
                    }}
                  />
                  {errors.projectName && (
                    <Text
                      style={{
                        color: "crimson",
                        fontFamily: "Ubuntu-Medium",
                      }}
                    >
                      {touched.projectName && errors.projectName}
                    </Text>
                  )}
                </View>
                <View style={{ top: 30 }}>
                  <Text style={{ fontSize: 18, fontFamily: "Ubuntu-Medium" }}>
                    About your project
                  </Text>
                  <TextInput
                    placeholder="Tell us about your project"
                    value={values.aboutProject}
                    onChangeText={handleChange("aboutProject")}
                    multiline
                    autoCorrect={false}
                    placeholderTextColor="grey"
                    style={{
                      height: 60,
                      borderBottomWidth: 1,
                      borderBottomColor: "black",
                      width: 380,
                      fontSize: 16,
                      top: 3,
                      paddingTop: 37
                    }}
                  />
                  {errors.aboutProject && (
                    <Text
                      style={{
                        color: "crimson",
                        fontFamily: "Ubuntu-Medium",
                      }}
                    >
                      {touched.aboutProject && errors.aboutProject}
                    </Text>
                  )}
                </View>
                <View
                  style={{
                    top: 40,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: 5,
                    gap: 7,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 18,
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
                        fontSize: 18,
                        fontFamily: "Ubuntu-Medium",
                        left: 3,
                      }}
                    >
                      Add your Goal:
                    </Text>
                    <TextInput
                      value={values.goal}
                      onChangeText={handleChange("goal")}
                      placeholder="20,000"
                      placeholderTextColor="grey"
                      keyboardType="decimal-pad"
                      style={{
                        alignSelf: "stretch",
                        fontSize: 16,
                        height: 25,
                        borderBottomWidth: 1,
                        borderBottomColor: "black",
                        marginBottom: 10,
                        width: 380,
                        top: 20,
                      }}
                    />
                    {errors.goal && (
                      <Text
                        style={{
                          color: "crimson",
                          fontFamily: "Ubuntu-Medium",
                          paddingTop: 10,
                        }}
                      >
                        {touched.goal && errors.goal}
                      </Text>
                    )}
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: 5,
                    top: 50,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: "Ubuntu-Medium",
                      }}
                    >
                      Add your timeline
                    </Text>
                    <TextInput
                      placeholder=""
                      placeholderTextColor="grey"
                      style={{
                        alignSelf: "stretch",
                        fontSize: 20,
                        height: 25,
                        borderBottomWidth: 1,
                        borderBottomColor: "black",
                        marginBottom: 10,
                        width: 320,
                        top: 14,
                      }}
                    />
                  </View>
                  <Pressable
                    style={{
                      top: 30,
                      marginHorizontal: 5,
                      width: 40,
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 7,
                      borderWidth: 1,
                      borderColor: "black",
                    }}
                  >
                    <Ionicons
                      name="calendar"
                      size={24}
                      color="black"
                      style={{ top: 25 }}
                    />
                    <DatePicker
                      style={{
                        width: 350,
                        height: 50,
                        borderRadius: 0,
                        borderWidth: 0,
                      }}
                      customStyles={{
                        placeholderText: {
                          fontSize: 15,
                          right: 180,
                          marginBottom: 35,
                          paddingBottom: 20,
                          paddingRight: 30,
                        },
                        headerStyle: {
                          backgroundColor: "black",
                        },
                        contentText: {
                          fontSize: 16,
                          right: 180,
                          marginBottom: 35,
                          paddingBottom: 20,
                          paddingRight: 30,
                        },
                      }}
                      selectedBgColor="black"
                      customButton={(onConfirm) => customButton(onConfirm)}
                      onConfirm={(startDate, endDate) =>
                        setSelected(startDate, endDate)
                      }
                      allowFontScaling={false}
                      placeholder={"Apr 27, 2018 → Jul 10, 2018"}
                      placeholderTextColor={"gray"}
                      mode={"range"}
                      date={selectedDate}
                      onDateChange={handleDateChange}
                      minDate={minSelectableDate}
                    />
                  </Pressable>
                </View>
                <View style={{ marginTop: 65 }}>
                  <Text style={{ fontFamily: "Ubuntu-Medium", fontSize: 18 }}>
                    Add a media
                  </Text>
                  <Pressable
                    onPress={pickImage}
                    style={{
                      top: 10,
                      marginHorizontal: 5,
                      width: 40,
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 7,
                      borderWidth: 1,
                      borderColor: "black",
                    }}
                  >
                    <MaterialIcons name="file-upload" size={24} color="black" />
                  </Pressable>
                </View>
                <Pressable
                  onPress={() => {
                    addProject({
                      projectName: values.projectName,
                      aboutProject: values.aboutProject,
                      goal: values.goal,
                    });
                    handleReset();
                  }}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 14,
                    borderRadius: 8,
                    backgroundColor: "black",
                    alignItems: "center",
                    justifyContent: "center",
                    top: 50,
                    marginHorizontal: 5,
                    marginBottom: 200,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Ubuntu-Medium",
                      fontSize: 26,
                    }}
                  >
                    Upload Project
                  </Text>
                </Pressable>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </ScrollView>
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default NewProjectScreen;
