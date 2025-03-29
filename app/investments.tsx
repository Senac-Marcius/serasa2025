import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView,  } from 'react-native';
import MyView from '../src/components/MyView';
import MySupport from'../src/components/MyAccessbility';

export default function investmentScreen(){
 //aqui é typescript   
    const [req, setReq] = useState({
        description: '',
        name: '',
        url: '',
        id: -1,
        createAt: new Date().toISOString(),
        userId: '',
        value: '',
    });


    const [investments, setInvestments] = useState<{
        description: string,
        url: string,
        name: string,
        id: number,
        createAt: string,
        userId: string,
        value: string,
    }[]>([]);
    

    function handleRegister(){
        if(req.id == -1){
            const nId = investments.length ? investments[investments.length - 1].id + 1 : 0;
            const newInvestment = { ...req, id: nId };

            setInvestments([...investments, newInvestment]);
        }else{
            setInvestments(investments.map(i => (i.id == req.id) ? req : i));
        }

        setReq({
            description: '',
            name: '',
            url: '',
            id: -1,
            createAt: new Date().toISOString(),
            userId: '',
            value: '',
        });
    }

    function editInvestment(id:number){
        const investment = investments.find(i => i.id == id)
        if(investment)
        setReq(investment)
    }


    function delInvestment(id:number){
        const list = investments.filter(i => i.id != id)
        if(list)
            setInvestments(list)

    }
    
    
    return (
      <MyView>  
              {/* Aqui é typescript dentro do front */}
        
          <MySupport/>
        <Text>Investimentos</Text>
        <View style={styles.row}>
            <View style={styles.form}>
                <TextInput
                    placeholder='Descrição'
                    value={req.description}
                    onChangeText={(text) => setReq({...req, description: text })}
                  />
                <TextInput
                    placeholder='Nome'
                    value={req.name}
                    onChangeText={(text) => setReq({...req, name: text })}
                />
                <TextInput
                    placeholder='URL'
                    value={req.url}
                    onChangeText={(text) => setReq({...req, url: text })}
                />
                <TextInput
                    placeholder='Valor'
                    value ={req.value}
                    onChangeText={(text) => setReq({...req, value: text })}
                />
                <TextInput
                    placeholder='UserId'
                    value={req.userId}
                    onChangeText={(text) => setReq({...req, userId: text })}
                />
                    

                <Button title='Cadastrar' onPress={ handleRegister }/> 
            </View>
            <FlatList
                data={investments}
                keyExtractor={ (item) => item.id.toString() }
                renderItem={({item}) => (
                    <View style={styles.item}>
                       <Text> Descrição: {item.description}</Text>
                       <Text> Nome: {item.name}</Text>
                       <Text> Url: {item.url}</Text>
                       <Text> Data: {item.createAt}</Text>
                       <Text> ID de Usuario: {item.userId}</Text>

                        <View style={styles.buttons}>
                            <TouchableOpacity 
                            style={styles.editButton} onPress={ () => { editInvestment(item.id) } } activeOpacity={0.7}><Text style={styles.editButtonText}> editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={styles.delButton} onPress={ () => { delInvestment(item.id) } }> <Text style={styles.delButtonText}> excluir</Text>
                            </TouchableOpacity>
                        </View>

                        </View> 
                )}
            />
        </View>
      </MyView>   
    );
} 

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',  
        justifyContent: 'space-between', 
        alignItems: 'flex-start'
    }, 
    buttons: {
        flexDirection: 'row',  
        alignContent: 'space-between', 
        alignItems: 'center',
        gap: 10,
    },
    form: {
        flex: 1,
        marginRight: 10,
        padding: 20,
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
    },

    formInput: {
        height: 45,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
      formInputFocus: {
        borderColor: '#FFD700',
        backgroundColor: '#F7F7F7',
    },

    item: {
        flex: 1,
        marginRight: 10,
        padding: 20,
        backgroundColor: '#F9F9F9',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
      },

      editButton: {
        backgroundColor: '#ffff00',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
      },

    editButtonText: {
        color: '#000',
        fontWeight: 'bold',
    },

    editButtonActive: {
        transform: [{ scale: 1.05 }],
    },

    delButton : {
        backgroundColor: '#FF0000',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 20,
    },    

    delButtonText: {
        color: '#000',
        fontWeight: 'bold',
    },

    text: {
        fontSize: 16,
        fontFamily: 'Roboto',
        color: '#333',
      },
      
    textBold: {
        fontSize: 18,
        fontFamily: 'Roboto-Bold',
        color: '#000',
      },

});

