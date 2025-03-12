import React, {useState} from 'react';
import{View, Text, StyleSheet, FlatList, TextInput,Button} from 'react-native';

    export default function CollectionScreen(){
        



        return (//encapsulamento 
            <View>{/* modo de comentar, aqui é typescript dentro do front */}
                <Text>Minha tela de acervo</Text>
                <View style= {style.row}>
                    <View style= {style.form}>
                        <TextInput
                        placeholder="Nome"
                        />
                         <TextInput
                        placeholder="Quantidade"
                        />
                         <TextInput
                        placeholder="Estrelas"
                        />
                         <Button title='Cadastrar'/>
                    </View>
                </View>
            </View>

        );
    }
    const style = StyleSheet.create({
        row:{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'flex-start',
        },
        form:{
            flex:1,
            marginRight:10,
            padding:20,
            backgroundColor: '#F2F2F2',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 5,

        },

    })
   