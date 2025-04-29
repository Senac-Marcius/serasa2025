import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { MyModal_mobile1 } from '../src/components/MyModal';
import MyButton from '../src/components/MyButtons';
import MyView from '../src/components/MyView';
import { Myinput } from '../src/components/MyInputs'
import MyList from '../src/components/MyList'
import { useRouter } from 'expo-router';
import { setCollection, iCollection, deleteCollectionById, updateCollectionById } from '../src/controllers/collections';
import { supabase } from '../src/utils/supabase'



export default function CollectionPreviewScreen() {
    const router = useRouter();
    const [collections, setCollections] = useState<iCollection[]>([]);

    useEffect(() => {
        async function getTodos() {

            const { data: todos } = await supabase.from('collections').select()

            if (todos && todos.length > 0) {
                setCollections(todos)
            }
        }
        getTodos()
    }, [])
    return (
        <MyView router={router}>
            <View style={styles.homeBar} >
                <Text style={styles.textTitle}>
                    Seja bem vindo a nossa biblioteca
                </Text>
            </View>
            <View style={styles.item}>
                <FlatList
                    data={collections}
                    numColumns={2} // ← coloca em colunas
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemText}>Nome: {item.name}</Text>
                            <Text style={styles.itemText}>Quantidade: {item.quantity}</Text>
                            <Text style={styles.itemText}>Estrelas: {item.quantity}</Text>
                        </View>
                    )}
                    
                />

            </View>
        </MyView >
    )
}

const styles = StyleSheet.create({
    contentContainerStyle:{
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        paddingBottom: 100
    },
    lista: {
        display: "flex",
        flexDirection: "row",
    },
    teste: {
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    homeBar: {
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "purple",
        height: 100,
        width: "100%"

    },
    textTitle: {
        color: 'white',
        fontSize: 30,
        marginBottom: 5,
        justifyContent: "center",

    },
    item: {
        display: "flex",
        flexDirection: "row",

    },
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
    itemContainer: {
        padding: 15,
        marginBottom: 5,
        borderRadius: 15,
        backgroundColor: 'white',
        borderColor: 'purple',
        borderWidth: 0.1,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 50,
        width: 250,
        height: 250

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
