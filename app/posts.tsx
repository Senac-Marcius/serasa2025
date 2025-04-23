import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput } from 'react-native';
import MyList from '../src/components/MyList'
import { MyCorrelated } from '../src/components/MyItem'
import MyView from '../src/components/MyView'
import { useRouter } from 'expo-router';
import { setPost, iPost, delPosts, editPosts, getPosts} from '../src/controllers/posts'
import MyButton from '../src/components/MyButtons'
import { Myinput } from '../src/components/MyInputs';
import {MyModal_mobile3} from '../src/components/MyModal'
import { Card, Paragraph, Title } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';


export default function postScreen() {

    async function pickImage() {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
            alert("Permissão para acessar a galeria é necessária!");
            return;
        }
    
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
    
        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setReq({ ...req, url: uri });
        }
    }    

    const [req, setReq] = useState({
        id: -1,
        url: '',
        description: '',
        like: 0,
        user_id: 2,
    });

    const [posts, setPosts] = useState<iPost[]>([])
    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

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
            console.log('Novo ID gerado:', newid);
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

        setVisible(false); // Isso fecha a caixinha/modal
    }

    function editPost(id: number) {
        const post = posts.find((i) => i.id == id);
        if (post) {
            setReq(post);
            setVisible(true);
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

 
    function openOptions(id: number) {
        if (selectedPostId === id && menuVisible) {
            setMenuVisible(false);
            setSelectedPostId(null);
        } else {
            setSelectedPostId(id);
            setMenuVisible(true);
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
                    
                    <MyButton
                        title="Selecionar Imagem"
                        onPress={pickImage}
                        color="yellow"
                    />

                    <Myinput
                        label='Descrição'
                        iconName=""
                        placeholder="Diga algo "
                        value={req.description}
                        onChangeText={(text) => setReq({ ...req, description: text })}
                    />

                    <MyButton style={{ justifyContent: 'center' }}
                        title="PUBLICAR" // Passando a propriedade correta para o título do botão
                        onPress={handleRegister} // Passando a função de press

                    />
                </View>
            </MyModal_mobile3>


            <MyList //
            //  é o feed
                    style={{flexDirection:"column",alignItems:"center",justifyContent:'center', gap: 120}}
                    data={posts}
                    keyItem={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        
                        
                        <MyCorrelated
                            style={{
                                width: '94%',
                                backgroundColor: '#fff',
                                borderRadius: 12,
                                paddingBottom: 12,
                                elevation: 3,
                                shadowColor: '#000',
                                shadowOpacity: 0.05,
                                shadowRadius: 4,
                                shadowOffset: { width: 0, height: 2 },
                                alignSelf: 'center',
                                marginBottom: 20, // para espaçamento entre posts
                            }}
                            showEditButton={false}
                            showDeleteButton={false}
                            >

                            {/* Botão de três pontinhos */}
                            <TouchableOpacity
                                style={{ position: 'absolute', top: -1, right: -20, zIndex: 100}}
                                onPress={() => openOptions(item.id)}
                            >
                                <MaterialIcons name="more-vert" size={24} color="black" />
                            </TouchableOpacity>

                            {menuVisible && selectedPostId === item.id && (
                                <View style={{ backgroundColor: '#c7c7c7', borderBottomLeftRadius: 8, borderBottomRightRadius: 8, borderTopLeftRadius: 8, height: 110, width: 110, alignItems: 'center', justifyContent: 'center', position: 'absolute', padding: 10, top: 10, right: -2, zIndex: 2, gap:10}}>
                                    <MyButton  width={65} font_size={15} onPress={() => editPost(item.id)} title="Editar"  color="yellow"/>
                                    <MyButton width={65} font_size={15} onPress={() => delPost(item.id) } title="Deletar"  color="red" />
                                </View>
                            )}
                        
                            <Card.Cover source={{ uri: item.url }} /> {/* aqui é a imagem*/}
                            <Card.Content style={{ width: 150, height: 70, borderRadius: 10}}> 
                                <Paragraph>{item.description}</Paragraph>
                                <Paragraph>{item.like}</Paragraph>
                            </Card.Content>      

                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 12 }}>
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={() => like(item.id, +1)}
                                >
                                    <Text style={styles.actionText}>Like</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.actionButton, { backgroundColor: '#ff4d4d' }]}
                                    onPress={() => like(item.id, -1)}
                                >
                                    <Text style={styles.actionText}>Deslike</Text>
                                </TouchableOpacity>
                                </View>


                      </MyCorrelated>
                      
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
    actionButton: {
        width: 45,
        height: 40,
        borderRadius: 30,
        backgroundColor: '#fcd34d', // amarelo claro
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
      },
      
      actionText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
      },
      
});
{/*import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Dimensions } from 'react-native';
import MyList from '../src/components/MyList';
import { MyCorrelated } from '../src/components/MyItem';
import MyView from '../src/components/MyView';
import { useRouter } from 'expo-router';
import { setPost, iPost, delPosts, editPosts, getPosts } from '../src/controllers/posts';
import MyButton from '../src/components/MyButtons';
import { Myinput } from '../src/components/MyInputs';
import { MyModal_mobile3 } from '../src/components/MyModal';
import { Card, Paragraph } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';

const { width } = Dimensions.get('window');

export default function postScreen() {

    async function pickImage() {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permissão para acessar a galeria é necessária!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setReq({ ...req, url: uri });
        }
    }

    const [req, setReq] = useState({
        id: -1,
        url: '',
        description: '',
        like: 0,
        user_id: 2,
    });

    const [posts, setPosts] = useState<iPost[]>([]);
    const [menuVisible, setMenuVisible] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
    const [visible, setVisible] = useState(false);
    const router = useRouter();

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

        setReq({ id: -1, url: '', description: '', like: 0, user_id: 2 });
        setVisible(false);
    }

    function editPost(id: number) {
        const post = posts.find((i) => i.id == id);
        if (post) {
            setReq(post);
            setVisible(true);
        }
    }

    async function delPost(id: number) {
        const result = await delPosts(id);
        if (result) {
            setPosts(posts.filter((i) => i.id != id));
        } else {
            console.error("Erro ao deletar o post");
        }
    }

    function openOptions(id: number) {
        if (selectedPostId === id && menuVisible) {
            setMenuVisible(false);
            setSelectedPostId(null);
        } else {
            setSelectedPostId(id);
            setMenuVisible(true);
        }
    }

    async function like(id: number, like: number) {
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
        <MyView router={router}>
            <MyModal_mobile3 visible={visible} setVisible={setVisible}>
                <View style={styles.form}>
                    <Myinput
                        label='URL'
                        iconName=""
                        placeholder="URL da imagem"
                        value={req.url}
                        onChangeText={(text) => setReq({ ...req, url: text })}
                    />
                    <MyButton title="Selecionar Imagem" onPress={pickImage} color="yellow" />
                    <Myinput
                        label='Descrição'
                        iconName=""
                        placeholder="Diga algo "
                        value={req.description}
                        onChangeText={(text) => setReq({ ...req, description: text })}
                    />
                    <MyButton title="PUBLICAR" onPress={handleRegister} />
                </View>
            </MyModal_mobile3>

            <MyList
                style={{ flexDirection: 'column', paddingTop: 10, paddingBottom: 20 }}
                data={posts}
                keyItem={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MyCorrelated
                        style={{
                            width: width * 0.9,
                            backgroundColor: '#fff',
                            borderRadius: 12,
                            paddingBottom: 12,
                            elevation: 3,
                            shadowColor: '#000',
                            shadowOpacity: 0.05,
                            shadowRadius: 4,
                            shadowOffset: { width: 0, height: 2 },
                            alignSelf: 'center',
                            marginBottom: 20,
                        }}
                        showEditButton={false}
                        showDeleteButton={false}
                    >
                        <TouchableOpacity
                            style={{ position: 'absolute', top: -1, right: -20, zIndex: 100 }}
                            onPress={() => openOptions(item.id)}
                        >
                            <MaterialIcons name="more-vert" size={24} color="black" />
                        </TouchableOpacity>

                        {menuVisible && selectedPostId === item.id && (
                            <View style={{ backgroundColor: '#c7c7c7', borderRadius: 8, height: 110, width: 110, alignItems: 'center', justifyContent: 'center', position: 'absolute', padding: 10, top: 10, right: -2, zIndex: 2, gap: 10 }}>
                                <MyButton width={65} font_size={15} onPress={() => editPost(item.id)} title="Editar" color="yellow" />
                                <MyButton width={65} font_size={15} onPress={() => delPost(item.id)} title="Deletar" color="red" />
                            </View>
                        )}

                        <Card.Cover source={{ uri: item.url }} style={{ height: width * 0.6, borderRadius: 10 }} />
                        <Card.Content style={{ marginTop: 10 }}>
                            <Paragraph>{item.description}</Paragraph>
                            <Paragraph>Likes: {item.like}</Paragraph>
                        </Card.Content>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 12 }}>
                            <TouchableOpacity style={styles.actionButton} onPress={() => like(item.id, +1)}>
                                <Text style={styles.actionText}>Like</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#ff4d4d' }]} onPress={() => like(item.id, -1)}>
                                <Text style={styles.actionText}>Deslike</Text>
                            </TouchableOpacity>
                        </View>
                    </MyCorrelated>
                )}
            />
        </MyView>
    );
}

const styles = StyleSheet.create({
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
    actionButton: {
        width: 45,
        height: 40,
        borderRadius: 30,
        backgroundColor: '#fcd34d',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    actionText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
    },
});
 */}