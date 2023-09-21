import "react-native-gesture-handler";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import {AppLoading} from 'expo';
import StackNavigator from "./StackNavigator.js";


const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Ubuntu-Bold": require("./assets/fonts/Ubuntu-Bold.ttf"),
        "LibreFranklin-SemiBold": require("./assets/fonts/LibreFranklin-SemiBold.ttf"),
        "Ubuntu-Medium": require("./assets/fonts/Ubuntu-Medium.ttf"),
        "LibreFranklin-Italic": require("./assets/fonts/LibreFranklin-Italic.ttf"),
        "CrimsonText-Regular": require("./assets/fonts/CrimsonText-Regular.ttf"),
        "LibreFranklin-Regular": require("./assets/fonts/LibreFranklin-Regular.ttf"),
        "Ubuntu-Light": require("./assets/fonts/Ubuntu-Light.ttf")
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if(!fontsLoaded){
    return null;
  }

  return (
    <>
      <StackNavigator />
    </>
    );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'LibreFranklin-SemiBold'
  }
})

export default App;
