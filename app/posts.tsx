import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function PostScreen() {
    const router = useRouter();

    // Estado para armazenar as postagens
    const [posts, setPosts] = useState<{ id: number; description: string; url: string }[]>([]);

    // Estado para armazenar os inputs do formulário
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');

    // Função para adicionar um novo post
    const addPost = () => {
        if (!description.trim() || !url.trim()) {
            alert('Preencha todos os campos!');
            return;
        }

        const newPost = {
            id: posts.length ? posts[posts.length - 1].id + 1 : 1,
            description,
            url,
        };

        setPosts([...posts, newPost]); 
    };

    // Função para deletar um post
    const deletePost = (id: number) => {
        setPosts(posts.filter((post) => post.id !== id));
    };

    return (
        <View style={styles.container}>
            <Button title="Voltar" onPress={() => router.back()} />

            <View style={styles.row}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Cadastro de Postagens</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Descrição"
                        value={description}
                        onChangeText={setDescription}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="URL"
                        value={url}
                        onChangeText={setUrl}
                    />
                    <Button title="Cadastrar" onPress={addPost} />
                </View>

                <View style={styles.listContainer}>
                    <Text style={styles.subtitle}>Lista de Postagens</Text>
                    <ScrollView style={{ flex: 1 }}>
                        <FlatList
                            data={posts}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.postItem}>
                                    <Text style={styles.postText}>{item.description}</Text>
                                    <Text style={styles.postUrl}>{item.url}</Text>
                                    <Button title="Excluir" color="red" onPress={() => deletePost(item.id)} />
                                </View>
                            )}
                            showsVerticalScrollIndicator={true}
                            contentContainerStyle={{ paddingBottom: 20 }}
                        />
                    </ScrollView>
                    
                </View>
            </View>

            
        </View>
    );
}

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
    },
    formContainer: {
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
    listContainer: {
        flex: 1, 
        padding: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    postItem: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
    },
    postText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    postUrl: {
        fontSize: 14,
        color: '#007BFF',
        marginBottom: 5,
    },
});