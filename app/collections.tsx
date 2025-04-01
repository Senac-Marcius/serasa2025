import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextStyle } from 'react-native';
import { Button, TextInput, RadioButton, Checkbox } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { MyModal_mobile1, MyModal_mobile2, MyModal_mobile3, MyModal_mobilefullscreen, MyModal1_desktop } from '../src/components/Mymodal';
import MyButton from '../src/components/Mybuttons';
import MyView from '../src/components/MyView';
import { Myinput, MyCheck, MyTextArea } from '../src/components/Myinputs'
import MyList from '../src/components/mylist'

//função userState só retorna para uma variavel const

export default function CollectionScreen() {

    const [visible, setVisible] = useState(false);

    const router = useRouter();
    const [req, setReq] = useState({
        id: 0,
        name: '',
        quantity: '',
        star: '',
        creatAt: new Date().toISOString()
    });
    const [collections, setCollections] = useState<{
        name: string,
        quantity: string,
        star: string,
        creatAt: string,
        id: number,
    }[]>([])

    function handleRegister() {
        if (req.id == -1) {
            const newId = collections.length ? collections[collections.length - 1].id + 1 : 0
            const newcollections = { ...req, id: newId }
            setCollections([...collections, newcollections])

        } else {
            setCollections(collections.map(c => (c.id == req.id ? req : c)))

        }
        setReq({
            id: -1,
            name: '',
            quantity: '',
            star: '',
            creatAt: new Date().toISOString()
        })

    }
    function editCollections(id: number) {
        let collection = collections.find(c => c.id == id)
        if (collection)
            setReq(collection)


    }

    function deleteCollections(id: number) {
        const list = collections.filter(c => c.id != id)
        if (list)
            setCollections(list)

    }

    return (//encapsulamento 
        <MyView >
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
