import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput, Alert } from 'react-native';
import MyList from '../src/components/MyList';
import { MyItem } from '../src/components/MyItem';
import MyView from '../src/components/MyView';
import { useRouter } from 'expo-router';
import { setCategory, updateCategory, deleteCategory } from '../src/controllers/category';
import { supabase } from '../src/utils/supabase';

interface iCategories {
    name: string,
    description: string,
    id: number,
    created_at: string
}

export default function CategoryScreen() {
    const [req, setReq] = useState<iCategories>({
        name: '',
        description: '',
<<<<<<< HEAD
        id: -1, // -1 quer dizer: novo cadastro
=======
        id: -1,
>>>>>>> 39c7ffb718898f6c01083b3c93d4e044baa6f326
        created_at: new Date().toISOString()
    });

    const [categories, setCategories] = useState<iCategories[]>([]);
<<<<<<< HEAD
    const router = useRouter();

    // Carregar categorias do banco ao abrir a tela
    useEffect(() => {
        async function getTodos() {
            const { data: todos, error } = await supabase.from('categories').select();

            if (error) console.log('Erro ao carregar categorias:', error);

=======

    const router = useRouter();

    // Carregar categorias do banco
    useEffect(() => {
        async function getTodos() {
            const { data: todos, error } = await supabase.from('categories').select();

            if (error) console.log('Erro ao carregar categorias:', error);

>>>>>>> 39c7ffb718898f6c01083b3c93d4e044baa6f326
            if (todos && todos.length > 0) {
                setCategories(todos);
            }
        }

        getTodos();
    }, []);

    // Cadastrar ou atualizar
    async function handleRegister() {
        if (req.id === -1) {
<<<<<<< HEAD
            const newid = categories.length ? categories[categories.length - 1].id + 1 : 0;
            const newCategory = { ...req, id: newid };

            setCategories([...categories, newCategory]);
            await setCategory(newCategory);
        } else {
            const updated = await updateCategory(req);
            if (updated) {
                setCategories(categories.map(i => i.id === req.id ? req : i));
            }
        }

=======
            // Cadastrar
            const newCategory = {
                ...req,
                created_at: new Date().toISOString()
            };

            const data = await setCategory(newCategory);
            if (data && data.length > 0) {
                setCategories([...categories, { ...data[0] }]);
            }
        } else {
            // Atualizar
            const data = await updateCategory(req);
            if (data && data.length > 0) {
                setCategories(categories.map(i => i.id === req.id ? data[0] : i));
            }
        }

        // Resetar formulário
>>>>>>> 39c7ffb718898f6c01083b3c93d4e044baa6f326
        setReq({
            name: '',
            description: '',
            id: -1,
            created_at: new Date().toISOString()
        });
    }

    // Editar
    function editCategorie(id: number) {
        const item = categories.find(i => i.id === id);
        if (item) setReq(item);
    }

    // Deletar
    async function delCategorie(id: number) {
        Alert.alert('Confirmar', 'Tem certeza que deseja excluir esta categoria?', [
            {
                text: 'Cancelar',
                style: 'cancel'
            },
            {
                text: 'Sim',
                onPress: async () => {
                    const ok = await deleteCategory(id);
                    if (ok) {
                        const list = categories.filter(i => i.id !== id);
                        setCategories(list);
                    } else {
                        alert('Erro ao deletar do banco');
                    }
                }
            }
        ]);
    }

    return (
        <MyView router={router}>
            <View style={styles.row}>
                <View style={styles.form}>
                    <TextInput
                        placeholder="Nome"
                        value={req.name}
                        onChangeText={(text) => setReq({ ...req, name: text })}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Descrição"
                        value={req.description}
                        onChangeText={(text) => setReq({ ...req, description: text })}
                        style={styles.input}
                    />
<<<<<<< HEAD
                    <Button title={req.id === -1 ? "Cadastrar" : "Atualizar"} onPress={handleRegister} />
=======
                    <Button title="Cadastrar" onPress={handleRegister} />
>>>>>>> 39c7ffb718898f6c01083b3c93d4e044baa6f326
                </View>

                <MyList
                    data={categories}
                    keyItem={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <MyItem
                            onDel={() => delCategorie(item.id)}
                            onEdit={() => editCategorie(item.id)}
                        >
                            <Text style={styles.postText}>{item.name}</Text>
                            <Text>{item.description}</Text>
                        </MyItem>
                    )}
                />
            </View>
        </MyView>
    );
}

// Estilos
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
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
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    postText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
