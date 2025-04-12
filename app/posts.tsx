import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput } from 'react-native';
import MyList from '../src/components/MyList'
import { MyItem } from '../src/components/MyItem'
import MyView from '../src/components/MyView'
import { useRouter } from 'expo-router';
import { setPost, iPost, delPosts, editPosts, getPosts} from '../src/controllers/posts'
import MyButton from '../src/components/MyButtons'
import { Myinput } from '../src/components/MyInputs';
import {MyModal_mobile3} from '../src/components/MyModal'
import { Card, Paragraph, Title } from 'react-native-paper';



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
        if (req.id == -1) {
            const newid = posts.length ? posts[posts.length - 1].id + 1 : 0;
            const newPost = { ...req, id: newid };
            setPosts([...posts, newPost]);
            await setPost(newPost);
        } else {
            const updated = await editPosts(req.id, req);
            if (updated) {
                setPosts(posts.map(i => (i.id == req.id ? req : i)));
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
        const post = posts.find((i) => i.id == id);
        if (post) {
            setReq(post);
            
        }
    }


    async function delPost(id: number) {
        const result = await delPosts(id); // Chama a função do controller
        if (result) {
            setPosts(posts.filter((i) => i.id != id)); // Atualiza o estado local
        } else {
            console.error("Erro ao deletar o post");
        }
    }


    const router = useRouter();

    const[visible, setVisible] = useState (false);

        {/*esse é o like e também o deslike*/}
    async function like(id: number, like: number){
        const post = posts.find((i) => i.id == id);
        if (post) {
            post.like += like;
            setReq(post);
            const updated = await editPosts(req.id, req);
            if (updated) {
                setPosts(posts.map(i => (i.id == req.id ? req : i)));
            }
        }
    }

    return (
        <MyView router={router} >
           
            <MyModal_mobile3  visible={visible} setVisible={setVisible}>
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
            </MyModal_mobile3>

            <MyList // é o feed
                    data={posts}
                    keyItem={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        
                        <MyItem
                            style={item.styles}
                            onDel={() => { delPost(item.id) }}
                            onEdit={() => { editPost(item.id) }}
                        >  
                            <Card.Cover source={{ uri: item.url }} />
                            <Card.Content style={{ width: 150, height: 150, borderRadius: 10 }}> {/* tamanho da imagem*/}
                            <Paragraph>{item.description} </Paragraph> {/* descrição do post*/}
                            <Paragraph>{item.like} </Paragraph> {/* quantidade de likes*/}
                            </Card.Content>      
                            <MyButton title='like' button_type='circle'  onPress={() => like(item.id, +1) }/> {/* aqui ele adiciona mais um like e também é o botão*/}
                            <MyButton title='deslike' button_type='circle'  onPress={() => like(item.id, -1) }/> {/* aqui ele subtrai mais um like e também é o botão*/}
                        </MyItem>
                        /*final do feed*/
                    )}
                />
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
