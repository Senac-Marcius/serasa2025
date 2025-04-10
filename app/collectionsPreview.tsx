import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MyModal_mobile1 } from '../src/components/MyModal';
import MyButton from '../src/components/MyButtons';
import MyView from '../src/components/MyView';
import { Myinput } from '../src/components/MyInputs'
import MyList from '../src/components/MyList'
import { useRouter } from 'expo-router';
import {setCollection, iCollection,deleteCollectionById,updateCollectionById} from '../src/controllers/collections';
import { supabase } from '../src/utils/supabase'


export default function CollectionPreviewScreen() {
    const router = useRouter();
     const[collections, setCollections] = useState<iCollection[]>([]);
    
        useEffect(() =>{
            async function getTodos(){
    
                const{data:todos} = await supabase.from('collections').select()
                
                if (todos && todos.length>0){
                    setCollections(todos)
             }
        }
        getTodos()
    }, [])
    return (
    <MyView router={router}>
         <View>
         <MyList // data faz um foreach (data recebe collections)
                        data={collections}
                        keyItem={(collections) => collections.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <Text style={styles.itemText}>Nome: {item.name}</Text>
                                <Text style={styles.itemText}>Quantidade: {item.quantity}</Text>
                                <View style={styles.buttonsContainer}>

                                    <TouchableOpacity style={styles.button_round} onPress={() => { deleteCollections(item.id) }}>
                                        <Text style={styles.buttonText}>X</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.button_round} onPress={() => { editCollections(item.id) }}>
                                        <Text style={styles.buttonText}>Edit</Text>

                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={styles.button_round} onPress={() => router.push('/collectionsPreview')}>
                                        <Text style={styles.buttonText}>Visite nosso acervo</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
        </View>
    </MyView>
)}

const styles = StyleSheet.create({
    button_round: {
        backgroundColor: "#813AB1",
        width: 100,
        padding: 10,
        borderRadius: 20,
    },
    button_capsule: {
        borderRadius: 50,
        height: 45,
        width: 250,
        margin: 30,
        backgroundColor: "#813AB1",
        alignItems: "center",
        justifyContent: "center",
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',

    },
    formContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    form: {
        marginRight: 10,
        padding: 20,
        borderRadius: 30,
        backgroundColor: 'white',
        borderColor: 'purple',
        borderWidth: 0.1,
        shadowColor: 'purple',
        shadowOffset: { width: 1, height: 10 },
        shadowOpacity: 0.5,
        width: 400,
    },


    itemContainer: {
        padding: 15,
        marginBottom: 5,
        borderRadius: 30,
        backgroundColor: 'white',
        borderColor: 'purple',
        borderWidth: 0.1,
        shadowColor: 'purple',
        shadowOffset: { width: 1, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 50,
        width: 500

    },

    itemText: {
        color: 'black',
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 30,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingLeft: 10,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },

    buttonsContainer: {
        flexDirection: 'row',
        gap: 50,
        justifyContent: "space-around"

    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
})







