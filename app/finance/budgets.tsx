import React, {useState,useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MyButton from '../../src/components/MyButtons';
import MyList from '../../src/components/MyList';
import  { Myinput} from '../../src/components/MyInputs';
import MyView from '../../src/components/MyView';
import Mytext from '../../src/components/MyText';
import {MyItem, MyTb} from '../../src/components/MyItem';
import { useRouter } from 'expo-router';
import {iBudgets , setBudget, deleteBudget, updateBudget, getBudgets} from '../../src/controllers/budgets';
import {MyModal} from '../../src/components/MyModal';
import MySearch from '../../src/components/MySearch';
import Mydownload from '../../src/components/MyDownload';


export default function BudgetScreen(){
    const router = useRouter();

//aqui é typescriot 

    const [req, setReq] = useState({

        
        id: -1,
        name:'',
        url:'',
        created_at: new Date().toISOString(),
        value: 0,
        user_id: 3,
        start_date: '',
        end_date:'',
        
    });
    const [searchTerm, setSearchTerm] = useState('');
    const[visible, setVisible] = useState(false);
    const [budgets, setBudgets] = useState<iBudgets[]>([]);

    useEffect(()=> {
        async function getTodos(){
           const retorno = await getBudgets({})
            if( retorno.status  && retorno.data && retorno.data?.length > 0){
                setBudgets(retorno.data);
            }
        }
        
        getTodos();
    },[] )



    async function  handleRegister(){
        if(req.id == -1){
            const newId = budgets.length ? budgets[budgets.length -1].id + 1: 0;
            console.log(newId)

            const newBudget = {...req, id: newId};

            setBudgets([...budgets, newBudget]);
            console.log(newBudget)
           const resp = await setBudget(newBudget)
           console.log (resp)
        }else{
            setBudgets(budgets.map(b=> (b.id == req.id)? req: b));
            const result = await updateBudget(req);
        }
        
        setReq({ 
        id: -1,
        name:'',
        url:'',
        created_at: new Date().toISOString(),
        value:0,
        user_id: 3,
        start_date: '',
        end_date:'',
            });
        setVisible(false);

    }

    function editBudget(id:number){
        const budget = budgets.find (b => b.id == id)
        if(budget)
        setReq(budget)
        setVisible(true);
    }

    async function delBudget(id: number) {
        try {
            const { error } = await deleteBudget(id);
                
            
            if (!error) {
                // Só atualiza o estado se a operação no banco for bem sucedida
                setBudgets(budgets.filter(b => b.id !== id));
            } else {
                console.error('Erro ao deletar:', error);
            }
        } catch (err) {
            console.error("Erro inesperado:", err);
        }
    }
    const getFilteredBudgets = () => {
        if (!searchTerm || searchTerm.trim() === '') return budgets;
        
        const term = searchTerm.toLowerCase();
        
        return budgets.filter(item => {
            return (
                item.id?.toString().includes(searchTerm) ||
                item.name?.toLowerCase().includes(term) ||
                item.url?.toLowerCase().includes(term) ||
                item.created_at?.toLowerCase().includes(term) ||
                item.value?.toString().includes(searchTerm) ||
                item.end_date?.toLowerCase().includes(term)
            );
        });
    };
    
    return (
        <MyView  >
            {/* aqui é typescriot dentro do front*/}
            <Mytext style={styles.title}>
            Cadastre os orçamentos
            </Mytext>
            
            <MyModal style={styles.MyModal}
            title='Novo Cadastro'
            visible={visible} 
            setVisible={setVisible}>
                <View style={styles.form}>
                    
                    <Myinput
                            
                            value={req.name}
                            onChangeText={(text) => setReq({...req ,name: text})}
                            label="Nome"
                            iconName="person"
                   />
                    <Myinput 
                    
                    value={req.url}
                    onChangeText={(text) => setReq({...req ,url: text})} 
                    label="url"
                    iconName="link"
                     />
                     
                     <Myinput 
                    placeholder = "Digite o valor"
                    value={String(req.value)}
                    onChangeText={(text) => setReq({...req ,value:Number( text)})} 
                    label="valor"
                    iconName="pin"
                     />
                    <Myinput 
                  
                    value={req.start_date}
                    onChangeText={(text) => setReq({...req ,start_date: text})} 
                    label="Data Inicial"
                    iconName="pin"
                     />
                    <Myinput 
                  
                    value={req.end_date}
                    onChangeText={(text) => setReq({...req ,end_date: text})}
                    label="Data Final"
                    iconName="pin"
                     />
                     


                     <MyButton style={{justifyContent:'center'}} onPress={() => handleRegister ()} title="cadastrar"  />
                </View>
               </MyModal>

               <MySearch
               placeholder='Pessquise no Virtudemy'
                     style={styles.searchInput}
                     onChangeText={setSearchTerm}
                    onPress={()=> {setSearchTerm(searchTerm)}}
                    busca={searchTerm}
                />
                <MyList
                    style={styles.table}
                    data={getFilteredBudgets()}
                    keyItem={(item) => item.id.toString()}
                    renderItem={({item}) => (
                    
                        <MyTb
                       onEdit ={()=> editBudget(item.id)}
                       onDel ={()=> delBudget(item.id)}
                       button={(
                        <Mydownload  url={item.url} />
                      )}

                        >
                            <Text style={styles.td}> {item.name}</Text>
                            <Text style={styles.td}> {item.id}</Text>
                            <Text style={styles.td}> {item.url}</Text>
                            <Text style={styles.td}> {item.created_at}</Text>
                            <Text style={styles.td}> {item.value}</Text>
                            <Text style={styles.td}> {item.start_date}</Text>
                            <Text style={styles.td}> {item.end_date}</Text>
                        </MyTb>
                    )}
                    header={(
                    <View style={styles.tableRowHeader}>
                        <Text style={styles.th}>Nome</Text>
                        <Text style={styles.th}>Id</Text>
                        <Text style={styles.th}>url </Text>
                        <Text style={styles.th}>created_at </Text>
                        <Text style={styles.th}>Valor</Text>
                        <Text style={styles.th}>Data Inicial</Text>
                        <Text style={styles.th}>Data Final</Text>
                        <Text style={styles.th}>Ações</Text>
                     </View>
                    )}
                />
            
        </MyView>
    );
}

const styles = StyleSheet.create({

    table: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 8,
      },

    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
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

         title:{              
            marginBottom: 8,
            fontSize: 40,
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

         th: {
            flex: 1,
            fontWeight: '900',
            fontSize: 14,
            color: '#333',
            textAlign: 'center',
          },

          td: {
            flex: 1,
            fontSize: 14,
            color: '#444',
            textAlign: 'center',
          },

          tableRowHeader: {
            flexDirection: 'row',
            paddingVertical: 15,
            borderBottomWidth: 2,
            borderBottomColor: '#ddd',
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
             


});


