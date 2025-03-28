import {TouchableOpacity, View, ViewStyle, StyleSheet} from 'react-native';
import React, {ReactNode} from 'react';
import { styleText } from 'util';

interface MyThemeProps{
    style?: ViewStyle;
    chendTheme(theme:string): void;
    fontSize(som:number): void;
}
const MyTheme: React.FC<MyThemeProps> = ({style, chendTheme, fontSize}) => {
   return(

    <View style={styles.row}>

        <View style={{ flexDirection: "row", marginRight: 20 }}>
            <TouchableOpacity style={styles.buttonsContainer} onPress={() => fontSize(+1)}> +1 </TouchableOpacity>
            <TouchableOpacity style={styles.buttonsContainer} onPress={() => fontSize(-1)}> -1</TouchableOpacity>
        </View>
     
        <View style={{ flexDirection: "row" }}>

            <TouchableOpacity style={styles.buttonsContainer} onPress={() => chendTheme("A")}> A </TouchableOpacity>
            <TouchableOpacity style={styles.buttonsContainer} onPress={() => chendTheme("B")}> B </TouchableOpacity>
            <TouchableOpacity style={styles.buttonsContainer} onPress={() => chendTheme("C")}> C </TouchableOpacity>
        </View>
    </View>
   )
    
}

export default MyTheme

const styles = StyleSheet.create({
    buttonsContainer:{
        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
        backgroundColor: "#fffff",
        padding: 10,
        borderRadius: 50,
        width: 20,
        height: 20,
        alignItems: "center",
        justifyContent: "center",
        
    
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 20,
    },

})
