import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput, Alert } from 'react-native';
import MyList from '../../src/components/MyList';
import { MyItem } from '../../src/components/MyItem';
import MyView from '../../src/components/MyView';
import Mytext from '../../src/components/MyText';
import { useRouter } from 'expo-router';
import {iCategories, setCategory, updateCategory, deleteCategory, getCategories } from '../../src/controllers/category';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';import MyButton from '../../src/components/MyButtons';
import {Myinput} from '../../src/components/MyInputs';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function CategoryScreen() {
    const [req, setReq] = useState<iCategories>({
        name: '',
        description: '',
        id: -1, // -1 quer dizer: novo cadastro
        created_at: new Date().toISOString()
    });

    const [categories, setCategories] = useState<iCategories[]>([]);
    const router = useRouter();

    // Carregar categorias do banco ao abrir a tela
    useEffect(() => {
        async function getTodos() {
       
            const retorno = await getCategories({})

            if (retorno.status && retorno.data && retorno.data.length > 0){
                getCategories(retorno.data);
            }
getTodos();
            }
      

        getTodos();
    },[])

    // Cadastrar ou atualizar
    async function handleRegister() {
        if (req.id === -1) {
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

  
    async function deleteCategories(id:number){
        const list = categories.filter(c=> c.id != id)
        if(list){
            setCategories(list);
            await deleteCategory(id)
        } 
        

    }

    return (
        <MyView >
            <Mytext style={styles.h1}>Cadastro de Categorias</Mytext>
            <View style={styles.row}>
                <View style={styles.form}>

                    <FontAwesome5
                        name="user-edit" //adicionei os icones de acordo com o MySelect e estão estruturados de acordo com cada input. Essa estrutura pertence ao input da descrição
                        size={15} 
                        color="#6A1B9A" 
                        style={{  marginLeft: 0.1,  // Indentação adicional da borda esquerda
                        marginRight: 5}}/>
                    
                    <Myinput
                        placeholder="Digite o nome da categoria"
                        value={req.name}
                        onChangeText={(text) => setReq({ ...req, name: text })}
                        style={styles.input}
                        iconName=''
                        label= 'Nome'
                    />

                    <MaterialIcons
                        name="description" //adicionei os icones de acordo com o MySelect e estão estruturados de acordo com cada input. Essa estrutura pertence ao input da descrição
                        size={15} 
                        color="#6A1B9A" 
                        style={{  marginLeft: 0.1,  // Indentação adicional da borda esquerda
                        marginRight: 5}}/>
                   
                    <Myinput
                        placeholder=" Digite o nome da Descrição"
                        value={req.description}
                        onChangeText={(text) => setReq({ ...req, description: text })}
                        style={styles.input}
                        iconName=''
                        label= 'Descrição'
                        
                    />
                      
                    <MyButton title={req.id === -1 ? "Cadastrar" : "Atualizar"} onPress={handleRegister} />
                </View>

                <MyList
                    data={categories}
                    keyItem={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        
                        <MyItem
                            onDel={() => deleteCategories(item.id)}
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
    h1:{
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: "black",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
    },
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
