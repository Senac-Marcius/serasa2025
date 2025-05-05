import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { iCollection } from '../../src/controllers/collections';
//import 'bootstrap/dist/css/bootstrap.css';
//import Carousel from 'react-bootstrap/Carousel';
import MySearch from '../../src/components/MySearch';
import { getItems, iItem } from '../../src/controllers/librarie';
import { supabase } from '../../src/utils/supabase';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import MyMenu from '../../src/components/MyMenu';
import Select from './select';
import { isStudent, isEmployee } from '../../src/controllers/users'








export default function CollectionPreviewScreen() {
    const router = useRouter();
    const [collections, setCollections] = useState<iCollection[]>([]);
    const [items, setItems] = useState<iItem[]>([])
    const [search, setSearch] = useState("");

    const [selectFilter, setSelectFilter] = useState("Todos");
    const [menuOpen, setMenuOpen] = useState(false);

    const [subject, setSubject] = useState("Todos");
    const [year, setYear] = useState("Todos");
    const [responsible, setResponsible] = useState("Todos");
    const [edition, setEdition] = useState("Todos");

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [recentBooks, setRecentBooks] = useState<any[]>([]);


    useEffect(() => {
        async function getTodos2() {

            const retorno = await getItems({})

            if (retorno.status && retorno.data && retorno.data.length > 0) {
                setItems(retorno.data);
            }
        }
        getTodos2()
    }, [])

    useEffect(() => {
        async function getTodos() {
            const retorno = await getItems({})

            if (retorno.status && retorno.data && retorno.data.length > 0) {
                setCollections(retorno.data);
            }
        }
        getTodos()
    }, [])

    useEffect(() => {
        itemsSearch();
    }, [search, subject, year, responsible, edition]);

    async function itemsSearch() {
        const result = await getItemsWithFilter(search, selectFilter, subject, year, responsible, edition);
        setItems(result);
    }
    const filtered = items.filter((item) =>
        item.title?.toLowerCase().includes(search.toLowerCase())
    );

    async function getItemsWithFilter(
        search: string,
        selectFilter: string,
        subject: string,
        year: string,
        responsible: string,
        edition: string

    ) {


        let query = supabase
            .from('items_librarie')
            .select('*');

        if (search) {
            query = query.or(
                `title.ilike.%${search}%,summary.ilike.%${search}%,subject.ilike.%${search}%,responsible.ilike.%${search}%`
            );
        }
        if (selectFilter && selectFilter !== 'Todos') query = query.eq('categoria', selectFilter);
        if (subject !== 'Todos') query = query.eq('subject', subject);
        if (year !== 'Todos') query = query.eq('typology', year);
        if (responsible !== 'Todos') query = query.eq('responsible', responsible);
        if (edition !== 'Todos') query = query.eq('edition', edition);

        const { data, error } = await query;

        if (error) {
            console.error("Erro ao buscar items:", error);
        }

        return data || [];
    }
    const [isEmployeeUser, setIsEmployeeUser] = useState(false);

    useEffect(() => {
        const checkRoles = async () => {
            const employeeResult = await isEmployee();
            setIsEmployeeUser(employeeResult ?? false); 
        };
        checkRoles();
    }, []);

    return (
        <ScrollView>
            <View style={styles.View}>
                <View style={styles.container}>
                    {menuOpen && <MyMenu closeMenu={() => setMenuOpen(false)} />}
                    <View style={styles.topbar}>
                        <View style={styles.leftGroup}>
                            <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)} style={styles.iconButton}>
                                <Ionicons name="menu" size={20} color="#4A148C" />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.textTitle}>
                                BIBLIOTECA
                            </Text>
                        </View>
                        <View style={styles.rightIcons}>
                            <TouchableOpacity style={styles.button_capsule} onPress={() => router.push({ pathname: '' })}>
                                <MaterialCommunityIcons name="book-open-variant" size={20} color="#750097" />
                                <Text style={styles.buttonText}>Meus empréstimos</Text>
                            </TouchableOpacity>
                          
                            {isEmployeeUser && (//exibe apenas para funcionarios
                            <TouchableOpacity style={styles.button_round} onPress={() => router.push({ pathname: 'librarie/pageEmployee' })}>
                                <MaterialCommunityIcons name="account-hard-hat" size={20} color="#750097" />
                                <Text style={styles.buttonText}>Funcionários</Text>
                            </TouchableOpacity>
                        )}

                            <TouchableOpacity style={styles.avatarButton}>
                                <Image source={{ uri: 'https://i.pravatar.cc/150?img=1' }} style={styles.avatar} />
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
                <View style={styles.containerCarousel}>
                   {/* <Carousel>
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
                    </Carousel> */}
                </View>
                <View style={styles.containerfilter}>
                    <MySearch
                        styleInput={styles.containerSearch}
                        style={styles.containerSearch}
                        busca={search}
                        placeholder='Digite aqui sua busca...'
                        onChangeText={(text) => setSearch(text)}
                        onPress={itemsSearch}
                    />
                    <View style={styles.ViewFilters}>
                        <View style={styles.ViewSelect}>
                            {/* <Text style={styles.itemTextFilter}>  Assunto </Text> */}
                            <Select
                                style={styles.ViewSelect}
                                label={subject}
                                caption="Assunto"
                                setLabel={(val) => { setSubject(val); itemsSearch(); }}
                                list={[
                                    { key: 0, option: "Todos" },
                                    { key: 1, option: "Ficção Científica" },
                                    { key: 2, option: "Romance" },
                                    { key: 3, option: "Terror" },
                                    { key: 4, option: "Suspense" },
                                    { key: 5, option: "Mistério" },
                                    { key: 6, option: "Fantasia" },
                                    { key: 7, option: "Outros" },
                                ]}
                            />
                        </View>
                        <View style={styles.ViewSelect}>
                            {/* <Text style={styles.itemTextFilter}>  Ano </Text> */}
                            <Select
                                label={year}
                                setLabel={(val) => { setYear(val); itemsSearch(); }}
                                caption="Avaliação"
                                list={[
                                    { key: 0, option: 'Todos' },
                                    { key: 1, option: 'Livro' },
                                    { key: 2, option: 'Publicação Seriada' },
                                    { key: 3, option: "Artigo" },
                                    { key: 4, option: "Audiolivro" },
                                    { key: 5, option: "Ebook" },
                                    { key: 6, option: "Mapa" },
                                    { key: 7, option: "Outros" },
                                ]}
                            />
                        </View>
                        <View style={styles.ViewSelect}>
                            {/* <Text style={styles.itemTextFilter}>  Autores </Text> */}
                            <Select
                                label={responsible}
                                setLabel={(val) => { setResponsible(val); itemsSearch(); }}
                                caption="Autor"
                                list={[
                                    { key: 0, option: 'Todos' },
                                    { key: 1, option: 'Jane Austen' },
                                    { key: 2, option: 'Colleen Hoover' },
                                    { key: 3, option: "J.R.R. Tolkien" },
                                    { key: 4, option: "J.K. Rowling" },
                                    { key: 5, option: "Arthur C. Clarke" },
                                    { key: 6, option: "Isaac Asimov" },
                                    { key: 7, option: "Dan Brown" },
                                    { key: 8, option: "Stephen King" },
                                    { key: 9, option: "H.P. Lovecraft" },
                                    { key: 10, option: "Agatha Christie" },
                                ]}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.item2}>
                    <View>
                        {items.length === 0 ? (
                            <Text style={styles.noResultText}>
                                Nenhum item encontrado com os filtros ou busca informados.
                            </Text>
                        ) : (
                            <FlatList
                                data={items}
                                numColumns={4}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            // if (item.keywords) {
                                            //     const tagsArray = item.keywords.split(',').map(tag => tag.trim());
                                            // }
                                            router.push({ pathname: 'librarie/collectionDetail', params: { id: item.id.toString() } });
                                        }}
                                    >
                                        <View style={styles.itemContainer}>
                                            <View style={styles.styleimg}><Image source={{ uri: item.image }} style={styles.image}></Image></View>
                                            <Text style={styles.itemTitlename}>{item.title}</Text>
                                            <Text style={styles.itemText}> {item.responsible}</Text>
                                            <View style={styles.tagsContainer}>
                                                {item.subject?.split(',').map((tag, index) => (
                                                    <View key={index} style={styles.tag}>
                                                        <Text style={styles.tagText}>{tag.trim()}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>

                                    </TouchableOpacity>
                                )}
                            />
                        )}
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    View: {
        backgroundColor: "white",
        margin: 0,
        padding: 0,
        zIndex: 2,
        height: "100%"
    },

    containerCarousel: {
        display: "flex",
        width: "100%",
        height: 500,
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
        backgroundColor: "#750097",
        borderRadius: 10,

    },
    ViewSelect: {

    },
    ViewFilters: {
        display: "flex",
        flexDirection: "row",
    },
    containerSearch: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        height: 10,
        width: "100%",
        display: "flex",
        justifyContent: 'center',
        alignItems: "center",
        color: "purple"

    },
    containerfilter: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: 350,
        marginTop: 15,
        paddingBottom: 90,
        gap: 40,
        backgroundColor: "#750097",
        borderRadius: 10,
        flexDirection: "column",
    },
    itemTextFilter: {
        color: 'white',
        fontSize: 20,
        marginBottom: 5,
        justifyContent: "center",
    },

    textTitle: {
        fontFamily: 'Poppins_400Regular',
        fontWeight: 600,
        color: '#750097',
        fontSize: 30,
        marginBottom: 5,
        justifyContent: "center",

    },
    itemTitlename: {
        color: 'grey',
        fontSize: 18,
        fontWeight: "bold",
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

    },
    FlatList: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    button_round: {
        backgroundColor: "#EDE7F6",
        width: 150,
        padding: 10,
        borderRadius: 20,
        flexDirection: "row"
    },
    button_capsule: {
        backgroundColor: "#EDE7F6",
        width: 200,
        padding: 10,
        borderRadius: 20,
        flexDirection: "row"
    },
    itemContainer: {
        padding: 25,
        margin: 5,
        backgroundColor: '#ecdef0',
        borderWidth: 3,
        borderColor: "white",
        marginLeft: 50,
        marginRight: 50,
        marginTop: 50,
        width: 300,
        height: 500,
        alignItems: "center",
        justifyContent: "flex-start",

    },
    image: {
        width: 200,
        height: 270,
    },
    styleimg: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    },
    noResultText: {
        color: '#750097',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 30,
        textAlign: 'center',
    },
    itemText: {
        color: 'black',
        fontSize: 16,
        marginBottom: 5,
    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: 50,
        justifyContent: "space-around"

    },
    buttonText: {
        color: '#750097',
        fontSize: 13,
        fontWeight: 'bold',
    },
    container: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 1,
        zIndex: 10,
    },
    topbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    rightIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconButton: {
        backgroundColor: '#EDE7F6',
        padding: 10,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F4F4F4',
        borderRadius: 20,
        paddingHorizontal: 12,
        height: 36,
        borderWidth: 1,
        borderColor: '#DDD',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    searchInput: {
        fontSize: 14,
        color: '#333',
        marginLeft: 8,
        minWidth: 160,
    },
    searchIcon: {
        marginTop: 1,
    },
    avatarButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        overflow: 'hidden',
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 18,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        gap: 5,
    },

    tag: {
        backgroundColor: '#E0BBE4', // lilás claro, combina com seu roxo
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },

    tagText: {
        fontSize: 12,
        color: '#4A148C', // seu roxinho escuro
        fontWeight: 'bold',
    },
})







