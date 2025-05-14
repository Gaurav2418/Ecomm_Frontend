import React, { useContext, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { persistentContext } from "../context/accessContext";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CreateSaleScreen from "../screens/CreateSaleScreen";
import RegisterScreen from "../screens/RegisterScreen1"
import LoginScreen from "../screens/Login3"

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import CardListScreen from "../screens/CardListScreen";
import ProductSearchScreen from "../screens/ProductSearchScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import NewPasswordScreen from "../screens/NewPasswordScreen";
import EditProfileScreen from "../screens/EditProfileScreen";

// import MaterialIcons from '@expo/vector-icons/MaterialIcons';



const BaseNavigator = () =>  {
    const Stack = createNativeStackNavigator()
    const Tab = createBottomTabNavigator()
    const isLoggedIn = false;
    
    const { config, setConfig, firstlogin } = useContext(persistentContext);
    const role = config?.role || firstlogin
    console.log("First Login:", firstlogin);
    console.log("Config:", config);

    function BottomTabs() {
        return(
            <Tab.Navigator>
                {/* 1st Tab */}
                <Tab.Screen name="Home" component={HomeScreen} 
                    options={{ 
                        tabBarLabel: "Home",
                        tabBarStyle: {color:"#008E97"},
                        headerShown: false,
                        tabBarIcon: ({ focused }) => 
                        focused ? (
                            <FontAwesome5 name="home" size={24} color="black" />
                            ) : (
                            <Ionicons name="home-outline" size={24} color="black" />
                        ),
                    }}
                 />

                {/* Conditionally rendering this tab based on user role  This will need Async storage data we can save this data in global state and use it here(Redux use case) */}

                {role == 'shopkeeper' ? (
                    <>
                    <Tab.Screen
                        name="CreateSale"
                        component={CreateSaleScreen}
                        options={{
                            tabBarLabel: "Create Sale",
                            headerShown: false,
                            tabBarIcon: ({ focused }) =>
                                focused ? (
                                    <MaterialIcons name="add-circle" size={30} color="black" />
                                ) : (
                                    <MaterialIcons name="add-circle-outline" size={30} color="black" />
                                ),
                        }}
                    /> 
                    <Tab.Screen
                        name="ProductSearchScreen"
                        component={ProductSearchScreen}
                        options={{
                            tabBarLabel: "Search",
                            headerShown: false,
                            tabBarIcon: ({ focused }) =>
                                focused ? (
                                    <Entypo name="magnifying-glass" size={30} color="black" />
                                ) : (
                                    <Entypo name="magnifying-glass" size={30} color="black" />
                                ),
                        }}
                    />
                    </>
                ) : (
                    <Tab.Screen
                        name="ProductSearchScreen"
                        component={ProductSearchScreen}
                        options={{
                            tabBarLabel: "Search",
                            headerShown: false,
                            tabBarIcon: ({ focused }) =>
                                focused ? (
                                    <Entypo name="magnifying-glass" size={30} color="black" />
                                ) : (
                                    <Entypo name="magnifying-glass" size={30} color="black" />
                                ),
                        }}
                    />
                )}

                     {/* 2st Tab */}
                <Tab.Screen name="Profile" component={ProfileScreen} 
                    options={{ 
                        tabBarLabel: "Profile",
                        tabBarStyle: {color:"#008E97"},
                        headerShown: false,
                        tabBarIcon: ({ focused }) => 
                        focused ? (
                            <MaterialIcons name="person" size={30} color="black" />
                            ) : (
                                <MaterialIcons name="person-outline" size={30} color="black" />
                        ),
                    }}
                 />
            </Tab.Navigator>
        )
    }

    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown:false}} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}} />
               
                <Stack.Screen
      name="BottomTab"
      options={{ headerShown: false }}
      children={() => <BottomTabs key={role} />}
    />
                <Stack.Screen name="CreateSale" component={CreateSaleScreen} options={{headerShown:false}} />
                <Stack.Screen name="cardlist" component={CardListScreen} options={{headerShown:false}} />
                <Stack.Screen name="ProductSearchScreen" component={ProductSearchScreen} options={{headerShown:false}} />
                <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{headerShown:false}} />
                <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} options={{headerShown:false}} />

                <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{headerShown:false}}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default BaseNavigator;

const styles = StyleSheet.create({

})