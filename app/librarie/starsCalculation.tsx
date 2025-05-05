import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Myinput } from '../../src/components/MyInputs';
import MyButton from '../../src/components/MyButtons';
import MyList from '../../src/components/MyList';
import { getItems, iItem, setItem } from '../../src/controllers/librarie';
import { setCollection, iCollection, deleteCollectionById, updateCollectionById, getCollections } from '../../src/controllers/collections';
import { supabase } from '../../src/utils/supabase';
import { getLoggedUserId } from '../../src/controllers/users'


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

 


type StarCalculationProps = {
    BookId: number;
};

export default function StarCalculation({ BookId }: StarCalculationProps) {
    const [items, setItems] = useState<iItem[]>([]);
    const [successMessage, setSuccessMessage] = useState('');

    console.log('Avaliação para BookId:', BookId);
    const [req, setReq] = useState({
        id: -1,
        bookId: 0,
        name: '',
        totalStar:0,
        quantity: '',
        star: 0,
        commentary: '',
        userId: '',
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
    useEffect(() => {
        async function loadOrReset() {
            const _userId = await getLoggedUserId();
    
            const existing = collections.find(
                (c) => c.bookId === BookId && c.userId === _userId
            );
    
            if (existing) {
                setReq(existing);
            } else {
                setReq({
                    id: -1,
                    bookId: BookId,
                    name: '',
                    totalStar: 0,
                    quantity: '',
                    commentary: '',
                    star: 0,
                    userId: '',
                    createAt: new Date().toISOString(),
                });
            }
    
            setSuccessMessage('');
        }
    
        loadOrReset();
    }, [BookId, collections]);
    
    async function handleRegister() {
        const _userId = await getLoggedUserId();

        // Verifica se o usuário já avaliou este livro
        const alreadyRated = collections.some(
            (c) => c.bookId === req.bookId && c.userId === _userId
        );
        

        if (alreadyRated && req.id === -1) {
            alert("Você já avaliou este exemplar.");
            return;
        }

        if (req.id === -1) {
            const newId = collections.length ? collections[collections.length - 1].id + 1 : 0;
            const newCollection = {
                ...req,
                bookId: BookId,
                id: newId,
                star: Number(req.star),
                userId: _userId!,
            };
            setCollections([...collections, newCollection]);
            await setCollection(newCollection);
            await updateItemStar(BookId);
            setSuccessMessage('Reservado com sucesso! ✅');
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
            bookId: 0,
            name: '',
            totalStar:0,
            quantity: '',
            commentary: '',
            star: 0,
            userId: '',
            createAt: new Date().toISOString(),
        });
    }
    const getAverageStarsByBookId = async () => {
        const { data, error } = await supabase
          .from("collections")
          .select("bookId, star");
      
        if (error) {
          console.error("Erro ao buscar avaliações:", error);
          return {};
        }
      
        const starMap: Record<string, { total: number; count: number }> = {};
      
        data.forEach(({ bookId, star }) => {
            if (!bookId || star == null) return;
          
            if (!starMap[bookId]) {
              starMap[bookId] = { total: star, count: 1 };
            } else {
              starMap[bookId].total += star;
              starMap[bookId].count += 1;
            }
          });
      
        const averageMap: Record<string, number> = {};
        for (const id in starMap) {
          const { total, count } = starMap[id];
          averageMap[id] = total / count;
        }
      
        return averageMap;
      };
      const updateItemStar = async (bookId: number) => {
        const averageMap = await getAverageStarsByBookId();
        const average = averageMap[bookId];
      
        if (average === undefined) return;
      
        const { error } = await supabase
          .from("items_librarie") // ou o nome real da tabela de itens
          .update({ star: average })
          .eq("id", bookId); // assumindo que `bookId` corresponde ao `id` da tabela items
      
        if (error) {
          console.error(`Erro ao atualizar star em items para bookId ${bookId}:`, error);
        }
      };
      

    return (
        <View style={styles.formContainer}>
            <View style={styles.row}>
                <ScrollView>
                    <View style={styles.form}>
                        <Text style={styles.text}>Estrelas</Text>
                        <StarRating
                            rating={req.star}
                            onChange={(star) => setReq({ ...req, star })}
                        />
                        <Myinput
                            value={req.commentary}
                            onChangeText={(text) => setReq({ ...req, commentary: text })}
                            style={styles.inputComentary}
                            placeholder="Digite a avaliação"
                            label="Avaliação"
                            iconName="pen"
                        />
                        <View style={styles.containerRegister}>
                        <View style={{ marginTop: 20, alignItems: 'center' }}>
                            <Text style={styles.textPreview}>Prévia da Avaliação:</Text>
                            <Text>Estrelas: {req.star} ★</Text>
                            <Text>Comentário: {req.commentary || "Nenhum comentário ainda."}</Text>
                        </View>
                        
                        <MyButton
                            onPress={handleRegister}
                            title="Salvar"
                            style={styles.button_round}
                        />
                        </View>
                    </View>
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
    containerRegister:{
        gap:10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        marginBottom: 10, 
        fontWeight: 'bold', 
        fontSize: 30,
        color:"#813AB1"
    },
    textPreview:{
        marginBottom: 10, 
        fontWeight: 'bold', 
        fontSize: 15,
        color:"#813AB1"

    },
    inputComentary:{
        fontWeight: 'bold', 
        fontSize: 25,
        color:"#813AB1"
    },
    form: {
        padding: 20,
        borderRadius: 30,
        backgroundColor: 'white',
        width: 400,
        height:"auto",
        justifyContent: 'center',
        alignItems: 'center',
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
        fontSize: 35,
        marginHorizontal: 5,
    },
    filledStar: {
        color: '#FFD700',
    },
    emptyStar: {
        color: '#CCCCCC',
    }
});
