import React, { useState } from 'react'; //react é uma biblioteca e essa função esta importando ela, puxando
import { FlatList, View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native'; //react native é uma biblioteca dentro de react 
import MyCalendar from '../src/components/MyCalendar';
import MyView from '../src/components/MyView';
import { Myinput, MyCheck, MyTextArea } from '../src/components/Myinputs';
import MyButton from '../src/components/Mybuttons';
import MyList from '../src/components/MyList';


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
        const loan = loans.find(p =>p.id == id)
        if(loan)
        setReq(loan)
                                        //operador ternario ?
    }
    function deletLoans(id:number){
        const list = loans.filter((p) => p.id != id) 
            setLoans(list)
    }
    


    function handleRegister (){
        if(req.id == -1){
            const newId = loans.length ? loans[loans.length -1].id + 1 : 0;
            const newLoans = {...req, id: newId}

            setLoans([...loans, newLoans]);

        }else{
            setLoans(loans.map(p => (p.id == req.id ? req : p)));

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


        <MyView>
            <View style={styles.formConteiner}>
            <Text>Tela de Empréstimo</Text>
            <View style={styles.row}>
                <View style={styles.form}>

                    <Myinput 
                     value={req.bookId}
                      onChangeText={(text) => setReq({ ...req, bookId: text })}
                      placeholder="Nome do Livro:"
                      label ="Nome do Livro:"
                      iconName="book"
                    />
                    

                    
                     <Myinput 
                     value={req.renewal}
                      onChangeText={(text) => setReq({ ...req, renewal: text })}
                      placeholder="Renovar:"
                      label ="Renovar:"
                      iconName="check"
                    />

                    <Myinput 
                    value={req.observation}
                     onChangeText={(text) => setReq({ ...req, observation: text })}
                     placeholder="Observação:"
                     label ="Observação:"
                     iconName="question"
                   />
                    <MyCalendar date={date} setDate={setDate} icon="FaCalendarDays" />

                    <MyButton  
                        title='Emprestar'
                        onPress={handleRegister}
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
                                onPress={() => { deletLoans(item.id) }}
                                button_type='round'
                               />

                        </View>
                        
                    )}
                />
            </View>
            </View>
        </MyView>
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
        width: 700
        
    },
    formConteiner:{
        flex:8,
        justifyContent: 'center',
        alignItems:'center',
        
        
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



