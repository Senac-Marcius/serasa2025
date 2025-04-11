import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet  } from 'react-native';
import MyView from '../src/components/MyView';
import MyAccessibility from '../src/components/MyAccessibility';
import { Myinput, MyTextArea } from '../src/components/MyInputs';
import Mylist from '../src/components/MyList';
import {MyItem} from '../src/components/MyItem';
import MyButton from '../src/components/MyButtons';
import Mytext from '../src/components/MyText';
import { iInvestment, setInvestment, deleteInvestment, updateInvestment, getInvestments } from '../src/controllers/investments';

export default function investmentScreen(){
 //aqui é typescript   
    const [req, setReq] = useState({
        description: '',
        name: '',
        url: '',
        id: -1,
        created_at: new Date().toISOString(),
        user_id: 1,
        value: '',
    });


    const [investments, setInvestments] = useState<iInvestment[]>([]);

    useEffect(() => {
        async function getAll() {


            const retorno = await getInvestments({});
            if (retorno.status && retorno.data && retorno.data.length > 0) {
            setInvestments(retorno.data);
            }
        }
        getAll();
    },[])
    

    async function handleRegister(){
        if(req.id == -1){
            const nId = investments.length ? investments[investments.length - 1].id + 1 : 0;
            const newInvestment = {...req, id: nId };

            setInvestments([...investments, newInvestment]);
           await setInvestment(newInvestment)
        }else{
            setInvestments(investments.map(i => (i.id == req.id ? req : i)));
            const result = await updateInvestment(req);
            if(result.error){
                console.log('Investment updated successfully:', result.error.message);
                return;
            }
            setInvestments(investments.map(i => (i.id == req.id ? result : i)));

        }

        setReq({
            description: '',
            name: '',
            url: '',
            id: -1,
            created_at: new Date().toISOString(),
            user_id: 1,
            value: '',
        });
    }

    function editInvestment(id:number){
        const investment = investments.find(i => i.id == id);
        if(investment)
        setReq(investment);
    }


    async function delInvestment(id: number) {
        try {
    const result =  await deleteInvestment(id);
        

        setInvestments (investments.filter(i => i.id !== id));
    }   catch (error) {
        console.log(error)
        }
}
    

    
    
    return (
      <MyView>  
              {/* Aqui é typescript dentro do front */}
        
        <MyAccessibility>
            <Text>Acessibilidade</Text>
        </MyAccessibility>

        <Text style={styles.title}>Investimentos</Text>
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
                    

                <MyButton style={{justifyContent:'center'}} title='Cadastrar' onPress={ handleRegister }/> 
            </View>
            <Mylist
                data={investments}
                keyItem={ (item) => item.id.toString() }
                renderItem={({item}) => (
                    <MyItem style={styles.item}
                    onEdit={ () => editInvestment (item.id)  }
                    onDel={ () => delInvestment (item.id)  }
                    >
                       <Mytext style={styles.investmentText}> Descrição: {item.description}</Mytext>
                       <Mytext style={styles.investmentText}> Nome: {item.name}</Mytext>
                       <Mytext style={styles.investmentText}> Url: {item.url}</Mytext>
                       <Mytext style={styles.investmentText}> Data: {item.created_at}</Mytext>
                       <Mytext style={styles.investmentText}> ID de Usuario: {item.user_id}</Mytext>
                        </MyItem> 
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

      title:{
        marginBottom: 8,
        fontSize: 30,
        fontWeight: "bold", 
        textAlign: "center",
        backgroundColor: "#ab66f9",
        borderRadius: 5,
        color:'#ffffff',
        letterSpacing: 1.5,
        textTransform: "uppercase",
        textShadowColor: "rgba(0, 0, 0, 0.2)",
        fontStyle: "italic",
     },

});

