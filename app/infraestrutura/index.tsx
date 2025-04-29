import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import MyView from '../../src/components/MyView';
import { useRouter } from 'expo-router';
import { iProduct, setProduct, updateProduct, deleteProduct, getProducts } from '../../src/controllers/products';
import MyButton from '../../src/components/MyButtons';
import Mytext from '../../src/components/MyText';
import { Myinput } from '../../src/components/MyInputs';
import { MyTb } from '../../src/components/MyItem';
import MyList from '../../src/components/MyList';
import { MyModal } from '../../src/components/MyModal';
import { getCategories, toListCategorie } from '../../src/controllers/category';
import MySelect from '../../src/components/MySelect';

export default function infraScreen() {
    const [req, setReq] = useState({
        description: '',
        name: '',
        amount: 0,
        id: -1,
        create_at: new Date().toISOString(),
        category_id: -1
    });
    
    const [products, setProducts] = useState<iProduct[]>([]);
    const [cats, setCats] = useState<any[]>([]);
    const [visible, setVisible] = useState(false);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const retorno = await getProducts({});
            if (retorno.status && retorno.data && retorno.data.length > 0) {
                setProducts(retorno.data);
            }
        })();

        (async () => {
            const retorno = await getCategories({});
            if (retorno.status && retorno.data && retorno.data.length > 0) {
                setCats(toListCategorie(retorno.data));
            }
        })();
    }, []);
       
    async function handleRegister() {
        if (req.id == -1) {
            const newid = products.length ? products[products.length - 1].id + 1 : 0;
            const newProduct = { ...req, id: newid };
            setProducts([...products, newProduct]);
            await setProduct(newProduct);
        } else {
            setProducts(products.map((p) => (p.id == req.id) ? req : p));
            await updateProduct(req);
        }

        setReq({
            description: '',
            name: '',
            amount: 0,
            id: -1,
            create_at: new Date().toISOString(),
            category_id: -1
        });

        setVisible(false);
    }

    function editProduct(id: number) {
        const product = products.find(p => p.id == id);
        if (product) {
            setReq(product);
            setVisible(true);
        }
    }

    function dellProduct(id: number) {
        const list = products.filter(p => p.id != id);
        if (list) setProducts(list);
    }

    return (
        <MyView>
            <View style={styles.headerContainer}>
                <Mytext>Cadastro de Produtos</Mytext>
                <View style={styles.buttonsWrapper}>

                    <MyButton 
                        color='#3AC7A8'
                        style={styles.local} 
                        onPress={() => router.push('../infraestrutura/locals')} 
                        title="Locais"
                    />
                    <MyButton 
                        color='#3AC7A8'
                        style={styles.category} 
                        onPress={() => router.push('../infraestrutura/categories')} 
                        title="Categorias"
                    />
                </View>
            </View>

            {/* MODAL (JÁ FUNCIONANDO!) */}
            <MyModal style={styles.modal} visible={visible} setVisible={setVisible} title={req.id === -1 ? "Cadastrar Produto" : "Editar Produto"}>
                    <Myinput 
                        placeholder="Digite o Nome"
                        value={req.name}
                        onChangeText={(text) => setReq({ ...req, name: text })}
                        label="Produto"
                        iconName='storefront' 
                    />
            
                    <Myinput 
                        placeholder="Descrição"
                        value={req.description}
                        onChangeText={(text) => setReq({ ...req, description: text })}
                        label='Descrição'
                        iconName='description' 
                    />

                    <Myinput 
                        placeholder="Quantidade"
                        value={String(req.amount)}
                        onChangeText={(text) => setReq({ ...req, amount: Number(text) })}
                        label='Quantidade'
                        iconName='123' 
                    />

                    <MySelect
                        caption="Selecione uma categoria"
                        label={cats.find(c => c.key == req.category_id)?.option || 'Categorias'}
                        list={cats}
                        setLabel={() => {}}
                        setKey={(key) => { setReq({ ...req, category_id: key }) }}
                    />

                    <View style={styles.modalButtons}>
                        <MyButton 
                            style={styles.cancelButton} 
                            onPress={() => setVisible(false)} 
                            title="Cancelar"
                        />
                        <MyButton 
                            style={styles.buttoncad} 
                            onPress={() => handleRegister()} 
                            title={req.id == -1 ? "Cadastrar" : "Atualizar"}
                        />
                    </View>
                
            </MyModal>

            {/* LISTA DE PRODUTOS */}
            <MyList
                style={styles.table}
                data={products}
                keyItem={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.tableRow}>
                        <Mytext style={styles.td}>{item.name}</Mytext>
                        <Mytext style={styles.td}>{item.description}</Mytext>
                        <Mytext style={styles.td}>{item.amount}</Mytext>
                        <Mytext style={styles.td}>{cats.find(c => c.key == item.category_id)?.option || 'Indefinido'}</Mytext>
                        <Mytext style={styles.td}>{new Date(item.create_at).toLocaleString()}</Mytext>
                        <View style={styles.actionsContainer}>
                            <MyButton 
                                color='#3AC7A8'
                                style={styles.edit} 
                                onPress={() => editProduct(item.id)} 
                                title="Editar"
                            />
                            <MyButton  
                                color='#BC544B'
                                style={styles.delete} 
                                onPress={async () => {
                                    await deleteProduct(item.id);
                                    dellProduct(item.id);
                                }} 
                                title="Excluir"
                            />
                            <MyButton 
                                style={styles.add} 
                                onPress={() => router.push('../infraestrutura/itens')} 
                                title="Cadastrar Item"
                            />
                        </View>
                    </View>
                )}
                header={(
                    <View style={styles.tabela}>
                        <Mytext style={styles.th}>Nome</Mytext>
                        <Mytext style={styles.th}>Descrição</Mytext>
                        <Mytext style={styles.th}>Quantidade</Mytext>
                        <Mytext style={styles.th}>Categoria</Mytext>
                        <Mytext style={styles.th}>Data</Mytext>
                        <Mytext style={styles.th}>Ações</Mytext>
                    </View>
                )}
            />
        </MyView>
    );
}

const styles = StyleSheet.create({
    modal:{
        marginBlock: 'auto',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    cancelButton: {
        fontSize: 15,
        padding: 10,
        backgroundColor: '#FF5252',
        borderRadius: 100,
        fontFamily: 'arial',
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
        flex: 1,
        marginRight: 10,
    },
    buttoncad: {
        fontSize: 15,
        padding: 10,
        backgroundColor: '#FFDB58',
        borderRadius: 100,
        fontFamily: 'arial',
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        fontWeight: 'bold'
    },
    buttonsWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    local: {
        backgroundColor: '#2196F3',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginLeft: 10,
    },
    category: {
        backgroundColor: '#4CAF50',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginLeft: 10,
    },
    edit: {
        fontSize: 15,
        padding: 10,
        backgroundColor: '#FFDB58',
        borderRadius: 100,
        fontFamily: 'arial',
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    delete: {
        fontSize: 15,
        padding: 10,
        backgroundColor: '#FF5252',
        borderRadius: 100,
        fontFamily: 'arial',
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    add: {
        fontSize: 15,
        padding: 10,
        backgroundColor: '#90EE90',
        borderRadius: 100,
        fontFamily: 'arial',
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    table: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 8,
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
    tabela: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
});