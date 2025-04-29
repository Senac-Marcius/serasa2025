import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView } from 'react-native';
import { Myinput } from '../../src/components/MyInputs';
import MyButton from '../../src/components/MyButtons';
import MyList from '../../src/components/MyList';
import { getItems, iItem, setItem } from '../../src/controllers/librarie';
import { setCollection, iCollection, deleteCollectionById, updateCollectionById, getCollections } from '../../src/controllers/collections';
import { supabase } from '../../src/utils/supabase';


function StarRating({ rating, onChange }: { rating: number; onChange: (star: number) => void }) {
    return (
        
        <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => onChange(star)}>
                    <Text style={[styles.star, star <= rating ? styles.filledStar : styles.emptyStar]}>
                        ★
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}
const [items, setItems] = useState<iItem[]>([]);
// const [bookId, setBookId] = useState<number | null>(null);

//  useEffect(() => {
//     async function getTodos() {
//       const retorno = await getItems({});

//       if (retorno.status && retorno.data && retorno.data.length > 0) {
//         setItems(retorno.data);
//       }
//     }

//     getTodos();
//   }, []);

//   const selectedItem = items.find((item) => item.id === bookId);

  

export function StarCalculation() {
    const [req, setReq] = useState({
        id: -1,
        bookId:0,
        name: '',
        quantity: '',
        star: 0,
        commentary: '',
        createAt: new Date().toISOString(),
    });

    const [collections, setCollections] = useState<iCollection[]>([]);
   

    useEffect(() => {
        async function getTodos() {
            const retorno = await getCollections({});
            if (retorno.status && retorno.data && retorno.data.length > 0) {
                setCollections(retorno.data);
            }
        }
        getTodos();
    }, []);

    async function handleRegister() {
        if (req.id == -1) {
            const newId = collections.length ? collections[collections.length - 1].id + 1 : 0;
            const newCollection = { ...req, id: newId, star: Number(req.star) };
            setCollections([...collections, newCollection]);
            await setCollection(newCollection);
        } else {
            setCollections(collections.map(c => (c.id == req.id ? req : c)));
            const update = await updateCollectionById(req.id, req);
            if (!update) {
                alert("Erro ao atualizar.");
                return;
            }
        }
        setReq({
            id: -1,
            bookId:0,
            name: '',
            quantity: '',
            commentary: '',
            star: 0,
            createAt: new Date().toISOString(),
        });
    }

    function editCollection(id: number) {
        const collection = collections.find(c => c.id === id);
        if (collection) setReq(collection);
    }

    async function deleteCollection(id: number) {
        const deleted = await deleteCollectionById(id);
        if (deleted) {
            const updatedList = collections.filter(c => c.id !== id);
            setCollections(updatedList);
        } else {
            alert("Erro ao deletar.");
        }
    }
   



    return (
        <View style={styles.formContainer}>
            <View style={styles.row}>
                <ScrollView>
                <View style={styles.form}>
                    <Text style={{ marginBottom: 10, fontWeight: 'bold', fontSize: 16 }}>Estrelas</Text>
                    <StarRating
                        rating={req.star}
                        onChange={(star) => setReq({ ...req, star })}
                    />
                    <Myinput
                        value={req.commentary}
                        onChangeText={(text) => setReq({ ...req, commentary: text })}
                        placeholder="Digite a avaliação"
                        label="Avaliação"
                        iconName="message-circle"
                    />

                    <MyButton
                        onPress={handleRegister}
                        title="Salvar"
                        style={styles.button_round}
                    />
                </View>


                <MyList
                    data={collections}
                    keyItem={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemText}>Estrela: {item.star}</Text>
                            <Text style={styles.itemText}>Avaliação: {item.commentary}</Text>
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity style={styles.button_round} onPress={() => deleteCollection(item.id)}>
                                    <Text style={styles.buttonText}>X</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button_round} onPress={() => editCollection(item.id)}>
                                    <Text style={styles.buttonText}>Edit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
                </ScrollView>
            </View>
        </View>
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
        flexDirection: 'column',
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
        width: 400,
        height:600,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContainer: {
        padding: 15,
        marginBottom: 5,
        borderRadius: 30,
        backgroundColor: 'white',
        marginLeft: 50,
        marginRight: 50,
        marginTop: 50,
        width: 500,
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
    },
    starContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    star: {
        fontSize: 20,
        marginHorizontal: 5,
    },
    filledStar: {
        color: '#FFD700', 
    },
    emptyStar: {
        color: '#CCCCCC', 
    }
});
