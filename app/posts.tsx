import React, { useState, useEffect } from 'react';
import { View,Text, StyleSheet,FlatList, Button,TextInput} from 'react-native';
import MyList from '../src/components/MyList'
import {MyItem} from '../src/components/MyItem'
import MyView from '../src/components/MyView'
import { useRouter } from 'expo-router';
import {setPost, iPost} from '../src/controllers/posts'
import { supabase } from '../src/utils/supabase'
import MyButton from '../src/components/MyButtons'

export default function postScreen() {

    const [req, setReq] = useState({
        id: -1,
        url: '',
        description : '',
        like: 0,
        created_at: new Date().toISOString(),
        user_id : 2,
    });
 
    const[posts, setPosts] = useState<iPost[]>([])

    useEffect(()=>{
        (async () => {
            const { data: todos, error } = await supabase.from('posts').select();
            if (todos && todos.length > 0) {
              setPosts(todos);
            }
            if (error) {
              console.error("Erro ao buscar os cronogramas:", error);
            }
          })();
        }, []);



/*
        async function getTodos(){
            const {data: todos}= await supabase.from('posts').select()

            if(todos && todos.length > 0){
                setPosts(todos)
            }
            
        }

        getTodos();
    },[]);
    */
    async function handleRegister(){
        if(req.id == -1){
            const newid = posts.length ? posts[posts.length-1].id+1:0;
            const newPost = {...req, id: newid};
            setPosts([...posts, newPost])
            const resp = await setPost(newPost)
            console.log(resp)
        }else{
            setPosts(posts.map(i =>(i.id == req.id)? req: i )  );
            //chamar a função do controlador edit
        }
    
        setReq({
            id: -1,
            url: '',
            description : '',
            like: 0,
            created_at: new Date().toISOString(),
            user_id : 2,
        })
    }
    
    function editPost(id:number){
        function editPost(id: number) {
        const post = posts.find((i) => i.id === id);
        if (post) {
          setReq(post);
        }
      }
    }


    async function delPost(id:number){
        async function delPost(id: number) {
            const result = await delPostsDoController(id); 
            if (result) {
              setPosts(posts.filter((i) => i.id !== id));
            }
          }
        
        
        }
        //chamar a função do controlador delete

        const list= posts.filter(i => i.id != id)
        if(list)
            setPosts(list)
    }
    
    const router = useRouter();

    return (
        <MyView router={router} >
    {/* aqui é typerscrypt dentro do front */}

            <View style={styles.row}>
                <View style={styles.form}>
                    <TextInput placeholder="nome" 
                        value={req.url}
                        onChangeText={(text) => setReq({...req ,url: text})}
                    /> 
                   

                    <TextInput placeholder="description" 
                        value={req.description}
                        onChangeText={(text) => setReq({...req ,description: text})}
                        />
                        
                        <MyButton style={{justifyContent:'center'}}
                        title="CADASTRAR" // Passando a propriedade correta para o título do botão
                        onPress={handleRegister} // Passando a função de press

            />
                
                                 
                </View>
                <MyList
                    data={posts}
                    keyItem={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <MyItem 
                        style={styles.item}
                            onDel={()=>{delPost(item.id)}}
                            onEdit={()=>{editPost(item.id)}}
                        >
                            <Text >{item.url}</Text>
                            <Text >{item.description}</Text>  
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
    postCategorie: {
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
