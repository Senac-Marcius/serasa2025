import React, {useState} from "react";
import{View,Text, StyleSheet, FlatList, TextInput} from "react-native";
import CurrencyInput from 'react-native-currency-input';
import {TimeInput} from "@heroui/date-input";

import { Button } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function PositionScreen(){
/*Aqui é TypeScript*/


    return (
        <View>
            {/*Aqui é TypeScript dentro do front*/}
            <Text>Minha tela dos cargos</Text>
            <View style = {styles.row}>
                <view style={styles.form}>
                    <TextInput 
                        placeholder="Cargo" />

                    <TextInput 
                        placeholder="Descrição" />
                        
                    {/*<CurrencyInput 
                        placeholder="Salário" />*/}

                    {/*<TimeInput 
                        placeholder="Horas trabalhadas" />*/}

                    <TextInput 
                        placeholder="Departamento" />

                    <TextInput 
                        placeholder="Supervisor" />

                    {/*<DateTimePickerModal 
                        placeholder="Data de cadastro" />*/}

                    <Button title = "Cadastrar"/>
                        

                    </view>                 
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start"
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
    },
})