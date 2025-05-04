import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet, ViewStyle, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import MyButton from '../../src/components/MyButtons';
import { getLoggedUserId, iUser } from '../../src/controllers/users';
import { useRouter } from 'expo-router';
import { iLoans, setLoanbd, deleteLoansById, updateLoansById, getLoans } from '../../src/controllers/loans';
import { supabase } from '../../src/utils/supabase';
import { getItems, iItem, setItem } from '../../src/controllers/librarie';
import { useLocalSearchParams } from 'expo-router';

type LoansProps = {
    BookId: number;
    style?: ViewStyle | ViewStyle[];
};

export default function LoansTabledetail({ BookId }: LoansProps) {
    const [items, setItems] = useState<iItem[]>([]);
    const { id } = useLocalSearchParams();
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<iUser[]>([]);


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
        expectedLoanDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        effectiveLoanDate: new Date().toISOString(),
        renewal: '',
        creatAt: new Date().toISOString(),
        statusLoan: '',
        observation: '',
        totalQuantity: 0,
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

        const selectedItem = items.find((i) => i.id === BookId);

        if (!selectedItem) {
            alert("Livro não encontrado.");
            return;
        }

        const totalQuantity = selectedItem.number_copies - selectedItem.borrowedAmount;

        if (totalQuantity <= 0) {
            alert("Este livro está indisponível para empréstimo no momento.");
            return;
        }

        if (req.id === -1) {
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
                totalQuantity: totalQuantity,
            };

            const { data, error } = await supabase
                .from('loans')
                .insert([newLoans]);

            if (error) {
                console.error('Erro ao registrar empréstimo:', error);
                alert('Erro ao registrar empréstimo');
                return;
            }

            // ✅ Atualizar o borrowedAmount no Supabase
            const { data: activeLoans, error: loanError } = await supabase
                .from('loans')
                .select('*')
                .eq('bookId', BookId)
                .neq('statusLoan', 'devolvido');

            if (error) {
                console.error('Erro ao buscar empréstimos:', error);
            } else {
                // Verificação de nulidade usando operador de asserção não nulo (se você tem certeza que 'activeLoans' nunca será null ou undefined após a verificação)
                const borrowedAmount = activeLoans?.length ?? 0; // Usando operador nullish coalescing

                await supabase
                    .from('items')
                    .update({ borrowedAmount })
                    .eq('id', BookId);
            }

            setSuccessMessage('Reservado com sucesso! ✅');
        } else {
            setLoans(loans.map(p => (p.id === req.id ? req : p)));
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
            expectedLoanDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            effectiveLoanDate: new Date().toISOString(),
            renewal: '',
            creatAt: new Date().toISOString(),
            statusLoan: '',
            observation: '',
            totalQuantity: 0,
        });
    }


    useEffect(() => {
        async function fetchData() {
            try {
                const [loansRes, itemsRes, usersRes] = await Promise.all([
                    getLoans({}),
                    getItems({}),
                    supabase.from('users').select('*')
                ]);

                // Verificação explícita de que loansRes.data é um array e não nulo
                if (loansRes.status && Array.isArray(loansRes.data)) {
                    setLoans(loansRes.data);
                } else {
                    console.warn('Loans data is not an array or is missing');
                }

                if (usersRes.data && Array.isArray(usersRes.data)) {
                    setUsers(usersRes.data);
                } else {
                    console.warn('Users data is missing or not an array');
                }

                // Filtrar empréstimos ativos (status diferente de 'devolvido')
                const activeLoans = (loansRes.data ?? []).filter(
                    (loan: iLoans) => loan.statusLoan?.toLowerCase() !== 'devolvido'
                );

                // Contar quantos empréstimos ativos por bookId
                const borrowedCountMap: { [key: number]: number } = {};
                activeLoans.forEach((loan: iLoans) => {
                    borrowedCountMap[loan.bookId] = (borrowedCountMap[loan.bookId] || 0) + 1;
                });

                // Atualizar items com borrowedAmount
                if (itemsRes.status && Array.isArray(itemsRes.data)) {
                    const updatedItems = itemsRes.data.map((item: iItem) => ({
                        ...item,
                        borrowedAmount: borrowedCountMap[item.id] || 0
                    }));
                    setItems(updatedItems);
                } else {
                    console.warn('Items data is missing or not an array');
                }

                setLoading(false);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const router = useRouter();

    if (loading) {
        return <Text>Carregando...</Text>;
    }
    function formatDate(date: string): string {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('pt-BR', options);
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
                                <Text style={styles.text}>
                                    Disponibilidade: {item.number_copies - (item.borrowedAmount ?? 0)}
                                </Text>
                            </View>
                        )}

                        <View style={styles.viewexpectedLoanDate}>
                            <Text style={styles.TextexpectedLoanDate}>
                                Previsão de devolução: {formatDate(req.expectedLoanDate)}
                            </Text>
                        </View>
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
    TextexpectedLoanDate: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#6a0dad',
    },
    viewexpectedLoanDate: {
        height: 50,
        backgroundColor: "#ecdef0",
        justifyContent: "center",
        borderRadius: 10,
        marginBottom: 10,
        padding: 10

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
