import React, { Children, useEffect, useState, } from 'react';
import { View, Text, StyleSheet  } from 'react-native';
import MyView from '../../src/components/MyView';
import { Myinput, MyTextArea } from '../../src/components/MyInputs';
import Mylist from '../../src/components/MyList';
import {MyTb} from '../../src/components/MyItem';
import MyButton from '../../src/components/MyButtons';
import Mytext from '../../src/components/MyText';
import { iInvestment, setInvestment, getInvestment, deleteInvestment, updateInvestment } from '../../src/controllers/investments';
import {MyModal} from '../../src/components/MyModal';
import MySearch from '../../src/components/MySearch';
import { MyAccess } from '../../src/components/MyAccessibility';


export default function investmentScreen(){
 //aqui é typescript   
    const [req, setReq] = useState({
        description: '',
        name: '',
        url: '',
        id: -1,
        created_at: new Date().toISOString(),
        user_id: 1,
        value: 0,
    });

    const [visible, setVisible] = useState(false);

    const [investments, setInvestments] = useState<iInvestment[]>([]);

    const [searchTerm, setSearchTerm] = useState('');



    useEffect(() => {
        async function getAll() {
            const retorno = await getInvestment({});

            if (retorno.status && retorno.data && retorno.data.length > 0) {
            setInvestments(retorno.data)
            }
        }
        getAll();
    },[])
    
    const getFilteredInvestments = () => {
        if (!searchTerm) return investments; // Retorna tudo se não houver busca
        
        const term = searchTerm.toLowerCase();
        
        return investments.filter(item => {

          return (
            item.name?.toLowerCase().includes(term) ||
            item.description?.toLowerCase().includes(term) ||
            item.value?.toString().includes(searchTerm) ||
            item.id?.toString().includes(searchTerm) ||
            item.url?.toLowerCase().includes(term) 


          )
        });
      };

    async function handleRegister(){
        console.log('Dados do formulário:', req);
    
        if(req.id == -1){
            const nId = investments.length ? investments[investments.length - 1].id + 1 : 0;
            const newInvestment = {...req, id: nId };
            setInvestments([...investments, newInvestment]);
            const resp = await setInvestment(newInvestment)
            if (resp && resp.length > 0) {
                console.log('Salvo com sucesso');
            }
        } else {
            setInvestments(investments.map(i => (i.id === req.id ? req : i)));
            try{
                await updateInvestment(req);
                console.log('Atualizando investimento:', req);
            }catch (error) {
                console.error('Erro ao atualizar investimento:', error);
            }
        }
    
        setReq({
            name: '',
            description: '',
            url: '',
            id: -1,
            created_at: new Date().toISOString(),
            user_id: 1,
            value: 0,
        });
        setVisible(false);
    }
    

    function editInvestment(id:number){
        console.log('Editando investimento:', id);
        const investment = investments.find(i => i.id == id);
        if(investment){
            setReq(investment);
            setVisible(true);
        }
    }


    async function delInvestment(id: number) {
        deleteInvestment(id)
        const list = investments.filter(i => i.id != id);
        if(list) {
            setInvestments(list);
        }        
    
    }  
    
    return (
      <MyView style={{ flex: 1, backgroundColor: '#f0f2f5'}} >

            
          
              {/* Aqui é typescript dentro do front */}

        <Mytext style={styles.title}>Investimentos</Mytext>

            <MyModal style={styles.MyModal}
            title='Novo Cadastro'
            visible={visible} 
            setVisible={setVisible}>

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
                    value ={String(req.value)}
                    onChangeText={(text) => setReq({...req, value: Number(text) })}
                    iconName=''
                />
                <MyTextArea
                    label='Descrição'
                    placeholder='Descrição'
                    value={req.description}
                    onChangeText={(text) => setReq({...req, description: text })}
                    iconName=''
                  />
                <MyAccess style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'relative',}} children></MyAccess>

                <MyButton style={{justifyContent:'center'}} onPress={ handleRegister } title={req.id == -1 ? "cadastrar" : "Atualizar"} /> 
            </View>

            </MyModal>

            <MySearch
                placeholder='Buscar no Virtudemy'
                style={styles.searchInput}
                onChangeText={setSearchTerm}
                 onPress={()=> {setSearchTerm(searchTerm)}}
                 busca={searchTerm}
            />
            
            <Mylist style={styles.table}
                data={getFilteredInvestments()}
                keyItem={ (item) => item.id.toString() }
                renderItem={({item}) => (
                    <MyTb style={styles.item}
                    onEdit={ () => editInvestment (item.id)  }
                    onDel={ () => delInvestment (item.id)  }
                    >
                       <Mytext style={styles.td}> {item.name}</Mytext>
                       <Mytext style={styles.td}> {item.description}</Mytext>
                       <Mytext style={styles.td}> {item.url}</Mytext>
                       <Mytext style={styles.td}> {item.created_at}</Mytext>
                       <Mytext style={styles.td}> {item.value}</Mytext>
                       </MyTb> 
                )}
                header={(
                    <View style={styles.tableRowHeader}>
                    <Mytext style={styles.th}>Nome</Mytext>
                    <Mytext style={styles.th}>Descrição</Mytext>
                    <Mytext style={styles.th}>Url</Mytext>
                    <Mytext style={styles.th}>Data</Mytext>
                    <Mytext style={styles.th}>Valor</Mytext>
                    <Mytext style={styles.th}>Ações</Mytext>
                </View>
                )}
                 />
      </MyView>   
    );
} 

const styles = StyleSheet.create({
    th: {
        flex: 1,
         fontWeight: '600',
          fontSize: 13,
           color: '#333'
        },

    tableRowHeader: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      },

    td: {
        flex: 1,
        fontSize: 13,
        color: '#444' 
       },

    table: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 8,
      },

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
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
    },

    MyModal: {
        display: 'flex',
        width: 400,
        height: 1000,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 4,
        borderColor: 'purple',
        alignItems: 'center',
        justifyContent: 'flex-end',
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

      searchInput: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        paddingRight: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        fontSize: 14,
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
})

