import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import MyList from '../../src/components/MyList';
import { MyItem } from '../../src/components/MyItem';
import MyView from '../../src/components/MyView';
import Mytext from '../../src/components/MyText';
import { useRouter } from 'expo-router';
import { iCategory, setCategory, updateCategory, deleteCategory, getCategories } from '../../src/controllers/category';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MyButton from '../../src/components/MyButtons';
import { Myinput } from '../../src/components/MyInputs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { MyModal } from '../../src/components/MyModal';

export default function CategoryScreen() {
    const [req, setReq] = useState<iCategory>({
        name: '',
        description: '',
        id: -1,
        created_at: new Date().toISOString()
    });

    const [categories, setCategories] = useState<iCategory[]>([]);
    const router = useRouter();
    const [visibleForm, setVisibleForm] = useState(false);
    const [visibleList, setVisibleList] = useState(false);

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
    function editCategorie(id: string) {
        const item = categories.find(i => i.id === Number(id));
        if (item) setReq(item);
        setVisibleForm(true);
    }

    // Deletar
    async function deleteCategories(id: number) {
        await deleteCategory(id);
        setCategories(categories.filter(cat => cat.id !== id));
    }

    return (
        <MyView style={styles.container}>
            <View>
            <Mytext style={styles.screenTitle}>Cadastro de Categorias</Mytext>            </View>
            <MyModal
                style={styles.modal}
                visible={visibleForm}
                setVisible={setVisibleForm}
                closeButtonTitle={'Fechar'}
                handleClosedButton={() => {
                    setReq({
                        description: '',
                        name: '',
                        id: -1,
                        created_at: new Date().toISOString(),
                    })
                }}
                title={req.id === -1 ? "Cadastrar categoria" : "Editar categoria"}
                buttonStyle={{
                    
                    backgroundColor: '#6A1B9A',
                    margin:'auto',
                    marginTop: 10,
                    marginBottom: 10,
                    marginLeft: 0,
                }}
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

            <MyList
                data={categories}
                keyItem={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <View style={styles.itemContent}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemDesc}>{item.description}</Text>
                        </View>
                        <View style={styles.actionsContainer}>
                            <TouchableOpacity 
                                style={styles.actionButton} 
                                onPress={() => editCategorie(item.id)}
                            >
                                <MaterialIcons name="edit" size={20} color="#4A148C" />
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.actionButton, styles.deleteButton]} 
                                onPress={() => deleteCategories(item.id)}
                            >
                                <MaterialIcons name="delete" size={20} color="#e74c3c" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </MyView>
    );
}

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    h1: {
        fontSize: 24,
        textAlign: 'center',
        color: '#4A148C',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        fontWeight: 'bold',
    },
    screenTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#3A3A3A',
        textAlign: 'left',
        marginVertical: 20,
        fontFamily: 'Arial',
        textTransform: 'uppercase',
    },
    modal: {
        margin: 'auto',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#6A1B9A',
    },
    buttonCad: {
        marginBottom: 20,
        backgroundColor: '#6A1B9A',
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    itemContent: {
        flex: 1,
        marginRight: 10,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    itemDesc: {
        fontSize: 14,
        color: '#666',
    },
    actionsContainer: {
        flexDirection: 'row',
    },
    actionButton: {
        padding: 8,
        borderRadius: 20,
        marginLeft: 10,
        backgroundColor: '#f0e6ff',
        margin: 'auto',

    },
    deleteButton: {
        backgroundColor: '#ffebee',
        margin: 'auto',

    },
});