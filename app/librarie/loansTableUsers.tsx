import { iLoans, getLoans } from '../../src/controllers/loans';
import { getItems, iItem } from '../../src/controllers/librarie';
import { supabase } from '../../src/utils/supabase';
import React, { useEffect, useState } from 'react';
import { getLoggedUserId, iUser } from '../../src/controllers/users';
import { FlatList, View, Text, StyleSheet, Button } from 'react-native';
import { StarCalculation } from './starsCalculation';
import { MyModal } from '../../src/components/MyModal';
import { ScrollView } from 'react-native-gesture-handler';

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
    const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

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
                {userDetails ? (
                    <Text style={styles.welcomeText}>Bem-vindo, {userDetails.name}!</Text>
                ) : (
                    <Text style={styles.welcomeText}>Carregando...</Text>
                )}

                <Button
                    title="Atualizar empréstimos"
                    onPress={() => {
                        if (userId) getLoansData(userId);
                    }}
                />

                <FlatList
                    refreshing={isRefreshing}
                    onRefresh={handleRefresh}
                    data={loans}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        const book = getBookDetails(item.bookId);
                        return (
                            <View style={styles.loanItem}>
                                <Text>{book ? book.title : 'Título não encontrado'}</Text>
                                <Text>Autor: {book ? book.responsible : 'Autor não encontrado'}</Text>
                                <Text>Data do empréstimo: {formatDate(item.loanDate)}</Text>
                                <Text>Data da devolução: {formatDate(item.expectedLoanDate)}</Text>

                                <Button
                                    title="Renovar para +7 dias"
                                    onPress={() => add7DaysToReturnDate(item.id, item.expectedLoanDate)}
                                />

                                {message && messageLoanId === item.id && (
                                    <Text style={styles.message}>{message}</Text>
                                )}

                                <Button
                                    title="Avaliar este exemplar"
                                    onPress={() => {
                                        setSelectedBookId(item.bookId);
                                        setModalVisible(true);
                                    }}
                                />
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
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    welcomeText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        padding: 10,
    },
    loanItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    modal: {
        width: 500,
        height: 450,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
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
});
