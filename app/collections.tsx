import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MyModal_mobile1 } from '../src/components/MyModal';
import MyButton from '../src/components/MyButtons';
import MyView from '../src/components/MyView';
import { Myinput } from '../src/components/MyInputs'
import MyList from '../src/components/MyList'
import { useRouter } from 'expo-router';
import {setCollection, iCollection,deleteCollectionById,updateCollectionById,getCollections} from '../src/controllers/collections';




//função userState só retorna para uma variavel const

export default function CollectionScreen() {

    const [req, setReq] = useState({
        id: 0,
        name: '',
        quantity: '',
        star: '',
        createAt: new Date().toISOString()
    });

    const [visible, setVisible] = useState(false);

    const[collections, setCollections] = useState<iCollection[]>([]);

    useEffect(() =>{
        async function getTodos(){

            const retorno =await getCollections({})
            
            if (retorno.status && retorno.data && retorno.data.length>0){
                setCollections(retorno.data);
         }
    }
    getTodos()
}, [])


    

     async function handleRegister() {
        if (req.id == -1) {
            const newId = collections.length ? collections[collections.length - 1].id + 1 : 0
            const newCollections = {...req, id: newId}
            setCollections([...collections, newCollections])
            await setCollection(newCollections)
             

        } else {
            setCollections(collections.map(c => (c.id == req.id ? req : c)))
            const deletecollection = await updateCollectionById(req.id, req)
            if (!deletecollection) {
                alert("Erro ao atualizar usuário.")
                return
            }
            
        }
        setReq({
            id: -1,
            name: '',
            quantity: '',
            star: '',
            createAt: new Date().toISOString()
        })

    }
    function editCollections(id: number) {
        let collection = collections.find(c => c.id == id)
        if (collection)
            setReq(collection)


    }
  

    async function deleteCollections(id: number) {
        const deletecollection = await deleteCollectionById(id)
        if (deletecollection) {
            const updatedList = collections.filter(c => c.id != id)
            setCollections(updatedList)
        } else {
            alert("Erro ao deletar usuário.")
        }
    }

    const router = useRouter();

   


    return (//encapsulamento 
        <MyView router={router} >
            <View style={styles.formContainer}>
                <View style={styles.row}>
                    <View style={styles.form}>
                        <Myinput
                            value={req.name}
                            onChangeText={(text) => setReq({ ...req, name: text })}
                            placeholder="Nome do livro"
                            label="Nome do livro"
                            iconName="book"
                        />

                        <Myinput
                            value={req.quantity}
                            onChangeText={(text) => setReq({ ...req, quantity: text })}
                            placeholder="Quantidade"
                            label="Quantidade"
                            iconName="add"
                        />

                        <Myinput
                            value={req.star}
                            onChangeText={(text) => setReq({ ...req, star: text })}
                            placeholder="Estrelas"
                            label="Estrelas"
                            iconName="star"
                        />


                        <MyModal_mobile1 visible={visible} setVisible={setVisible} style={styles.button_capsule}>
                            DESEJA CONFIRMAR O CADASTRO?

                            <MyButton
                                onPress={() => {handleRegister()}}
                                title="SIM"
                                style={styles.button_round}
                            />
                        </MyModal_mobile1>

                    </View>
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
            </View>
        </MyView >
    );
}
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

