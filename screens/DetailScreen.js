import { View, Text, SafeAreaView , Image, Pressable} from 'react-native'

import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';
import React,{useEffect, useState} from 'react'
import ProgressBar from '../components/ProgressBar';
import { useNavigation } from '@react-navigation/native';


const DetailScreen = ({ route }) => {
const navigation = useNavigation();
const { itemId } = route.params;
const [project, setProject] = useState({})
const getProjectBId= async() => {
  const docRef = doc(db, "Projects", itemId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    setProject(docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}
useEffect(() => {
  getProjectBId()
}, [])


    
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column",
        marginHorizontal: 15,
        marginTop: 10,
      }}
    >
      <View style={{ height: 430 }}>
        <Image
          source={{ uri: project.image }}
          style={{
            height: 250,
            width: 400,
            resizeMode: "contain",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        <Text
          style={{
            top: 20,
            fontSize: 22,
            fontFamily: "LibreFranklin-Regular",
          }}
        >
          {project.projectName}
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
            <Text
              style={{
                fontSize: 18,
                fontFamily: "LibreFranklin-Regular",
              }}
            >
              Raised:
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontFamily: "LibreFranklin-Regular",
              }}
            >
              {project.goal}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "LibreFranklin-Regular",
              }}
            >
              Goal:
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontFamily: "LibreFranklin-Regular",
              }}
            >
              {project.goal}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: 390,
            height: 1.5,
            backgroundColor: "gray",
            top: 50,
            marginVertical: 10,
          }}
        />
        <View style={{ marginTop: 50 }}>
          <View>
            <Text
              style={{
                fontSize: 22,
                fontFamily: "LibreFranklin-Regular",
              }}
            >
              About Project
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "LibreFranklin-Regular",
              }}
            >
              {project.aboutProject}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: 390,
            height: 1.5,
            backgroundColor: "gray",
            top: 50,
            marginVertical: 10,
          }}
        />
      </View>
      <Pressable
        onPress={() => navigation.navigate("Donation")}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 14,
          borderRadius: 8,
          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "center",
          top: 120,
          marginHorizontal: 15,
        }}
      >
        <Text
          style={{ color: "white", fontFamily: "Ubuntu-Medium", fontSize: 24 }}
        >
          Fund this Project
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default DetailScreen