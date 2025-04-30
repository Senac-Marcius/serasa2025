import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MyTb } from '../../src/components/MyItem';
import MyList from '../../src/components/MyList';
import MyView from '../../src/components/MyView';
import MyButton from '../../src/components/MyButtons';
import { MyModal } from '../../src/components/MyModal'
import { Myinput, MyTextArea } from '../../src/components/MyInputs';
import { setExpense, delRegister, updateExpense, iexpenses, getExpense, getAreas, getAreasSlected } from '../../src/controllers/expenses';
import Mytext from '../../src/components/MyText';
import Mydownload from '../../src/components/MyDownload';
import MySearch from '../../src/components/MySearch';
import MySelect from '../../src/components/MySelect';
import { getBudgets } from '../../src/controllers/budgets';


export default function ExpenseScreen() {
    // aqui é typescript
    const [req, setReq] = useState({
        id: -1,
        created_at: new Date().toISOString(),
        name: '',
        emails: '',
        contacts: '',
        costs: 0,
        descriptions: '',
        url: '',
        user_id: 1,
        percentege:0
    });

    const [searchTerm, setSearchTerm] = useState('');

    const [visible, setVisible] = useState(false);

    const [message, setMessage] = useState("")

    const [areas, setAreas]= useState<{key:number, option:string}[]>([])

    const [areasSelected, setAreasSelected]= useState<{key:number, percentege:number, option:string}[]>([{key: -1, percentege:0, option:''}])

    const [expense, setExpenses] = useState<iexpenses[]>([]);

    const [budgets, setBudgets] = useState<iexpenses[]>([]);


    useEffect(() => {
        (async () => {
            const retorno = await getExpense({})
            if (retorno.status && retorno.data && retorno.data.length > 0) {
                setExpenses(retorno.data)
            }
        })();

        (async () => {
            const retorno = await getAreas({})
            if (retorno.status && retorno.data && retorno.data.length > 0) {
                let tempArea: any[] = []

                retorno.data.map(a=>{
                    tempArea.push({
                        key: a.id, percentage:0, option:a.sectors
                    })
                })

                setAreas(tempArea)
            }
        })();


        (async () => {
            const retorno = await getBudgets({})
            if (retorno.status && retorno.data && retorno.data.length > 0) {
                setBudgets(retorno.data)
            }
        })();

    }, [])

   
    
    function addArea() {
        setAreasSelected([...areasSelected, {key: -1, percentege:0, option:''}]);
    }

    function addAreaKey(index: number, pkey: number) {
        const area = areas.find(a => a.key === pkey); // ← ALTERADO: busca o nome da área
        if (!area) return;

        const novos = [...areasSelected];
        novos[index] = {...novos[index], key: pkey,
            option: area.option, // ← ALTERADO: atualiza o nome visível
        };

        setAreasSelected(novos); // ← ALTERADO
    }

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
            const resp = await setExpense(newExpense, areasSelected)
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
            costs: 0,
            url: '',
            descriptions: '',
            user_id: 1,
            percentege:0
        });

        setAreasSelected([{key: -1, percentege:0, option:''}])

        setVisible(false);
    }

   async function editExpense(id: number) {
        const expenses = expense.find(e => e.id == id)
        if (expenses){
            setReq(expenses)

            const a = await getAreasSlected(id);
            if(a.status && a.data && a.data.length > 0)
                setAreasSelected(a.data  as  {key: number, option: string, percentege:number} [])
        }
            
            
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
            <MyModal
                style={styles.MyModal} 
                title='Cadastrar'
                visible={visible}
                setVisible={setVisible}>

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

                    <Myinput value={ String(req.costs)} onChangeText={(text) => setReq({ ...req, costs: Number(text)})} placeholder="R$" label="Valores:" iconName='' />

                        

                    <Mytext style={{fontSize:14}}>Distribuição por areas:</Mytext>
                            {areasSelected.map((uOption, index) => (
                            <View
                                key={index}
                                style={{ 
                                    flexDirection: 'row', 
                                    alignItems: 'center', 
                                    marginBottom: 12,
                                    gap: 8,
                                }}
                            >
                                <MySelect 
                                    label={uOption.option|| "Selecione uma area"}
                                    setLabel={() => {}}
                                    list={areas}
                                    setKey={(key) => addAreaKey(index, key)}
                                    caption={`Integrante ${index + 1}`}
                                />



                                
                                <TouchableOpacity
                                    onPress={() => {
                                        const novos = [...areasSelected];
                                        novos.splice(index, 1);
                                        setAreasSelected(novos);
                                    }}
                                    style={{
                                        backgroundColor: '#ff4d4f',
                                        borderRadius: 100,
                                        width: 36,
                                        height: 36,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                <Mytext style={{ color: '#fff', fontSize: 18 }}>–</Mytext>
                                </TouchableOpacity>
                                
                                
                                {index === areasSelected.length - 1 && (
                                <TouchableOpacity
                                    onPress={addArea}
                                    style={{
                                        backgroundColor: '#28a745',
                                        borderRadius: 100,
                                        width: 36,
                                        height: 36,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Mytext style={{ color: '#fff', fontSize: 20 }}>+</Mytext>
                                </TouchableOpacity>
                                )}
                            </View>
                            ))}

                              
                    <MyButton style={{ justifyContent: 'center' }} onPress={() => handleRegister()} title={req.id == -1 ? "Cadastra" : "Atualizar"}></MyButton>

                </View>
            </MyModal>
            <MySearch
                placeholder='Pesquise aqui'
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
                        <Mytext style={styles.td}> {item.created_at}</Mytext>
                        <Mytext style={styles.td}>{item.descriptions}</Mytext>
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

    buttonNewText: { color: '#fff', fontWeight: '600' },

    MyModal: {
        display: 'flex',
        width: 327,
        height: 900,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 4,
        borderColor: 'purple',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

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
