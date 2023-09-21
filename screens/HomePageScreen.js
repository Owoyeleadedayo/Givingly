import { View, Text, SafeAreaView, SafeAreaViewBase, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React,{useEffect, useState} from 'react'
import ProgressBar from '../components/ProgressBar';
import { doc, onSnapshot, getDocs, collection } from "firebase/firestore";
import { db } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const HomePageScreen =  ({ item }) => {
  const [projects, setProjects] = useState([]);
  const [docID, setDocId] = useState("");
  const navigation = useNavigation();

  // const getProjects = async () => {
  //   const querySnapshot = await getDocs(collection(db, "Projects"));
  //   setProjects(querySnapshot.docs);
  // }

  // useEffect(() => {
  //   getProjects();
  // }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Projects"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type == "added") { 
         let newObj = {
           id: change.doc.id,
           data: change.doc.data(),
         };
          setProjects((prevProjects) => [...prevProjects, newObj]);
        }
      });
    });

    return () => unsubscribe();
  }, []);

  const handleCardPress = (itemId) => {
    navigation.navigate("Detail", { itemId });
  };


  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleCardPress(item.id)}>
        <View style={{ height: 430 }}>
                  <Image
                    source={{ uri: item.data.image }}
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
                      fontSize: 18,
                      fontFamily: "LibreFranklin-Regular",
                      marginHorizontal: 5,
                    }}
                  >
                    {item.data.projectName}
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
                        {item.data.goal}
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
                        {item.data.goal}
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
      </TouchableOpacity>
    );
  };
  
  
  

  return (
    <ScrollView
      style={{
        flexDirection: "column",
        top: 10,
        marginHorizontal: 15,
        flex: 1,
      }}
    >
      <Text style={{ fontSize: 50, fontFamily: "Ubuntu-Medium" }}>
        Project{"\n"}of the week
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
        <View style={{ marginTop: 10 }}>
          <FlatList
            data={projects}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
          {/* <Image
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
              <Text
                style={{ fontSize: 18, fontFamily: "LibreFranklin-Regular" }}
              >
                Raised:
              </Text>
              <Text
                style={{ fontSize: 22, fontFamily: "LibreFranklin-Regular" }}
              >
                $1,000
              </Text>
            </View>
            <View>
              <Text
                style={{ fontSize: 18, fontFamily: "LibreFranklin-Regular" }}
              >
                Goal:
              </Text>
              <Text
                style={{ fontSize: 22, fontFamily: "LibreFranklin-Regular" }}
              >
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
          /> */}
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default HomePageScreen