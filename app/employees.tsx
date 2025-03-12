import React, {useState} from 'react';
import { View , Text, StyleSheet, FlatList, TextInput } from 'react-native';

export default function EmployeeScreen(){
//aqui é typescript 


    return(
        <View>
            {/* aqui é typescript dentro da front*/}
            <Text>Hello world</Text>
            <View style={style.row}>
                <View style={style.form}>
                    <TextInput
                        placeholder='Nome:'
                    />
                    <TextInput
                        placeholder='Idade'
                    />
                </View>

            </View>
        </View>
    );

    
}
const style = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    form: {
        flex: 1,
        marginRight: 10,
        padding: 20,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
    }     
})