import {TouchableOpacity, View, ViewStyle, StyleSheet} from 'react-native';
import React, {ReactNode} from 'react';
import { styleText } from 'util';

interface MyThemeProps{
    style: ViewStyle;
    chendTheme(theme:string): void;
    fontSize(som:number): void;
}
const MyTheme: React.FC<MyThemeProps> = ({style, chendTheme, fontSize}) => {
   return(
   <View>
        
        <TouchableOpacity style ={styles.buttonsContainer} onPress={() => fontSize(+1)}> +1 </TouchableOpacity>
        <TouchableOpacity style ={styles.buttonsContainer} onPress={() => fontSize(-1)}> -1</TouchableOpacity>
        <TouchableOpacity style ={styles.buttonsContainer} onPress={() => chendTheme("A")}> A </TouchableOpacity>
        <TouchableOpacity style ={styles.buttonsContainer} onPress={() => chendTheme("B")}> B </TouchableOpacity>
        <TouchableOpacity style ={styles.buttonsContainer} onPress={() => chendTheme("C")}> C </TouchableOpacity>

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

