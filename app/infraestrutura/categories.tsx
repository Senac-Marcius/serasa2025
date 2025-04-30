import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MyList from '../../src/components/MyList';
import { MyItem } from '../../src/components/MyItem';
import MyView from '../../src/components/MyView';
import Mytext from '../../src/components/MyText';
import { useRouter } from 'expo-router';
import { iCategories, setCategory, updateCategory, deleteCategory, getCategories } from '../../src/controllers/category';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MyButton from '../../src/components/MyButtons';
import { Myinput } from '../../src/components/MyInputs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { MyModal } from '../../src/components/MyModal'; // Importe o modal

export default function CategoryScreen() {
    const [req, setReq] = useState<iCategories>({
        name: '',
        description: '',
        id: -1,
        created_at: new Date().toISOString()
    });

    const [categories, setCategories] = useState<iCategories[]>([]);
    const router = useRouter();
    const [visibleForm, setVisibleForm] = useState(false); // Modal do formulário
    const [visibleList, setVisibleList] = useState(false); // Modal da lista

    // Carregar categorias
    useEffect(() => {
        async function loadCategories() {
            const retorno = await getCategories({});
            if (retorno.status && retorno.data) {
                setCategories(retorno.data);
            }
        }
        loadCategories();
    }, []);

    // Cadastrar/Atualizar
    async function handleRegister() {
        if (req.id === -1) {
            const newCategory = { ...req, id: categories.length + 1 };
            setCategories([...categories, newCategory]);
            await setCategory(newCategory);
        } else {
            await updateCategory(req);
            setCategories(categories.map(cat => cat.id === req.id ? req : cat));
        }
        setReq({ name: '', description: '', id: -1, created_at: new Date().toISOString() });
        setVisibleForm(false);
    }

    // Editar
    function editCategorie(id: number) {
        const item = categories.find(i => i.id === id);
        if (item) setReq(item);
        setVisibleForm(true);
    }

    // Deletar
    async function deleteCategories(id: number) {
        await deleteCategory(id);
        setCategories(categories.filter(cat => cat.id !== id));
    }

    return (
        <MyView>
            <Mytext style={styles.h1}>Cadastro de Categorias</Mytext>

            <MyModal 
                style={styles.modal}
                visible={visibleForm} 
                setVisible={setVisibleForm}
                title={req.id === -1 ? "Cadastrar Categoria" : "Editar Categoria"}
                closeButtonTitle="Fechar"
            >
                    <Myinput
                        placeholder="Nome da categoria"
                        value={req.name}
                        onChangeText={(text) => setReq({ ...req, name: text })}
                        label="Nome"
                        iconName=''
                    />
                    <Myinput
                        placeholder="Descrição"
                        value={req.description}
                        onChangeText={(text) => setReq({ ...req, description: text })}
                        label="Descrição"
                        iconName=''

                    />
                    <MyButton 
                        style={styles.buttonCad}
                        title={req.id === -1 ? "Cadastrar" : "Atualizar"} 
                        onPress={handleRegister} 
                    />
            </MyModal>

            {/* Modal da Lista de Categorias */}
            <MyModal 
                visible={visibleList} 
                setVisible={setVisibleList}
                title="Categorias Cadastradas"
                closeButtonTitle="Fechar"
            >
                    <MyList
                        data={categories}
                        keyItem={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <MyItem
                                onDel={() => deleteCategories(item.id)}
                                onEdit={() => {
                                    editCategorie(item.id);
                                    setVisibleList(false); // Fecha a lista e abre o formulário
                                }}
                            >
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemDesc}>{item.description}</Text>
                            </MyItem>
                        )}
                    />
            </MyModal>            
        </MyView>
    );
}

// Estilos
const styles = StyleSheet.create({
    modal:{
        display: 'flex',
        width: 'auto',
        height: 'auto',
        padding: 'auto',
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 4,
        borderColor: 'purple',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    buttonCad:{
       margin: 'auto',
       marginBottom: 10,

    },
    h1: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    modalContent: {
        padding: 20,
        width: '100%',
    },
    listContainer: {
        width: '100%',
        maxHeight: 500, // Altura máxima para a lista
    },
    itemName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    itemDesc: {
        color: '#666',
    },
    addButton: {
        margin: 20,
        backgroundColor: '#6A1B9A',
    },
    listButton: {
        margin: 10,
        backgroundColor: '#4A148C',
    },
});