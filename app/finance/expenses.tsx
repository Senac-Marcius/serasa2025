import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { MyTb } from '../../src/components/MyItem';
import MyList from '../../src/components/MyList';
import MyView from '../../src/components/MyView';
import MyButton from '../../src/components/MyButtons';
import { MyModal } from '../../src/components/MyModal'
import { Myinput, MyTextArea } from '../../src/components/MyInputs';
import { setExpense, delRegister, updateExpense, iexpenses, getExpense } from '../../src/controllers/expenses';
import Mytext from '../../src/components/MyText';
import Mydownload from '../../src/components/MyDownload';
import MySearch from '../../src/components/MySearch';


export default function ExpenseScreen() {
    // aqui é typescript
    const [req, setReq] = useState({
        id: -1,
        created_at: new Date().toISOString(),
        name: '',
        emails: '',
        contacts: '',
        costs: '',
        descriptions: '',
        url: '',
        user_id: 1,
    });

    const [searchTerm, setSearchTerm] = useState('');

    const [visible, setVisible] = useState(false);

    const [message, setMessage] = useState("")

    const [expense, setExpenses] = useState<iexpenses[]>([]);

    useEffect(() => {
        async function getAll() {
            const retorno = await getExpense({})
            if (retorno.status && retorno.data && retorno.data.length > 0) {
                setExpenses(retorno.data)
            }
        }

        getAll();

    }, [])

    const getFilteredExpenses = () => {
        if (!searchTerm) return expense; // Retorna tudo se não houver busca

        const term = searchTerm.toLowerCase();

        return expense.filter(item => {

            return (
                item.name?.toLowerCase().includes(term) ||
                item.descriptions?.toLowerCase().includes(term) ||
                item.costs?.toString().includes(searchTerm) ||
                item.id?.toString().includes(searchTerm) ||
                item.url?.toLowerCase().includes(term)


            )
        });
    };


    async function handleRegister() {
        if (req.id == -1) {
            const newid = expense.length ? expense[expense.length - 1].id + 1 : 1;
            const newExpense = { ...req, id: newid };
            setExpenses([...expense, newExpense]);
            const resp = await setExpense(newExpense)
            if (!resp.status && resp.error)
                setMessage(resp.error.message)
        } else {
            setExpenses(expense.map(e => (e.id === req.id ? req : e)));
            await updateExpense(req);
            setMessage("Existem campos que não aceitam esses tipos caracteres")
        }

        setReq({
            id: -1,
            created_at: new Date().toISOString(),
            name: '',
            emails: '',
            contacts: '',
            costs: '',
            url: '',
            descriptions: '',
            user_id: 1,
        });

        setVisible(false);
    }

    function editExpense(id: number) {
        const expenses = expense.find(e => e.id == id)
        if (expenses)
            setReq(expenses)
        setVisible(true);
    };

    async function delExpense(id: number) {

        delRegister(id)
        const list = expense.filter(e => e.id != id);
        if (list)
            setExpenses(list)
    }

    return (

        <MyView style={{ flex: 1, backgroundColor: '#f0f2f5' }}>
            {/* aqui é typecript dentro do front */}
            <Mytext style={styles.title}>tela de despesas</Mytext>
            <MyModal visible={visible} setVisible={setVisible}>

                <View style={styles.form}>

                    {message.length > 0 && (
                        <Mytext>
                            {message}
                        </Mytext>
                    )}

                    <Myinput value={req.name} onChangeText={(text) => setReq({ ...req, name: text })} placeholder="Nome" label="Nomes:" iconName='' />

                    <Myinput value={req.contacts} onChangeText={(text) => setReq({ ...req, contacts: text })} placeholder="(XX) XXXXX-XXXX" label="Contato:" iconName='phone' />

                    <Myinput value={req.emails} onChangeText={(text) => setReq({ ...req, emails: text })} placeholder="domain@domain.com" label="Email:" iconName='mail' />

                    <MyTextArea value={req.descriptions} onChangeText={(text) => setReq({ ...req, descriptions: text })} iconName='' placeholder='Descrição' label='' />

                    <Myinput value={req.costs} onChangeText={(text) => setReq({ ...req, costs: text })} placeholder="R$" label="Valores:" iconName='' />


                    <MyButton style={{ justifyContent: 'center' }} onPress={() => handleRegister()} title={req.id == -1 ? "Cadastra" : "Atualizar"}></MyButton>

                </View>
            </MyModal>
            <MySearch
                placeholder='Busque por uma receita'
                style={styles.searchInput}
                onChangeText={setSearchTerm}
                onPress={() => { setSearchTerm(searchTerm) }}
                busca={searchTerm}
            />

            <MyList
                style={styles.table}
                data={getFilteredExpenses()}
                keyItem={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MyTb
                        onEdit={() => editExpense(item.id)}

                        onDel={() => delExpense(item.id)}

                        button={(
                            <Mydownload url={item.url} />
                        )}
                    >
                        <Mytext style={styles.td}> {item.name}</Mytext>
                        <Mytext style={styles.td}> {item.contacts}</Mytext>
                        <Mytext style={styles.td}> {item.emails}</Mytext>
                        <Mytext style={styles.td}> {new Date(item.created_at).toLocaleDateString('pt-BR')}</Mytext>
                        <Mytext style={styles.td}>{item.descriptions}</Mytext>
                        <Mytext style={styles.td}> {item.percentege}</Mytext>
                        <Mytext style={styles.td}> {item.costs}</Mytext>
                    </MyTb>

                )}
                header={(
                    <View style={styles.tableRowHeader}>
                        <Mytext style={styles.th}>Nome</Mytext>
                        <Mytext style={styles.th}>Contato</Mytext>
                        <Mytext style={styles.th}>Email</Mytext>
                        <Mytext style={styles.th}>Data</Mytext>
                        <Mytext style={styles.th}>Descrição</Mytext>
                        <Mytext style={styles.th}>Valor</Mytext>
                        <Mytext style={styles.th}>Ações</Mytext>
                    </View>

                )}
            />
        </MyView>
    );
}

const styles = StyleSheet.create({

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

    table: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 8,
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

    title: {
        marginBottom: 8,
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#ab66f9",
        borderRadius: 5,
        color: '#ffffff',
        letterSpacing: 1.5,
        textTransform: "uppercase",
        textShadowColor: "rgba(0, 0, 0, 0.2)",
        fontStyle: "italic",
    },

    th: {
        flex: 1,
        fontWeight: '600',
        fontSize: 13,
        color: '#333',
        textAlign: 'center',
        
    },

    td: {
        flex: 1,
        fontSize: 13,
        color: '#444',
        textAlign: 'center'
    },

    tableRowHeader: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
});
