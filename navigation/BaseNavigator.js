import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../screens/RegisterScreen1"
import LoginScreen from "../screens/Login3"


const BaseNavigator = () =>  {
    const Stack = createNativeStackNavigator()

    return(
        <NavigationContainer>
            <Stack.Navigator>
            {/* <Stack.Screen name="RegisterScreen" component={RegisterScreen} /> */}
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
               
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default BaseNavigator;

const styles = StyleSheet.create({

})