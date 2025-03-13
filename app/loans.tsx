import React, { useState } from 'react'; //react é uma biblioteca e essa função esta importando ela, puxando
import { FlatList, View, Text, StyleSheet, TextInput, Button} from 'react-native'; //react native é uma biblioteca dentro de react 

export default function LoanScreen() {
    const[req, setReq]= useState({ //useState retorna uma variavel e uma função para alteral a variavel (req e setReq)
        bookId: '',
        loanDate: '',
        expectedLoanDate:'',
        effectiveLoanDate:'',
        renewal: '',
        creatAt: new Date().toISOString(),
        statusLoan: '',
        observation: ''

    });
    const [loans, setLoans] = useState<{
        bookId: string,
        loanDate:string,
        expectedLoanDate: string,
        effectiveLoanDate:string,
        renewal:string,
        creatAt:string,
        statusLoan:string,
        observation:string,
        }[]>([])

        function handleRegister (){
            setLoans([...loans,req])
        }
//aqui é typescript
    return (
        <View>
             {/* comentario, tudo aq dentro é codigo, do lado de fora é html, aqui é typescript dentro do front */}
            <Text>Tela de Empréstimo</Text>
            <View style={styles.row}>
                <View style={styles.form}>
                
                    <TextInput placeholder="Nome do Livro:"
                    value={req.bookId} 
                    onChangeText={(text) => setReq({...req,bookId: text })}
                    />
                    {req.bookId}

                    <TextInput 
                        placeholder="Status de Empréstimo:"
                        value={req.statusLoan} 
                        onChangeText={(text) => setReq({...req, statusLoan: text })} //onChangeText recebe uma função, uma função anonima,a set req pede um objeto, (...) pega todos os objetos e tras de volta
                    />
                    {req.statusLoan}

                    <TextInput 
                        placeholder="Data de Empréstimo:"
                        value={req.loanDate} 
                        onChangeText={(text) => setReq({...req, loanDate: text })}
                    />
                    {req.loanDate}

                     <TextInput 
                        placeholder="Data Prevista de Devolução:"
                        value={req.expectedLoanDate} 
                        onChangeText={(text) => setReq({...req, expectedLoanDate: text })}
                    />
                    {req.expectedLoanDate}

                     <TextInput 
                        placeholder="Data de Devolução Efetuada:"
                        value={req.effectiveLoanDate} 
                        onChangeText={(text) => setReq({...req, effectiveLoanDate: text })}
                    />
                    {req.effectiveLoanDate}

                     <TextInput 
                        placeholder="Renovar:"
                        value={req.renewal}         //(...req) cria uma cópia do req atual
                        onChangeText={(text) => setReq({...req, renewal: text })}//O que está acontecendo aqui é que o estado de req está sendo atualizado de forma imutável (sem alterar diretamente o valor antigo).
                    /> 
                     {req.renewal}

                    <TextInput 
                        placeholder="Observação:"
                        value={req.observation} 
                        onChangeText={(text) => setReq({...req, observation: text })}
                    />
                    {req.observation}

                    <Button title="Emprestar" onPress={ () => { handleRegister }}
                    color="purple"
                     />
                </View> 
            
            
            </View>
        </View>
    ); //encapsulamento


}

const styles = StyleSheet.create({ 
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




