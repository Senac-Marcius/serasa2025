import { iLoans, getLoans } from '../../src/controllers/loans';
import { getItems, iItem } from '../../src/controllers/librarie';
import { supabase } from '../../src/utils/supabase';
import React, { useEffect, useState } from 'react';
import { getLoggedUserId, iUser } from '../../src/controllers/users';
import { FlatList, View, Text, StyleSheet, Button,TouchableOpacity,Image } from 'react-native';
import StarCalculation from './starsCalculation';
import { useRouter, Link } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { MyModal } from '../../src/components/MyModal';
import MyButton from '../../src/components/MyButtons';
import { ScrollView } from 'react-native-gesture-handler';
import MyMenu from '../../src/components/MyMenu';


export default function LoansTableUsers() {
    const [loans, setLoans] = useState<iLoans[]>([]);
    const [items, setItems] = useState<iItem[]>([]);
    const [visible, setVisible] = useState(false);
    const [userDetails, setUserDetails] = useState<iUser | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [messageLoanId, setMessageLoanId] = useState<number | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
    const router = useRouter();

    // Obtém o ID do usuário logado
    useEffect(() => {
        async function fetchUser() {
            const loggedUserId = await getLoggedUserId();
            setUserId(loggedUserId);
        }
        fetchUser();
    }, []);

    // Busca os detalhes do usuário
    useEffect(() => {
        if (userId) {
            async function getUserData() {
                const { data, error } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', userId)
                    .single();

                if (error) {
                    console.error("Erro ao buscar os detalhes do usuário:", error);
                    return;
                }

                setUserDetails(data);
            }

            getUserData();
        }
    }, [userId]);

    // Função reutilizável para buscar empréstimos
    async function getLoansData(uid: string) {
        const retorno = await getLoans({});
        if (retorno.status && retorno.data && retorno.data.length > 0) {
            const filteredLoans = retorno.data.filter((loan) => loan.userId === uid);
            setLoans(filteredLoans);
        }
    }

    // Busca empréstimos quando userId estiver disponível
    useEffect(() => {
        if (userId) {
            getLoansData(userId);
        }
    }, [userId]);

    // Busca itens da biblioteca
    useEffect(() => {
        async function getItemsData() {
            const retorno = await getItems({});
            if (retorno.status && retorno.data && retorno.data.length > 0) {
                setItems(retorno.data);
            }
        }

        getItemsData();
    }, []);

    function getBookDetails(bookId: number) {
        return items.find((item) => item.id === bookId);
    }

    function add7DaysToReturnDate(loanId: number, currentDate: string) {
        const loan = loans.find((l) => l.id === loanId);
        if (loan?.renewed) {
            setMessage("Este empréstimo já foi renovado uma vez.");
            setMessageLoanId(loanId);
            return;
        }

        const currentDateObj = new Date(currentDate);
        currentDateObj.setDate(currentDateObj.getDate() + 7);
        updateLoanReturnDate(loanId, currentDateObj.toISOString().split('T')[0]);
    }

    async function updateLoanReturnDate(loanId: number, newReturnDate: string) {
        const { data, error } = await supabase
            .from('loans')
            .update({ expectedLoanDate: newReturnDate, renewed: true })
            .eq('id', loanId);

        if (error) {
            console.error("Erro ao atualizar a data de devolução:", error);
            return;
        }

        setLoans((prevLoans) =>
            prevLoans.map((loan) =>
                loan.id === loanId ? { ...loan, expectedLoanDate: newReturnDate, renewed: true } : loan
            )
        );

        setMessage('Data de devolução atualizada com sucesso!');
        setMessageLoanId(loanId);
    }

    async function handleRefresh() {
        if (userId) {
            setIsRefreshing(true);
            await getLoansData(userId);
            setIsRefreshing(false);
        }
    }
    function formatDate(date: string): string {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('pt-BR', options);
    }
    return (
        <ScrollView>
            <View>
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
                <View style={styles.viewWelcome}>
                {userDetails ? (
                    <Text style={styles.textTitle}>Bem-vindo, {userDetails.name}!</Text>
                ) : (
                    <Text style={styles.textTitle}>Carregando...</Text>
                )}
                </View>
                <View style={styles.viewCardUpdate}>
                <MyButton
                    style={styles.button_round}
                    icon='rotate-right'
                    title="Atualizar"
                    onPress={() => {
                        if (userId) getLoansData(userId);
                    }}
                />
                </View>
                <View style={styles.viewCard}>
                    <View style={styles.card}>
                        <View style={styles.containerLabel}> <Text style={styles.Title}>Livros: </Text></View>
                        <View style={styles.containerLabel}><Text style={styles.Title}>Autores: </Text></View>
                        <View style={styles.containerLabel}><Text style={styles.Title}>Data do empréstimo: </Text></View>
                        <View style={styles.containerLabel}><Text style={styles.Title}>Data prevista da devolução: </Text></View>
                    </View>

                    <FlatList
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                        data={loans}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => {
                            const book = getBookDetails(item.bookId);
                            return (
                                <View style={styles.loanItem}>
                                    <View style={styles.item}><Text style={styles.label}>Livro: <Text style={styles.value}>{book ? book.title : 'Título não encontrado'}</Text></Text></View>
                                    <View style={styles.item}><Text style={styles.label}>Autor: <Text style={styles.value}> {book ? book.responsible : 'Autor não encontrado'}</Text></Text></View>
                                    <View style={styles.item}><Text style={styles.label}>Data do empréstimo: <Text style={styles.value}>{formatDate(item.loanDate)}</Text></Text></View>
                                    <View style={styles.item}><Text style={styles.label}>Data da devolução: <Text style={styles.value}>{formatDate(item.expectedLoanDate)}</Text></Text></View>

                                    <MyButton
                                        style={styles.button_capsule}
                                        title="Renovar para +7 dias"
                                        onPress={() => add7DaysToReturnDate(item.id, item.expectedLoanDate)}
                                    />

                                   

                                    <MyButton
                                        style={styles.button_capsule}
                                        title="Avaliar este exemplar"
                                        onPress={() => {
                                            setSelectedBookId(item.bookId);
                                            setModalVisible(true);
                                        }}
                                    />
                                     {message && messageLoanId === item.id && (
                                        <Text style={styles.message}>{message}</Text>
                                    )}
                                </View>

                            );
                        }}
                    />

                    {selectedBookId !== null && (
                        <MyModal
                            visible={modalVisible}
                            setVisible={(v) => {
                                if (!v) setSelectedBookId(null);
                                setModalVisible(v);
                            }}
                            style={styles.modal}
                            title="Avalie este exemplar"
                            closeButtonTitle="X"
                        >
                            <StarCalculation key={selectedBookId} BookId={selectedBookId} />
                        </MyModal>
                    )}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    viewWelcome: {
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
        marginLeft:20,
    },
    containerLabel: {
        display: "flex",
        width: 275,
        paddingLeft: 10,
    },
    card: {

        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    loanItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexWrap: 'wrap'
    },
    viewCardUpdate:{
        marginBottom:20,
    },
    button_round: {
        backgroundColor: "#EDE7F6",
        width: 140,
        padding: 10,
        borderRadius: 20,
        justifyContent: "center",
        flexDirection: "row"
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
    item: {
        display: "flex",
        width: 250,
        paddingLeft: 10,
    },
    modal: {
        width: 500,
        height: 450,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
    },

    viewCard: {
        backgroundColor: '#f0f0f0',

    },
    containerModal: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    message: {
        backgroundColor: '#d4edda',
        color: '#155724',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        fontSize: 16,
        textAlign: 'center',
    },
    button_capsule: {
        width: 170,
        padding: 10,
        borderRadius: 20,
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
    buttonText: {
        color: '#750097',
        fontSize: 13,
        fontWeight: 'bold',
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
});
