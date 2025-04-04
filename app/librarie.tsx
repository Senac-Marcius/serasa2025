import React, { useState } from 'react'; //função useState só retorna para uma variavel const
import { View, Text, StyleSheet, TextInput, ScrollView, ViewStyle } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import MyTabsbar from '../src/components/MyTabsBar';
import MyButton from '../src/components/MyButtons';
import MyView from '../src/components/MyView';
import MySelect from '../src/components/MySelect';
import { Myinput, MyTextArea } from '../src/components/MyInputs';
import {textStyles} from '../styles/textStyles';
import { Icon , MD3Colors} from "react-native-paper";
import {tabsBarStyles} from '../styles/tabsBarStyles';
import { useRouter } from 'expo-router';
import {items, setItems, setItem} from '../src/controllers/librarie';


export default function ItemScreen() { // aqui é TS
    const router = useRouter();

    const [req, setReq] = useState({
        id: 0,
        createAt: new Date().toISOString(),
        typology: '',
        title: '',
        subtitle: '',
        responsible: '',
        translation: '',
        language: '',
        year: '',
        edition: '',
        publisher: '',
        location: '',
        numberPages: '',
        serie: '',
        volume: '',
        format: '',
        isbn: '',
        issn: '',
        cdd: '',
        callNumber: '',
        subject: '',
        keywords: '',
        summary: '',
        notes: '',
        numberCopies: '',
        status: '',
        url: '',
        file: '',
        typeLoan: '',
    });

    function handleRegister() {

        //Campos obrigatórios de preenchimento
        if (!req.title.trim() || !req.subject.trim() || !req.keywords.trim() || !req.typology.trim() || !req.language.trim() 
        || !req.cdd.trim() || !req.status.trim() || !req.typeLoan.trim()) {
        alert('Por favor, preencha todos os campos obrigatórios: Título, Assunto, Palavras-chave, Tipologia, Idioma, CDD, Status e Tipo de Empréstimo.');
        return;
        }   

         // Atualiza req.file com o selectedFile (se existir)
        const updatedReq = {
        ...req,
        file: selectedFile || req.file, // Mantém o arquivo anterior se selectedFile for null
        };

        if (req.id === -1) {
            const newId = items.length ? items[items.length - 1].id + 1 : 0;
            const newItem = { ...updatedReq, id: newId };

            setItems([...items, newItem]);
        } else {
            setItems(items.map(i => (i.id == req.id ? updatedReq : i)));
        }
        setReq({
            id: -1,
            createAt: new Date().toISOString(),
            typology: '',
            title: '',
            subtitle: '',
            responsible: '',
            translation: '',
            language: '',
            year: '',
            edition: '',
            publisher: '',
            location: '',
            numberPages: '',
            serie: '',
            volume: '',
            format: '',
            isbn: '',
            issn: '',
            cdd: '',
            callNumber: '',
            subject: '',
            keywords: '',
            summary: '',
            notes: '',
            numberCopies: '',
            status: '',
            url: '',
            file: '',
            typeLoan: '',
        });

        setSelectedFile(null); // Limpa o selectedPdf após o registro
    };

    // Estados para as abas
    const [activeTab, setActiveTab] = useState(0);
    const tabs = ["Identificação da Obra", "Publicação e Edição", "Descrição e Classificação", "Conteúdo e Acesso"];

    // Função para lidar com o clique nas abas
    const handleTabPress = (item: string, index: number) => {
        setActiveTab(index);
    };

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    const save = () => {
        console.log("Item salvo:", req);
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

    const cancel = () => {
        setReq({
            id: 0,
            createAt: new Date().toISOString(),
            typology: '',
            title: '',
            subtitle: '',
            responsible: '',
            translation: '',
            language: '',
            year: '',
            edition: '',
            publisher: '',
            location: '',
            numberPages: '',
            serie: '',
            volume: '',
            format: '',
            isbn: '',
            issn: '',
            cdd: '',
            callNumber: '',
            subject: '',
            keywords: '',
            summary: '',
            notes: '',
            numberCopies: '',
            status: '',
            url: '',
            file: '',
            typeLoan: '',
        });
        router.push('/librarie');
    };

    //Selects
    const [typology, setTypology] = useState("Selecione a Tipologia")
    const [language, setLanguage] = useState("Selecione o Idioma") 
    const [format, setFormat] = useState("Selecione o Formato") 
    const [status, setStatus] = useState("Selecione o Status")
    const [typeLoan, setTypeLoan] = useState("Selecione o Tupo de Empréstimo")  

    return ( //encapsulamento
        <MyView router={router} >
            <Text style={styles.h1}>Cadastro de Itens no Acervo</Text>
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
                        onPress={() => router.push('/preview') }
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
                                    value={req.year}
                                    onChangeText={(text) => setReq({ ...req, year: text })}
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
                                    value={req.volume}
                                    onChangeText={(text) => setReq({ ...req, volume: text })}
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
                                    value={req.numberPages}
                                    onChangeText={(text) => setReq({ ...req, numberPages: text })}
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
                                    value={req.callNumber}
                                    onChangeText={(text) => setReq({ ...req, callNumber: text })}
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
                                    value={req.numberCopies}
                                    onChangeText={(text) => setReq({ ...req, numberCopies: text })}
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
                                    label={typeLoan} setLabel={setTypeLoan} 
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
                            onPress={handleRegister}
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
        paddingHorizontal: 10,
        flexGrow: 1,

    },
    h1: {
        textAlign: 'center',
        fontFamily: 'sans-serif',
        fontSize: 25,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: '#0F2259',
        backgroundColor: '#F2F2F2',
        margin: 20,
        padding: 15,
        borderRadius: 10,
    },
    form: {
        flex: 1,
        marginRight: 20,
        marginVertical: 30,
        marginHorizontal: 20,
        padding: 25,
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
        fontFamily: 'sans-serif',
        fontSize: 20,
        padding: 15,
        marginVertical: 15,
        borderRadius: 20,
        display:"flex",
        alignItems: 'center',
        cursor: 'pointer'
    },
    // estilos para os botões
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row', // Alinha na horizontal
        justifyContent: 'space-between', // Separa os botões
        alignItems: 'center', // Alinha verticalmente
        paddingHorizontal: 20, // Espaçamento interno
        marginVertical: 20, // Margem superior e inferior
        marginHorizontal: 20,
        backgroundColor: "transparent", // Evita que o container pareça um botão único
    },
    button_capsule1: {
        borderRadius: 50,
        backgroundColor: "#813AB1",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 50,
        marginHorizontal: 250,
        height: 50,
        paddingVertical: 10, // Melhor ajuste no espaçamento interno
        paddingHorizontal: 20,
        width: 200, // Define um tamanho mínimo para evitar botões colados
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
    },
    button_capsule2: {
        display:"flex",
        borderRadius: 50,
        backgroundColor: "#813AB1",
        alignItems: "center",
        justifyContent: "center",
    },
   
    

});