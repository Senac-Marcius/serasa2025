import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet, ViewStyle, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import MyCalendar from '../../src/components/MyCalendar';
import MyView from '../../src/components/MyView';
import { Myinput, MyCheck, MyTextArea } from '../../src/components/MyInputs';
import MyButton from '../../src/components/MyButtons';
import MyList from '../../src/components/MyList';
import { useRouter } from 'expo-router';
import { iLoans, setLoanbd, deleteLoansById, updateLoansById, getLoans } from '../../src/controllers/loans';
import { supabase } from '../../src/utils/supabase';
import { getItems, iItem, setItem } from '../../src/controllers/librarie';
import { useLocalSearchParams } from 'expo-router';
import { getLoggedUserId } from '../../src/controllers/users';

type LoansProps = {
    BookId: number;
    style?: ViewStyle | ViewStyle[];
};

export default function LoansTabledetail({ BookId }: LoansProps) {
    const [items, setItems] = useState<iItem[]>([]);
    const { id } = useLocalSearchParams();
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getTodos() {
            const retorno = await getItems({});
            if (retorno.status && retorno.data && retorno.data.length > 0) {
                setItems(retorno.data);
            }
            setLoading(false);
        }
        getTodos();
    }, []);

    const bookId = Number(id);
    const item = items.find((item) => item.id === BookId);

    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const usuarios = [
        {
            id: 1,
            Titulo: 'Livro A',
            Autor: 'Autor 1',
            Leitor: 'João',
            DataEmprestimo: '2024-01-01',
            DataDevolucao: '2024-01-10',
            Status: 'Em andamento',
        },
        {
            id: 2,
            Titulo: 'Livro B',
            Autor: 'Autor 2',
            Leitor: 'Maria',
            DataEmprestimo: '2024-02-01',
            DataDevolucao: '2024-02-10',
            Status: 'Devolvido',
        },
    ];

    const [req, setReq] = useState({
        id: -1,
        bookId: 0,
        userId: '',
        renewed: false,
        loanDate: new Date().toISOString(),
        expectedLoanDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
        effectiveLoanDate: new Date().toISOString(),
        renewal: '',
        creatAt: new Date().toISOString(),
        statusLoan: '',
        observation: '',
        totalQuantity:0,
    });

    const [loans, setLoans] = useState<iLoans[]>([]);

    useEffect(() => {
        async function getTodos() {
            const retorno = await getLoans({});
            if (retorno.status && retorno.data && retorno.data.length > 0) {
                setLoans(retorno.data);
            }
        }
        getTodos();
    }, []);

    async function handleRegister() {
        var _userId = await getLoggedUserId(); 
    
        if (req.id == -1) {
            const newLoans = {
                bookId: BookId,
                userId: _userId!, 
                loanDate: new Date().toISOString(),
                expectedLoanDate: req.expectedLoanDate,
                effectiveLoanDate: new Date().toISOString(),
                renewal: '',
                creatAt: new Date().toISOString(),
                statusLoan: '',
                observation: req.observation,
                renewed: false,
                totalQuantity:0,

            };
    
            // O id será gerado automaticamente pelo banco de dados
            const { data, error } = await supabase
                .from('loans')
                .insert([newLoans]);
    
            if (error) {
                console.error('Erro ao registrar empréstimo:', error);
                alert('Erro ao registrar empréstimo');
                return;
            }
    
            setSuccessMessage('Reservado com sucesso! ✅');
        } else {
            setLoans(loans.map(p => (p.id == req.id ? req : p)));
    
            const sucesso = await updateLoansById(req.id, req);
            if (!sucesso) {
                alert("Erro ao atualizar empréstimo.");
                return;
            }
        }
    
        setReq({
            id: -1,
            bookId: 0,
            userId: '',
            renewed: false,
            loanDate: new Date().toISOString(),
            expectedLoanDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
            effectiveLoanDate: new Date().toISOString(),
            renewal: '',
            creatAt: new Date().toISOString(),
            statusLoan: '',
            observation: '',
            totalQuantity:0,
        });
    }
    

    function editLoans(id: number) {
        let loan = loans.find(l => l.id == id);
        if (loan) setReq(loan);
    }

    async function deleteLoans(id: number) {
        try {
            const { error } = await supabase
                .from('loans')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setLoans(loans.filter(item => item.id !== id));

        } catch (error) {
            console.error('Erro ao deletar empréstimo:', error);
            alert('Erro ao deletar empréstimo');
        }
    }

    const router = useRouter();

    if (loading) {
        return <Text>Carregando...</Text>;
    }

    return (
        <ScrollView >
            <View style={styles.formConteiner}>
                <Text style={styles.textStyles}>Empréstimo</Text>
                <View style={styles.row}>
                    <View style={styles.form}>
                        {item && (
                            <View style={{ padding: 10, backgroundColor: '#ecdef0', borderRadius: 10, marginBottom: 10 }}>
                                <Text style={styles.textTitle}>Livro Selecionado:</Text>
                                <Text style={styles.text}>{item.title}</Text>
                                <Text style={styles.text}>{item.responsible}</Text>
                            </View>
                        )}
                        <MyCalendar
                            value={req.expectedLoanDate.split('T')[0]}
                            date={req.expectedLoanDate.split('T')[0]}
                            setDate={(date) => setReq({ ...req, expectedLoanDate: date })}
                            placeholder=""
                            label="Data prevista de Devolução:"
                            iconName="book"
                        />
                        {successMessage !== '' && (
                            <Text style={{ color: 'green', fontWeight: 'bold', marginBottom: 10 }}>
                                {successMessage}
                            </Text>
                        )}
                        <MyButton
                            title='Emprestar'
                            onPress={() => handleRegister()}
                            button_type='round'
                        />
                        <Text style={styles.textForm}> Realize a retirada em Senac São Carlos</Text>
                        <Text style={styles.textForm}> Aberto de SEGUNDA a SEXTA das 08:00 as 21:00</Text>
                        <Text style={styles.textForm}> SABÁDOS das 08:00 ao 12:00</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
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
        backgroundColor: 'white',
        borderRadius: 10,
        width: 650,
        height: 215,
        zIndex: 999
    },
    textForm: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#6a0dad',
        textAlign: 'center',
    },
    textTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#6a0dad',
    },
    formConteiner: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyles: {
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
