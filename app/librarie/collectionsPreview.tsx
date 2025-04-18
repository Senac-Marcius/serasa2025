import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { MyModal_mobile1 } from '../../src/components/MyModal';
import MyButton from '../../src/components/MyButtons';
import MyView from '../../src/components/MyView';
import { Myinput } from '../../src/components/MyInputs'
import { useRouter } from 'expo-router';
import { setCollection, iCollection, deleteCollectionById, updateCollectionById, getCollections } from '../../src/controllers/collections';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import MyFilter from '../../src/components/MyFilter';






export default function CollectionPreviewScreen() {
    const router = useRouter();
    const [collections, setCollections] = useState<iCollection[]>([]);

    useEffect(() => {
        async function getTodos() {
            const retorno = await getCollections({})

            if (retorno.status && retorno.data && retorno.data.length > 0) {
                setCollections(retorno.data);
            }
        }
        getTodos()
    }, [])
    
    return (
        <ScrollView>
        <MyView router={router} style={styles.View}>
                <View>
                    <View style={styles.containerCarousel}>
                        <Carousel>
                            <Carousel.Item>
                                <Image
                                    source={require('./assets/slide1biblioteca.png')}
                                    style={{ width: 1300, height: 400, resizeMode: 'contain' }}
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <Image
                                    source={require('./assets/slide2biblioteca.png')}
                                    style={{ width: 1200, height: 400, resizeMode: 'contain' }}

                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <Image
                                    source={require('./assets/slide3biblioteca.png')}
                                    style={{ width: 1200, height: 400, resizeMode: 'contain' }}

                                />
                            </Carousel.Item>
                        </Carousel>
                    </View>
                   
    
                    <MyFilter
                        style={styles.container}
                        itens={['filtro1', 'filtro2']}
                        onSend={(filter) => console.log('Filtro aplicado:', filter)}
                        onPress={(item) => console.log('Filtro pressionado:', item)}
                    />

                </View>
                <View style={styles.item2}>
                    <View>
                        <FlatList
                            data={collections}
                            numColumns={3}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                    <TouchableOpacity
                                      style={styles.itemContainer}
                                      onPress={() => router.push({ pathname:'librarie/collectionDetail', params: { id: item.id.toString() }, })}
                                    >
                                <View style={styles.itemContainer}>
                                    <Text style={styles.itemText}>Nome: {item.name}</Text>
                                    <Text style={styles.itemText}>Quantidade: {item.quantity}</Text>
                                    <Text style={styles.itemText}>Estrelas: {item.quantity}</Text>
                                </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
        </MyView >
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    View: {
        backgroundColor: "#750097",
    },
    containerCarousel: {
        display: "flex",
        width: "100%",
        height: 450,
        justifyContent: "center",
        alignItems: "center",
        padding:30,

    },
    container: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
    },

    contentContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        paddingBottom: 100
    },
  
    textTitle: {
        color: 'white',
        fontSize: 30,
        marginBottom: 5,
        justifyContent: "center",

    },
    item2: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",

    },
    FlatList: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
        backgroundColor: 'white',
        borderColor: 'purple',
        borderWidth: 0.1,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 50,
        width: 250,
        height: 400,
        alignItems:"center",
        justifyContent:"flex-end"

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







