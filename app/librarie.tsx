import React, { useState, useEffect } from 'react'; //função useState só retorna para uma variavel const
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import MyTheme from '../src/components/MyTheme';
import MyText from '../src/components/MyText';
import MyTabsbar from '../src/components/MyTabsBar';
import MyButton from '../src/components/MyButtons';
import MyView from '../src/components/MyView';
import MySelect from '../src/components/MySelect';
import { Myinput, MyTextArea } from '../src/components/MyInputs';
import {textStyles} from '../styles/textStyles';
import { Icon , MD3Colors} from "react-native-paper";
import {tabsBarStyles} from '../styles/tabsBarStyles';
import { useRouter } from 'expo-router';
import {iItem, setItem, deleteItemById, updateItemById, getItems} from '../src/controllers/librarie';
import { supabase } from '../src/utils/supabase'

export default function itemScreen() { // aqui é TS

    const [req, setReq] = useState({
        id: -1,
        created_at: new Date().toISOString(),
        typology: '',
        title: '',
        subtitle: '',
        responsible: '',
        translation: '',
        language: '',
        image: '',
        year: 0,
        edition: '',
        publisher: '',
        location: '',
        number_pages: 0,
        serie: '',
        volume: 0,
        format: '',
        isbn: '',
        issn: '',
        cdd: '',
        call_number: '',
        subject: '',
        keywords: '',
        summary: '',
        notes: '',
        number_copies: 0,
        status: '',
        url: '',
        file: '',
        type_loan: '',
    });

    const[items, setItems] = useState<iItem[]>([])

    useEffect(() =>{
        async function getTodos(){

            const retorno =await getItems({})
            
            if (retorno.status && retorno.data && retorno.data.length>0){
                setItems(retorno.data);
            }
        }
    getTodos()
    }, [])

    const router = useRouter();

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    async function handleRegister() { 
         // Atualiza req.file com o selectedFile (se existir)
        /*const updatedReq = {
        ...req,
        file: selectedFile || req.file, // Mantém o arquivo anterior se selectedFile for null
        };*/

        if (req.id == -1) {
            const newId = items.length ? items[items.length - 1].id + 1 : 0;
            const newItem = { ...req, id: newId };

            setItems([...items, newItem])
            await setItem(newItem)
        } else {
            setItems(items.map(i => (i.id == req.id) ? req : i));
        }
        setReq({
            id: -1,
            created_at: new Date().toISOString(),
            typology: '',
            title: '',
            subtitle: '',
            responsible: '',
            translation: '',
            language: '',
            image: "",
            year: 0,
            edition: '',
            publisher: '',
            location: '',
            number_pages: 0,
            serie: '',
            volume: 0,
            format: '',
            isbn: '',
            issn: '',
            cdd: '',
            call_number: '',
            subject: '',
            keywords: '',
            summary: '',
            notes: '',
            number_copies: 0,
            status: '',
            url: '',
            file: '',
            type_loan: '',
        });
        //setSelectedFile(null); // Limpa o selectedPdf após o registro

        router.push('/librarieRegisterList');
    };

    // Estados para as abas
    const [activeTab, setActiveTab] = useState(0);
    const tabs = ["Identificação da Obra", "Publicação e Edição", "Descrição e Classificação", "Conteúdo e Acesso"];

    // Função para lidar com o clique nas abas
    const handleTabPress = (item: string, index: number) => {
        setActiveTab(index);
    };

    async function pickImage() {
    // Solicita permissão para acessar a galeria
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permissão para acessar a galeria é necessária!');
            return;
        }
        // Abre a galeria para selecionar um arquivo
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    async function pickFile() {
        let result = await DocumentPicker.getDocumentAsync({
            type: [
                'application/pdf',       // PDF
                'application/epub+zip',  // EPUB
                'application/vnd.ms-word',  // DOC
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
                'application/x-mobipocket-ebook', // MOBI
            ],
        });

        if (!result.canceled && result.assets[0]) {
            setSelectedFile(result.assets[0].uri);
        }
    };

    const save = () => {
        console.log("Item salvo:", req);
    };

    const cancel = () => {
        setReq({
            id: -1,
            created_at: new Date().toISOString(),
            typology: '',
            title: '',
            subtitle: '',
            responsible: '',
            translation: '',
            language: '',
            image: '',
            year: 0,
            edition: '',
            publisher: '',
            location: '',
            number_pages: 0,
            serie: '',
            volume: 0,
            format: '',
            isbn: '',
            issn: '',
            cdd: '',
            call_number: '',
            subject: '',
            keywords: '',
            summary: '',
            notes: '',
            number_copies: 0,
            status: '',
            url: '',
            file: '',
            type_loan: '',
        });
        router.push('/librarieHome');
    };

    //Selects/Pickers
    const [typology, setTypology] = useState("Selecione a Tipologia")
    const [language, setLanguage] = useState("Selecione o Idioma") 
    const [format, setFormat] = useState("Selecione o Formato") 
    const [status, setStatus] = useState("Selecione o Status")
    const [type_loan, settype_loan] = useState("Selecione o Tipo de Empréstimo")  

    return ( //encapsulamento
        <MyView router={router} style={{ flex: 1 }}>
            <MyTheme chendTheme={()=>{}} fontSize={()=>{}}/>
            <MyText style={styles.h1}>Cadastro de Itens no Acervo</MyText>
            <View style={styles.buttonContainer}>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    style={styles.scrollRow}>
                    <MyButton
                        title="Salvar"
                        onPress={save}
                        button_type="capsule"
                        icon=""
                        style={styles.button_capsule1}
                    />
                    <MyButton
                        title="Prévia"
                        onPress={() => router.push('/librariePreview') }
                        button_type="capsule"
                        icon=""
                        style={styles.button_capsule1}
                    />
                    <MyButton
                        title="Cancelar"
                        onPress={cancel}
                        button_type="capsule"
                         icon=""
                        style={styles.button_capsule1}
                    />
                </ScrollView>
            </View>
            <MyTabsbar
                items={tabs}
                style={tabsBarStyles.tabsContainer}
                itemStyle={tabsBarStyles.tabItem}
                activeItemStyle={tabsBarStyles.activeTabItem}
                textStyle={tabsBarStyles.tabText}
                activeTextStyle={tabsBarStyles.activeTabText}
                onPress={handleTabPress}
                initialActiveIndex={0}
            />
            <View> {/* aqui é typescript dentro do front*/}
                <View style={styles.row}>
                    <View style={styles.form}>
                        {/* Conteúdo condicional baseado na aba ativa */}
                        {activeTab === 0 && (
                            <>
                                <MySelect
                                    label={typology} setLabel={setTypology} 
                                    list={            
                                        [ 
                                            {key:1, option: 'Livro'},            
                                            {key:2, option: 'Publicação Seriada'},
                                            {key:3, option: "Artigo" },
                                            {key:4, option: "Audiolivro"},
                                            {key:5, option: "Ebook" },
                                            {key:6, option: "Mapa" },
                                            {key:7, option: "Outros" },
                                        ]
                                    }
                                />
                                <Myinput
                                    placeholder="Título"
                                    value={req.title}
                                    onChangeText={(text) => setReq({ ...req, title: text })}
                                    label='' iconName=''
                                />                    
                                <Myinput
                                    placeholder="Subtítulo"
                                    value={req.subtitle}
                                    onChangeText={(text) => setReq({ ...req, subtitle: text })}
                                    label='' iconName=''
                                />
                                <Myinput
                                    placeholder="Responsáveis"
                                    value={req.responsible}
                                    onChangeText={(text) => setReq({ ...req, responsible: text })}
                                    label='' iconName=''
                                />
                                <Myinput
                                    placeholder="Tradução"
                                    value={req.translation}
                                    onChangeText={(text) => setReq({ ...req, translation: text })}
                                    label='' iconName=''
                                />
                                <MySelect
                                    label={language} setLabel={setLanguage} 
                                    list={            
                                        [ 
                                            {key:1, option: 'Português'},            
                                            {key:2, option: 'Inglês'},
                                            {key:3, option: "Espanhol" },
                                            {key:4, option: "Francês"},
                                            {key:5, option: "Outros" },
                                        ]
                                    }
                                />
                                <MyButton
                                    title="Selecionar Imagem"
                                    onPress={pickImage}
                                    button_type="capsule"
                                    icon=""
                                    style={styles.button_capsule2}
                                />
                            </>
                        )}
                            {/* outros campos de identificação */}
                        {activeTab === 1 && (
                            <>
                                <Myinput 
                                    placeholder="Ano"
                                    value={req.year?.toString()}
                                    onChangeText={(text) => setReq({ ...req, year: Number(text) })}
                                    label='' iconName=''
                                />
                                <Myinput 
                                    placeholder="Edição"
                                    value={req.edition}
                                    onChangeText={(text) => setReq({ ...req, edition: text })}
                                    label='' iconName=''
                                />
                                <Myinput 
                                    placeholder="Editora"
                                    value={req.publisher}
                                    onChangeText={(text) => setReq({ ...req, publisher: text })}
                                    label='' iconName=''
                                />
                                <Myinput 
                                    placeholder="Local"
                                    value={req.location}
                                    onChangeText={(text) => setReq({ ...req, location: text })}
                                    label='' iconName=''
                                />
                                <Myinput 
                                    placeholder="Série"
                                    value={req.serie}
                                    onChangeText={(text) => setReq({ ...req, serie: text })}
                                    label='' iconName=''
                                />
                                <Myinput 
                                    placeholder="Volume"
                                    value={req.volume?.toString()}
                                    onChangeText={(text) => setReq({ ...req, volume: Number(text) })}
                                    label='' iconName=''
                                />
                            </>
                        )}
                            {/* outros campos de identificação */}
                        {activeTab === 2 && (
                            <>
                                <MySelect
                                    label={format} setLabel={setFormat} 
                                    list={            
                                        [ 
                                            {key:1, option: 'Físico'},            
                                            {key:2, option: 'Digital'},
                                        ]
                                    }
                                />
                                <Myinput
                                    placeholder="Número de Páginas"
                                    value={req.number_pages?.toString()}
                                    onChangeText={(text) => setReq({ ...req, number_pages: Number(text) })}
                                    label='' iconName=''
                                />
                                <Myinput
                                    placeholder="ISBN"
                                    value={req.isbn}
                                    onChangeText={(text) => setReq({ ...req, isbn: text })}
                                    label='' iconName=''
                                />
                                <Myinput
                                    placeholder="ISSN"
                                    value={req.issn}
                                    onChangeText={(text) => setReq({ ...req, issn: text })}
                                    label='' iconName=''
                                />
                                <Myinput 
                                    placeholder="CDD"
                                    value={req.cdd}
                                    onChangeText={(text) => setReq({ ...req, cdd: text })}
                                    label='' iconName=''
                                />
                                <Myinput 
                                    placeholder="Número de Chamada"
                                    value={req.call_number}
                                    onChangeText={(text) => setReq({ ...req, call_number: text })}
                                    label='' iconName=''
                                />
                            </>
                        )}
                            {/* outros campos de identificação */}
                        {activeTab === 3 && (
                            <>
                                <MyTextArea 
                                    placeholder="Assunto"
                                    value={req.subject}
                                    onChangeText={(text) => setReq({ ...req, subject: text })}
                                    label='' iconName=''
                                />
                                <MyTextArea 
                                    placeholder="Palavras-chave"
                                    value={req.keywords}
                                    onChangeText={(text) => setReq({ ...req, keywords: text })}
                                    label='' iconName=''
                                />
                                <MyTextArea
                                    placeholder="Resumo"
                                    value={req.summary}
                                    onChangeText={(text) => setReq({ ...req, summary: text })}
                                    label='' iconName=''
                                />
                                <MyTextArea
                                    placeholder="Notas"
                                    value={req.notes}
                                    onChangeText={(text) => setReq({ ...req, notes: text })}
                                    label='' iconName=''
                                />
                                <Myinput
                                    placeholder="Número de exemplares"
                                    value={req.number_copies?.toString()}
                                    onChangeText={(text) => setReq({ ...req, number_copies: Number(text) })}
                                    label='' iconName=''
                                />
                                <MySelect
                                    label={status} setLabel={setStatus} 
                                    list={            
                                        [ 
                                            {key:1, option: 'Disponível'},            
                                            {key:2, option: 'Emprestado'},
                                            {key:3, option: "Reservado" },
                                            {key:4, option: "Perdido"},
                                        ]
                                    }
                                />
                                <MySelect
                                    label={type_loan} setLabel={settype_loan} 
                                    list={            
                                        [ 
                                            {key:1, option: 'Domiciliar'},            
                                            {key:2, option: 'Consulta Local'},
                                            {key:3, option: "Acesso Digital" },
                                        ]
                                    }
                                />
                                <Myinput 
                                    placeholder="Url"
                                    value={req.url}
                                    onChangeText={(text) => setReq({ ...req, url: text })}
                                    label='' iconName=''
                                />
                                <MyButton
                                    title="Upload do Material"
                                    onPress={pickFile}
                                    button_type="capsule"
                                    icon=""
                                    style={styles.button_capsule2}
                                />
                            </>
                        )}
                        <MyButton
                            title="INCORPORAR ITEM NO ACERVO"
                            onPress={ handleRegister }
                            button_type="round"
                            icon=""
                            style={styles.buttonRegister}
                        />    
                    </View>
                </View>
            </View> 
        </MyView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFF',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    scrollRow: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        flexGrow: 1,

    },
    h1: {
        textAlign: 'center',
        fontFamily: 'Poppins_400Regular',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: '#0F2259',
        backgroundColor: '#F2F2F2',
        marginVertical: 5,
        padding: 15,
        marginRight: 50,
        marginLeft: 50,
        borderRadius: 10,
    },
    form: {
        flex: 1,
        marginRight: 50,
        marginLeft: 50,
        marginHorizontal: 20,
        padding: 30,
        backgroundColor: '#AD6CD9',
        borderRadius: 10,
        shadowColor: '#0C1DA0',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
    },
    buttonRegister: {
        backgroundColor: '#0F2259',
        color: '#FFF',
        fontWeight: 'bold',
        fontFamily: 'Poppins_400Regular',
        fontSize: 20,
        padding: 15,
        marginVertical: 15,
        borderRadius: 50,
        display:"flex",
        alignItems: 'center',
        cursor: 'pointer'
    },
    buttonContainer: {
        flexDirection: 'row', // Alinha os botões horizontalmente
        justifyContent: 'center', // Mantém no centro
        alignItems: 'center', // Alinha na vertical
        paddingHorizontal: 80, // Ajuste de espaçamento interno
        marginVertical: 10,
        marginRight: 50,
        marginLeft: 50,
        width: '100%', // Garante que ocupe a largura máxima
    },
    
    button_capsule1: {
        borderRadius: 50,
        backgroundColor: "#813AB1",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        paddingVertical: 10,
        marginRight: 20,
        width: 200,
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        marginHorizontal: 100, // Adiciona espaço entre os botões
    },
    button_capsule2: {
        borderRadius: 50,
        backgroundColor: "#813AB1",
        alignItems: "center",
        justifyContent: "center",
        height: 30,
        paddingVertical: 10,
        marginRight: 20,
        marginVertical: 30,
        marginHorizontal: 20,
    },
    card: {
        backgroundColor: '#F2F2F2',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
    },
    cardText: {
        fontSize: 15,
    },

});