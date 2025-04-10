import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput } from 'react-native';
import MyList from '../src/components/MyList'
import { MyItem } from '../src/components/MyItem'
import MyView from '../src/components/MyView'
import { useRouter } from 'expo-router';
import { setPost, iPost, delPosts, editPosts, getPosts} from '../src/controllers/posts'
import MyButton from '../src/components/MyButtons'
import { Myinput } from '../src/components/MyInputs';


export default function postScreen() {

    const [req, setReq] = useState({
        id: -1,
        url: '',
        description: '',
        like: 0,
        user_id: 2,
    });

    const [posts, setPosts] = useState<iPost[]>([])

    useEffect(() => {
        
        (async () => {
            const retorno = await getPosts({});
            if (retorno.status && retorno.data && retorno.data.length > 0) {
                setPosts(retorno.data);
            }

        })();
    }, []);

    async function handleRegister() {
        if (req.id === -1) {
            const newid = posts.length ? posts[posts.length - 1].id + 1 : 0;
            const newPost = { ...req, id: newid };
            setPosts([...posts, newPost]);
            await setPost(newPost);
        } else {
            const updated = await editPosts(req.id, req);
            if (updated) {
                setPosts(posts.map(i => (i.id === req.id ? req : i)));
            }
        }

        setReq({
            id: -1,
            url: '',
            description: '',
            like: 0,
            user_id: 2,
        });
    }

    function editPost(id: number) {
        const post = posts.find((i) => i.id === id);
        if (post) {
            setReq(post);
        }
    }


    async function delPost(id: number) {
        const result = await delPosts(id); // Chama a função do controller
        if (result) {
            setPosts(posts.filter((i) => i.id !== id)); // Atualiza o estado local
        } else {
            console.error("Erro ao deletar o post");
        }
    }

    //chamar a função do controlador delete

    const router = useRouter();

    return (
        <MyView router={router} >
            {/* aqui é typerscrypt dentro do front */}

            <View style={styles.row}>
                <> {/* aqui pegar o componente de modal. da Nicole */}
                    <View style={styles.form}>
                        <Myinput
                            label='URL'
                            iconName=""
                            placeholder="URL da imagem"
                            value={req.url}
                            onChangeText={(text) => setReq({ ...req, url: text })}
                        />


                        <Myinput
                            label='Descrição'
                            iconName=""
                            placeholder="Descrição"
                            value={req.description}
                            onChangeText={(text) => setReq({ ...req, description: text })}
                        />

                        <MyButton style={{ justifyContent: 'center' }}
                            title="CADASTRAR" // Passando a propriedade correta para o título do botão
                            onPress={handleRegister} // Passando a função de press

                        />
                        

                    </View>
                </> {/* até aqui  o componente de modal. da Nicole */}

                <MyList // é o feed
                        data={posts}
                        keyItem={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <MyItem
                                style={item.styles}
                                onDel={() => { delPost(item.id) }}
                                onEdit={() => { editPost(item.id) }}
                            >
                                <Image src={item.url} />
                                <Text >{item.description}</Text>
                                {/** botao like e deslike */}
                            </MyItem>
                        )}
                    />
            </View>
        </MyView>

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
    item: {
        marginVertical: 5,
        padding: 10,
        backgroundColor: '#EAEAEA',
        borderRadius: 8,
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
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
});
