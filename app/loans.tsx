import React, { useState } from 'react'; //react é uma biblioteca e essa função esta importando ela, puxando
import { FlatList, View, Text, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native'; //react native é uma biblioteca dentro de react 

export default function LoanScreen() {
    const[req, setReq]= useState({ //useState retorna uma variavel e uma função para alteral a variavel (req e setReq)
        id: 0,
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
        id: number,
        bookId: string,
        loanDate:string,
        expectedLoanDate: string,
        effectiveLoanDate:string,
        renewal:string,
        creatAt:string,
        statusLoan:string,
        observation:string,
        
    }[]>([])

    function editLoans(id:number){
        const loans = loans.find(p =>p.id == id)
        if(loans)
        setReq(loans)
                                        //operador ternario ?
    }
    function deletLoans(id:number){
        const list = loans.filter((p) => p.id != id) 
            setLoans(list)
    }
    }


    function handleRegister (){
        if(req.id == -1){
            const newId = postMessage.length ? loans[loans.length -1].id + 1 : 0;
            const newLoans = {...req, id: newId}

            setLoans([...loans, newLoans]);

        }else{
            setLoans(post.map(p => (p.id == req.id ? req : p)));

        }
            
        setReq({
            id: -1,
            bookId: '',
            loanDate: '',
            expectedLoanDate:'',
            effectiveLoanDate:'',
            renewal: '',
            creatAt: new Date().toISOString(),
            statusLoan: '',
            observation: '',
            
        })
    }
//aqui é typescript




    return (
        <View>
             
            <Text>Tela de Empréstimo</Text>
            <View style={styles.row}>
                <View style={styles.form}>
                
                    <TextInput placeholder="Nome do Livro:"
                    value={req.bookId} 
                    onChangeText={(text) => setReq({...req, bookId: text })}
                    />
                    

                    <TextInput 
                        placeholder="Status de Empréstimo:"
                        value={req.statusLoan} 
                        onChangeText={(text) => setReq({...req, statusLoan: text })} //onChangeText recebe uma função, uma função anonima,a set req pede um objeto, (...) pega todos os objetos e tras de volta
                    />
                    

                    <TextInput 
                        placeholder="Data de Empréstimo:"
                        value={req.loanDate} 
                        onChangeText={(text) => setReq({...req, loanDate: text })}
                    />
                    

                     <TextInput 
                        placeholder="Data Prevista de Devolução:"
                        value={req.expectedLoanDate} 
                        onChangeText={(text) => setReq({...req, expectedLoanDate: text })}
                    />
                    

                     <TextInput 
                        placeholder="Data de Devolução Efetuada:"
                        value={req.effectiveLoanDate} 
                        onChangeText={(text) => setReq({...req, effectiveLoanDate: text })}
                    />
                    

                     <TextInput 
                        placeholder="Renovar:"
                        value={req.renewal}         //(...req) cria uma cópia do req atual
                        onChangeText={(text) => setReq({...req, renewal: text })}//O que está acontecendo aqui é que o estado de req está sendo atualizado de forma imutável (sem alterar diretamente o valor antigo).
                    /> 
                    

                    <TextInput 
                        placeholder="Observação:"
                        value={req.observation} 
                        onChangeText={(text) => setReq({...req, observation: text })}
                    />
                    

                    <Button title="Emprestar" onPress={handleRegister}
                    color="purple"
                     />
                    
                </View> 
                    
                <FlatList //data significa o parametro que vai receber o vetor (data = dados)
                    data={loans}                  //toString tranforma em string  
                    keyExtractor={(item) => item.id.toString()}//vai pegar no loans cada elemento
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
                            <View style ={styles.buttonContainer}>
                                <TouchableOpacity onPress={ () => {editLoans(item.id)}}>EDITAR</TouchableOpacity>
                                <TouchableOpacity onPress={ () => {deletLoans(item.id)}}>DELETE</TouchableOpacity>
                            </View>
                        </View>
                        
                    )}
                   
                />
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
    itemContainer: {
        marginRight: 10,
        padding: 20,
        borderRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        color: "pink"
    },
    buttonContainer: {
       color: "blue"
    }
           
})




