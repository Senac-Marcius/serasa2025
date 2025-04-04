import React, { useState, useEffect } from 'react';
import { View,Text, StyleSheet,FlatList, Button,TextInput} from 'react-native';
import MyList from '../src/components/MyList'
import {MyItem} from '../src/components/MyItem'
import MyView from '../src/components/MyView'
import { useRouter } from 'expo-router';
import { Myinput } from '../src/components/MyInputs';
import MyButton from '../src/components/MyButtons'
import MyUpload from '../src/components/MyUpload';
import {setPost, getPosts, iPost} from '../src/controllers/posts'
import { supabase } from '../src/utils/supabase'


export default function PostScreen(){

    const [req, setReq] = useState({
        description : '',
        id: -1,
        like: 0,
        url: '',
        create_at: new Date().toISOString(),
        user_id : 2,    
    });

    const[posts, setPosts] = useState<iPost[]>([]);


    useEffect(() => {
        async function getTodos() {
          const { data: todos } = await supabase.from('posts').select()
    
          if (todos && todos.length > 1) {
            setPosts(todos)
          }
        }
    
        getTodos()
      }, [])
    
 
    //aqui estava o vetor que foi para o controlador
    
    function handleRegister(){
        if(req.id == -1){
            const newid= posts.length ? posts[posts.length-1].id+1:0;
            const newPost = {... req, id: newid};
            setPosts([...posts, newPost])
            setPost(newPost)
        }else{
            setPosts(posts.map(i =>(i.id == req.id)? req: i )  );
    
        }

        setReq({
            description : '',
            id: -1,
            like: 0,
            url: '',
            create_at: new Date().toISOString(),
            user_id : 2,    
        })
    }
    
    function editCategorie(id:number){
        let p= posts.find(i => i.id== id)
        if(p)
            setReq(p)
    }
    function delCategorie(id:number){
        const list= posts.filter(i => i.id != id)
        if(list)
        setPosts(list)
    }
    
    const router = useRouter();

    return (
        <MyView router={router} >

            <View style={styles.row}>
                <View style={styles.form}>
                    
                    <Myinput 
                        value={req.description} 
                        onChangeText={(text) => setReq({ ...req, description: text })} 
                        placeholder="Digite o que você esta pensando..." 
                        label="Descrição" 
                        iconName='' 
                    />
                    
                    <MyUpload url={req.url} setUrl={(url) => setReq({ ...req, url: url })} />
                      
                    <MyButton
                        title="CADASTRAR"
                        onPress={handleRegister}
                        button_type="capsule"
                    />
                                 
                </View>
                <MyList
                    data={posts}
                    keyItem={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <MyItem 
                            onDel={()=>{delCategorie(item.id)}}
                            onEdit={()=>{editCategorie(item.id)}}
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
