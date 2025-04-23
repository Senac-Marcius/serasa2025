import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import MyButton from '../../src/components/MyButtons';
import MyView from '../../src/components/MyView';
import { Myinput } from '../../src/components/MyInputs'
import { useRouter, Link } from 'expo-router';
import { setCollection, iCollection, deleteCollectionById, updateCollectionById, getCollections } from '../../src/controllers/collections';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import MyFilter from '../../src/components/MyFilter';
import MySearch from '../../src/components/MySearch';
import { getItems, iItem } from '../../src/controllers/librarie';
import { supabase } from '../../src/utils/supabase';
import { Ionicons } from '@expo/vector-icons';
import MyMenu from '../../src/components/MyMenu';




export default function CollectionPreviewScreen() {
    const router = useRouter();
    const [collections, setCollections] = useState<iCollection[]>([]);
    const [items, setItems] = useState<iItem[]>([])


    useEffect(() => {
        //     async function getTodos() {
        //         const retorno = await getCollections({})

        //         if (retorno.status && retorno.data && retorno.data.length > 0) {
        //             setCollections(retorno.data);
        //         }
        //     }
        // getTodos()
        async function getTodos2() {

            const retorno = await getItems({})

            if (retorno.status && retorno.data && retorno.data.length > 0) {
                setItems(retorno.data);
            }
        }
        getTodos2()
    }, [])

    const [search, setSearch] = useState("");

    const [selectFilter, setSelectFilter] = useState("Todos");

    async function itemsSearch() {
        const result = await getItemsWithFilter(search, selectFilter);
        setItems(result);
    }
    const filtered = items.filter((item) =>
        item.title?.toLowerCase().includes(search.toLowerCase())
    );

    async function getItemsWithFilter(search: string, selectFilter: string) {
        let query = supabase
            .from('items_librarie')
            .select('*');

        if (search) {
            query = query.ilike('title', `%${search}%`);
        }

        if (selectFilter && selectFilter !== 'Todos') {
            query = query.eq('categoria', selectFilter);
        }

        const { data, error } = await query;

        if (error) {
            console.error("Erro ao buscar items:", error);
        }

        return data || [];
    }
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <ScrollView>
            <View style={styles.View}>
            {menuOpen && <MyMenu closeMenu={() => setMenuOpen(false)} />}
                    <View style={styles.topbarPill}>
                        <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)} style={styles.iconButton}>
                            <Ionicons name="menu" size={24} color="#fff" />
                        </TouchableOpacity>
                            <Text style={styles.textTitle}>
                                Biblioteca - Nosso Acervo
                            </Text>
                        <View style={styles.rightIcons}>
                            <Link href="/perfil" asChild>
                                <TouchableOpacity style={styles.iconButton}>
                                    <Ionicons name="person" size={25} color="#fff" />
                                    <Text style={styles.buttonText}>
                                        Úsuario
                                    </Text>
                                </TouchableOpacity>
                            </Link>
                            <Link href="librarie/pageEmployee" asChild>
                                <TouchableOpacity style={styles.iconButton}>
                                    <Ionicons name="person" size={25} color="#fff" />
                                    <Text style={styles.buttonText}>
                                        Funcionário
                                    </Text>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    
                </View>
                <View style={styles.containerCarousel}>
                    <Carousel>
                        <Carousel.Item>
                            <Image
                                source={require('./assets/slide1biblioteca.png')}
                                style={{ width: 1300, height: 470, resizeMode: 'cover' }}
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image
                                source={require('./assets/slide2biblioteca.png')}
                                style={{ width: 1200, height: 470, resizeMode: 'cover' }}

                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image
                                source={require('./assets/slide3biblioteca.png')}
                                style={{ width: 1200, height: 470, resizeMode: 'cover' }}

                            />
                        </Carousel.Item>
                    </Carousel>
                </View>
                <MySearch
                    style={styles.containerSearch}
                    busca={search}
                    onChangeText={(text) => setSearch(text)}
                    onPress={itemsSearch}
                />

                <MyFilter
                    itens={['Todos', 'Livros', 'Revistas']}
                    style={styles.containerFilter}
                    onSend={(filtro) => {
                        setSelectFilter(filtro);
                        itemsSearch();
                    }}
                    onPress={(item) => console.log('Filtro pressionado:', item)}
                />
            </View>
            <View style={styles.item2}>
                <View>
                    <FlatList
                        data={items}
                        numColumns={3}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.itemContainer}
                                onPress={() => router.push({ pathname: 'librarie/collectionDetail', params: { id: item.id.toString() }, })}
                            >
                                <View style={styles.itemContainer}>
                                    <Text style={styles.itemText}>Nome: {item.title}</Text>
                                    <Text style={styles.itemText}>Quantidade: {item.subtitle}</Text>
                                    <Text style={styles.itemText}>Estrelas: {item.edition}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    View: {
        backgroundColor: "#fff7f7",
        margin: 0,       
        padding: 0,      
        zIndex: 2,
    },

    containerCarousel: {
        display: "flex",
        width: "100%",
        height: 500,
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
        backgroundColor: "#750097",
        borderRadius: 30,

    },
    containerFilter: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        borderRadius: 50,
        margin: 10,
    },
    containerSearch: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        borderRadius: 50,
        color: "purple"

    },
    contentContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        paddingBottom: 100
    },

    textTitle: {
        color: '#750097',
        fontSize: 30,
        marginBottom: 5,
        justifyContent: "center",

    },
    titleView: {
        display: "flex",
        justifyContent: "center",
    },
    item2: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#fff7f7",

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
        borderStyle: 'solid',
        borderWidth: 3,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 50,
        width: 250,
        height: 400,
        alignItems: "center",
        justifyContent: "flex-end"

    },

    itemText: {
        color: 'black',
        fontSize: 16,
        marginBottom: 5,
    },
    iconButton: {
        backgroundColor: '#6A1B9A',
        padding: 10,
        borderRadius: 30,
        marginHorizontal: 4,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
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
    rightIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    topbarPill: {
        marginHorizontal: 16,
        marginTop: 16,
        backgroundColor: '#f1f1f1',
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#9C27B0',
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        display: "flex",
        justifyContent: "space-between",
        alignItems: 'center',
        margin: 15,
        zIndex: 5,
    },
})







