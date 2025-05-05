import { getItems, iItem } from '../../src/controllers/librarie';
import { supabase } from '../../src/utils/supabase';
import React, { useEffect, useState } from 'react';
import { getLoggedUserId, iUser } from '../../src/controllers/users';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, Link } from 'expo-router';
import StarCalculation from './starsCalculation';
import { MyModal } from '../../src/components/MyModal';
import { ScrollView } from 'react-native-gesture-handler';
import MyMenu from '../../src/components/MyMenu';
import MyButton from '../../src/components/MyButtons';
import { iLoans, setLoanbd, deleteLoansById, updateLoansById, getLoans } from '../../src/controllers/loans';

export default function LoansTableEmployees() {
    const router = useRouter();
    const [loans, setLoans] = useState<iLoans[]>([]);
    const [items, setItems] = useState<iItem[]>([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [users, setUsers] = useState<iUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);


    useEffect(() => {
        async function fetchData() {
            const [loansRes, itemsRes, usersRes] = await Promise.all([
                getLoans({}),
                getItems({}),
                supabase.from('users').select('*')
            ]);

            if (loansRes.status && loansRes.data) setLoans(loansRes.data);
            if (usersRes.data) setUsers(usersRes.data);

            // Filtrar empréstimos ativos (status diferente de 'devolvido')
            const activeLoans = loansRes.data?.filter(loan => loan.statusLoan.toLowerCase() !== 'devolvido') || [];

            // Contar quantos empréstimos ativos por bookId
            const borrowedCountMap: { [key: number]: number } = {};
            activeLoans.forEach(loan => {
                borrowedCountMap[loan.bookId] = (borrowedCountMap[loan.bookId] || 0) + 1;
            });

            // Atualizar items com borrowedAmount
            if (itemsRes.status && itemsRes.data) {
                const updatedItems = itemsRes.data.map(item => ({
                    ...item,
                    borrowedAmount: borrowedCountMap[item.id] || 0
                }));
                setItems(updatedItems);
            }

            setLoading(false);
        }

        fetchData();
    }, []);

    function getLoanDetails(loan: iLoans) {
        const user = users.find(u => u.id === Number(loan.userId));
        const item = items.find(i => i.id === loan.bookId);

        function formatDate(date: string): string {
            const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(date).toLocaleDateString('pt-BR', options);
        }

        return {
            id: loan.id,
            userName: user?.name || 'Desconhecido',
            bookTitle: item?.title || 'Desconhecido',
            author: item?.responsible || 'Desconhecido',
            expectedDate: formatDate(loan.expectedLoanDate),
            borrowedAmount: item?.borrowedAmount || 0,
        };
    }

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

    async function handleRegister() {
        var _userId = await getLoggedUserId();

        if (req.id == -1) {
            const newLoans = {
                bookId: 0,
                userId: _userId!,
                loanDate: new Date().toISOString(),
                expectedLoanDate: req.expectedLoanDate,
                effectiveLoanDate: new Date().toISOString(),
                renewal: '',
                creatAt: new Date().toISOString(),
                statusLoan: '',
                observation: req.observation,
                renewed: false,
                totalQuantity: 0,
            };

            const { data, error } = await supabase.from('loans').insert([newLoans]);

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
            expectedLoanDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            effectiveLoanDate: new Date().toISOString(),
            renewal: '',
            creatAt: new Date().toISOString(),
            statusLoan: '',
            observation: '',
            totalQuantity: 0,
        });
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

    return (
        <ScrollView>
            <View style={styles.View}>
                <View style={styles.container}>
                    {menuOpen && <MyMenu closeMenu={() => setMenuOpen(false)} />}
                    <View style={styles.topbar}>
                        <View style={styles.leftGroup}>
                            <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)} style={styles.iconButton}>
                                <Ionicons name="menu" size={20} color="#750097" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                                <Ionicons name="arrow-back-outline" size={20} color="#750097" />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.textTitle}>
                                BIBLIOTECA
                            </Text>
                        </View>
                        <View style={styles.rightIcons}>
                            <TouchableOpacity style={styles.button_round} onPress={() => router.push({ pathname: 'librarie/collectionsPreview' })}>
                                <MaterialCommunityIcons name="book-open-page-variant" size={20} color="#750097" />
                                <Text style={styles.buttonText}>Catálogo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.avatarButton}>
                                <Image source={{ uri: 'https://i.pravatar.cc/150?img=1' }} style={styles.avatar} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={styles.card}>
                        <View style={styles.containerLabel}> <Text style={styles.Title}>Usuários: </Text></View>
                        <View style={styles.containerLabel}><Text style={styles.Title}>Livros: </Text></View>
                        <View style={styles.containerLabel}><Text style={styles.Title}>Autores: </Text></View>
                        <View style={styles.containerLabel}><Text style={styles.Title}>Data prevista da devolução: </Text></View>
                    </View>
                    {loans.map((loan) => {
                        const { userName, bookTitle, author, expectedDate, borrowedAmount } = getLoanDetails(loan);
                        return (
                            <View key={loan.id} style={styles.card}>
                                <View style={styles.containerLabel}> <Text style={styles.label}>Usuário: <Text style={styles.value}>{userName}</Text></Text></View>
                                <View style={styles.containerLabel}><Text style={styles.label}>Livro: <Text style={styles.value}>{bookTitle}</Text></Text></View>
                                <View style={styles.containerLabel}><Text style={styles.label}>Autor: <Text style={styles.value}>{author}</Text></Text></View>
                                <View style={styles.containerLabel}><Text style={styles.label}>Data prevista da devolução: <Text style={styles.value}>{expectedDate}</Text></Text></View>
                                <View><MyButton style={styles.button_capsule} title="Devolvido" onPress={() => deleteLoans(loan.id)} /></View>
                            </View>
                        );
                    })}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    View: {
        backgroundColor: "white",
        margin: 0,
        padding: 0,
        zIndex: 2,
        height: "100%"
    },
    buttonText: {
        color: '#750097',
        fontSize: 13,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        flexDirection: "row",
        gap: 10
    },
    containerLabel: {
        display: "flex",
        width: 340,
        paddingLeft: 10,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 2,
    },
    value: {
        fontWeight: 'normal',
        color: '#6a0dad',
    },
    button_capsule: {
        width: 100,
        padding: 10,
        borderRadius: 20,
        flexDirection: "row"
    },
    container: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 1,
        zIndex: 10,
    },
    topbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button_round: {
        backgroundColor: "#EDE7F6",
        width: 130,
        padding: 10,
        borderRadius: 20,
        justifyContent: "center",
        flexDirection: "row"
    },
    leftGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    textTitle: {
        fontFamily: 'Poppins_400Regular',
        fontWeight: 600,
        color: '#750097',
        fontSize: 30,
        marginBottom: 5,
        justifyContent: "center",

    },
    Title: {
        fontFamily: 'Poppins_400Regular',
        fontWeight: 700,
        color: '#750097',
        fontSize: 20,
        marginBottom: 5,
        justifyContent: "center",

    },
    rightIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconButton: {
        backgroundColor: '#EDE7F6',
        padding: 10,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F4F4F4',
        borderRadius: 20,
        paddingHorizontal: 12,
        height: 36,
        borderWidth: 1,
        borderColor: '#DDD',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    searchInput: {
        fontSize: 14,
        color: '#333',
        marginLeft: 8,
        minWidth: 160,
    },
    searchIcon: {
        marginTop: 1,
    },
    avatarButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        overflow: 'hidden',
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 18,
    },
});
