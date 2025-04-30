import React, { useEffect, useState } from 'react'; //react é uma biblioteca e essa função esta importando ela, puxando
import { FlatList, View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native'; //react native é uma biblioteca dentro de react 
import MyCalendar from '../src/components/MyCalendar';
import MyView from '../src/components/MyView';
import { Myinput, MyCheck, MyTextArea } from '../src/components/MyInputs';
import MyButton from '../src/components/MyButtons';
import MyList from '../src/components/MyList';
import { useRouter } from 'expo-router';
import { iLoans, setLoanbd,deleteLoansById,updateLoansById, getLoans } from '../src/controllers/loans'
import { supabase } from '../src/utils/supabase';
import TabelaUsuarios from './librarie/loantable';
import { ScrollView } from 'react-native-gesture-handler';
import { textStyles } from '../styles/textStyles';


export default function LoanScreen() {

    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
   
 

    const [req, setReq] = useState({ //useState retorna uma variavel e uma função para alteral a variavel (req e setReq)
        id: -1,
        bookId: '',
        loanDate: new Date().toISOString(),
        expectedLoanDate: new Date().toISOString(),
        effectiveLoanDate: new Date().toISOString(),
        renewal: '',
        creatAt: new Date().toISOString(),
        statusLoan: '',
        observation: ''

    });

    /* const [setLoans] = useState<{
         id: number,
         bookId: string,
         loanDate: string,
         expectedLoanDate: string,
         effectiveLoanDate: string,
         renewal: string,
         creatAt: string,
         statusLoan: string,
         observation: string,
 
     }[]>([])*/
 
    const [loans, setLoans] = useState<iLoans[]>([]);

    useEffect(() => {
        async function getTodos() {
            const retorno = await getLoans ({})
            if (retorno.status && retorno.data && retorno.data.length > 0) {
                setLoans(retorno.data)
            }
        }
        getTodos()




    }, [])





    async function handleRegister() {
        if (req.id == -1) {
            const newId = loans.length ? loans[loans.length - 1].id + 1 : 0;
            const newLoans = { ...req, id: newId }
            setLoans([...loans, newLoans]);
            await setLoanbd(newLoans)

        } else {
            setLoans(loans.map(p => (p.id == req.id ? req : p)));

            const sucesso = await updateLoansById(req.id, req)
            if (!sucesso) {
                alert("Erro ao atualizar usuário.")
                return
            }
        
            
        }

        setReq({
            id: -1,
            bookId: '',
            loanDate: new Date().toISOString(),
            expectedLoanDate: new Date().toISOString(),
            effectiveLoanDate: new Date().toISOString(),
            renewal: '',
            creatAt: new Date().toISOString(),
            statusLoan: '',
            observation: ''

        })

    }

    
        //aqui é typescript
        function editLoans(id: number) {
            let loan = loans.find(l => l.id == id)
            if (loan)
                setReq(loan)
        }
    
    
        async function deleteLoans(id: number) {
            try {
                // Remover do banco de dados
                const { error } = await supabase
                    .from('loans')
                    .delete()
                    .eq('id', id);
                
                if (error) throw error;
                
                // Remover da lista local
                setLoans(loans.filter(item => item.id !== id));
                
            } catch (error) {
                console.error('Erro ao deletar empréstimo:', error);
                alert('Erro ao deletar empréstimo');
            }
        }
    
       
    
    

        const router = useRouter();


        return (
            <ScrollView >
                <View style={styles.formConteiner}>
                <Text style={styles.textStyles}>Tela de Empréstimo</Text>
                    
                    <View style={styles.row}>
                        <View style={styles.form}>

                            <Myinput
                                value={req.bookId}
                                onChangeText={(text) => setReq({ ...req, bookId: text })}
                                placeholder="Nome usuario:"
                                label="Nome usuario:"
                                iconName="user"
                            />

                             <MyCalendar
                             value={req.loanDate.split('T')[0]}
                             date={req.loanDate.split('T')[0]}
                             setDate={(date) => setReq({...req, expectedLoanDate: date}) }
                             placeholder=""
                             label="Data de Empréstimo:"
                             iconName="book"
                             
                             />
                        


                            <MyCalendar
                             value={req.expectedLoanDate.split('T')[0]}
                             date={req.expectedLoanDate.split('T')[0]}
                             setDate={(date) => setReq({...req, expectedLoanDate: date}) }
                             placeholder=""
                             label="Data prevista de Devolução:"
                             iconName="book"
                             
                             />


                           
                            <MyCalendar
                             value={req.effectiveLoanDate.split('T')[0]}
                             date={req.effectiveLoanDate.split('T')[0]}
                             setDate={(date) => setReq({...req, effectiveLoanDate: date}) }
                             placeholder=""
                             label="Data Efetiva de Devolução:"
                             iconName="book"
                             />


                            <Myinput
                                value={req.renewal}
                                onChangeText={(text) => setReq({ ...req, renewal: text })}
                                placeholder="Renovar:"
                                label="Renovar:"
                                iconName="check"
                            />

                            <Myinput
                                value={req.statusLoan}
                                onChangeText={(text) => setReq({ ...req, statusLoan: text })}
                                placeholder="Status de Empréstimo:"
                                label="Status de Empréstimo:"
                                iconName="book"
                            />

                            <Myinput
                                value={req.observation}
                                onChangeText={(text) => setReq({ ...req, observation: text })}
                                placeholder="Observação:"
                                label="Observação:"
                                iconName="question"
                            />


                            <MyButton
                                title='Emprestar'
                                onPress={() =>handleRegister()}
                                button_type='round'
                            />

                        </View>

                        <MyList //data significa o parametro que vai receber o vetor (data = dados)
                            data={loans}                  //toString tranforma em string  
                            keyItem={(item) => item.id.toString()}//vai pegar no loans cada elemento
                            renderItem={({ item }) => ( //return aceita somente um argumento
                                <View style={styles.itemContainer}>
                                    <Text>{item.bookId}</Text>
                                    <Text>{item.loanDate}</Text>
                                    <Text>{item.expectedLoanDate}</Text>
                                    <Text>{item.effectiveLoanDate}</Text>
                                    <Text>{item.renewal}</Text>
                                    <Text>{item.statusLoan}</Text>
                                    <Text>{item.observation}</Text>
                                    <Text>{item.creatAt}</Text>

                            
                                    
                                    <MyButton
                                        title='Editar'
                                        onPress={() => { editLoans(item.id) }}
                                        button_type='round'
                                    />
                                    <MyButton
                                        title='Deletar'
                                        onPress={() => { deleteLoans(item.id) }}
                                        button_type='round'
                                    />

                                <Text>
                                    <TabelaUsuarios 
                                        data={loans} 
                                        onEdit={editLoans} 
                                        onDelete={deleteLoans} 
                                    />
                                </Text>
                                  
                                </View>

                            )}
                        />
                    </View>
                </View>
            </ScrollView>
        ); //encapsulamento
    }


    const styles = StyleSheet.create({
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginRight: 5,
            
        },
        form: {
            flex: 1,
            marginRight: 5,
            padding: 20,
            backgroundColor: '#F2F2F2',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 5,
            width: 760

        },
        formConteiner: {
            display: "flex",
            justifyContent: 'center',
            alignItems: 'center',


        },
        itemContainer: {
            marginRight: 10,
            padding: 20,
            borderRadius: 10,
            shadowOffset: { width: 9, height: 4 },
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 5,
            color: "pink"
        },
        textStyles:{
            fontSize: 24, 
            fontWeight: 'bold', 
            color: '#6a0dad', 
            textAlign: 'center', 
            marginBottom: 20 
        },

        buttonContainer: {
            color: "blue"
        },
        button_circle: {
            borderRadius: 100,
            display: "flex",
            gap: 5,
            alignItems: "center",
            justifyContent: "center",
        },
        button_capsule: {
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",

        },
        button_round: {
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",

        },
        button_rect: {
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            borderRadius: 0,

        },
        button_default: {
            borderRadius: 15,
            alignItems: "center",
            flexDirection: "row",

        },
    });
