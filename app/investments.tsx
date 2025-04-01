import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView,  } from 'react-native';
import MyView from '../src/components/MyView';
import MyAccessibility from '../src/components/MyAccessbility';
import { Myinput, MyTextArea } from '../src/components/Myinputs';
import Mylist from '../src/components/mylist';
import Myiten from '../src/components/myItenlist';
import MyButton from '../src/components/Mybuttons';
import Mytext from '../src/components/Mytext';

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
            const newInvestment = {...req, id: nId };

            setInvestments([...investments, newInvestment]);
        }else{
            setInvestments(investments.map(i => (i.id == req.id ? req : i)));
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
        
        <MyAccessibility>
            <Text>Acessibilidade</Text>
        </MyAccessibility>

        <Text>Investimentos</Text>
        <View style={styles.row}>
            <View style={styles.form}>
            <Myinput
                    label='Nome'
                    placeholder='Nome'
                    value={req.name}
                    onChangeText={(text) => setReq({...req, name: text })}
                    iconName=''
                />
                <Myinput
                    label='Url'
                    placeholder='Url'
                    value={req.url}
                    onChangeText={(text) => setReq({...req, url: text })}
                    iconName=''
                />
                <Myinput
                    label='Valor'
                    placeholder='Valor'
                    value ={req.value}
                    onChangeText={(text) => setReq({...req, value: text })}
                    iconName=''
                />
                <MyTextArea
                    label='Descrição'
                    placeholder='Descrição'
                    value={req.description}
                    onChangeText={(text) => setReq({...req, description: text })}
                    iconName=''
                  />
                    

                <MyButton title='Cadastrar' onPress={ handleRegister }/> 
            </View>
            <Mylist
                data={investments}
                keyItem={ (item) => item.id.toString() }
                renderItem={({item}) => (
                    <Myiten style={styles.item}
                    onEdit={ () => editInvestment (item.id)  }
                    onDel={ () => delInvestment (item.id)  }
                    >
                       <Mytext style={styles.investmentText}> Descrição: {item.description}</Mytext>
                       <Mytext style={styles.investmentText}> Nome: {item.name}</Mytext>
                       <Mytext style={styles.investmentText}> Url: {item.url}</Mytext>
                       <Mytext style={styles.investmentText}> Data: {item.createAt}</Mytext>
                       <Mytext style={styles.investmentText}> ID de Usuario: {item.userId}</Mytext>
                        </Myiten> 
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

    investmentText: {
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

