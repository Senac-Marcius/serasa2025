import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TextInputBase } from 'react-native';


export default function ScheduleScreen(){
// aqui é typescript
    const [discipline, setDiscipline] = useState('');


    return (
        <View>
            {/* aqui é typescript dentro do front */}
            <text>Meu Cronograma</text>
            <View style={style.row}>  
                    <View style={style.form}>
                     <TextInput placeholder="Id"  />   
                     <TextInput placeholder="Url"  /> 
                     <TextInput placeholder="UserId"  />
                     <TextInput placeholder="Class"  />
                     <TextInput 
                        placeholder="Discipline"  
                        value={discipline} 
                        onChangeText={setDiscipline}
                    />
 
                     <TextInput placeholder="Location"  />
                     <TextInput placeholder="Start_time"  />
                     <TextInput placeholder="End_time"  />
                     
                     <Button title="Salvar Cronograma" color="green" />

                    {discipline}
                    
                     
                    
                </View>
               
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
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







