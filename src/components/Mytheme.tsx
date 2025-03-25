import {TouchableOpacity, View, ViewStyle, StyleSheet} from 'react-native';
import React, {ReactNode} from 'react';
import { styleText } from 'util';


interface MyThemeProps{
    style: ViewStyle;
    chendTheme(): void;
    fontSize(): void;
}
const MyTheme: React.FC<MyThemeProps> = ({style, chendTheme, fontSize}) => {
   return(
   <View>
        
        <TouchableOpacity> +1 </TouchableOpacity>
        <TouchableOpacity> -1</TouchableOpacity>
        <TouchableOpacity> A </TouchableOpacity>
        <TouchableOpacity> B </TouchableOpacity>
        <TouchableOpacity> C </TouchableOpacity>

    </View>
   )
    
}

export default MyTheme

const styles = StyleSheet.create({
    buttonsContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        gap:20,
        alignContent:'space-around',
    }
})

function chendTheme(){

}

function fontSize(){
    
}