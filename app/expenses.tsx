import react, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button} from 'react-native' ;
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ExpenseScreen(){
// aqui é typescript


    return (
        <View>
            {/* aqui é typecript dentro do front */}
            <Text>tela de despesas</Text>
            <View style={styles.row}>
                <View style={styles.form}>
                    <TextInput placeholder="Nome"/><TextInput placeholder="url"/><TextInput placeholder="descrição"/>
                    <Button title='Cadastrar'/>
                </View>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row : {
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
    },
})