import React from "react";
import { Text, View, StyleSheet, TextInput, Button} from "react-native";

const InputBox = ({inputTitle, style,autoComplete,keyboardType,secureTextEntry=false, value, setValue}) =>{
    return(
        <View style={[styles.inputCard, style]}>
            <Text style={styles.title}>{inputTitle} :</Text>
            <TextInput style={styles.textinput1} 
                placeholder={` Enter Your ${inputTitle} here...`}
                placeholderTextColor="#7c7c7c" 
                keyboardType={keyboardType}
                autoComplete={autoComplete}
                secureTextEntry={secureTextEntry}
                value={value}
                // {value} this value in braces is a target /input element in that TextInput
                onChangeText={(text) =>{
                    setValue(text);
                }}
            />
        </View>
    )
}

export default InputBox;

const styles = StyleSheet.create({
    textinput1:{
        height:40,
        width:200,
        backgroundColor:'#dadada',
        padding:10,
        margin:10,
        borderRadius:10,
    },
    inputCard:{
        flexDirection:'row',
        alignItems:'center'
    }
})