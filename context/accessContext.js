import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { createContext, useState, useEffect } from "react";

const persistentContext = createContext()

// provider
const PersistentProvider = ({ children }) => {
    // global state
    const [ config, setConfig ] = useState()
    const [loading, setLoading] = useState(true);
    // const [firstlogin, setFirstLogin] = useState()

    // initial local storage data
    useEffect(() => {
        const loadLoaclStorageData = async () => {
          try {
            let data = await AsyncStorage.getItem("@authToken");
            let loginData = JSON.parse(data);

            setConfig({
                ...config,
                token: loginData?.token,
                role: loginData?.role,
                email: loginData?.email,
                userName: loginData?.userName,
            });
        } catch (error) {
            console.error("Error loading AsyncStorage data:", error);
        } finally {
            setLoading(false);
        }
        };
        loadLoaclStorageData();
       
      }, []);

      if (loading) {
        return null; // Render nothing or a loading spinner while loading
    }

      return(
        <persistentContext.Provider value={{config, setConfig}} >
            { children }
        </persistentContext.Provider>
    )
}



export { persistentContext, PersistentProvider}