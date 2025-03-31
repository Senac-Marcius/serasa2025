import React, { ReactNode, useState } from 'react'; //função useState só retorna para uma variavel const
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
import { Button } from 'react-native-paper';
import { Picker } from "@react-native-picker/picker";
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import MyTabsbar from '../src/components/MyTabsBar';
import { Icon } from "react-native-paper";
import MyButton from '../src/components/Mybuttons';
import MyModal2 from '../src/components/Mymodal';
import MyView from '../src/components/MyView';
import { Myinput, MyCheck, MyTextArea } from '../src/components/Myinputs';
import { Myselect } from '../src/components/Myselect';


export default function ItemScreen() { // aqui é TS
    const router = useRouter();

     // Estados para as abas
     const [activeTab, setActiveTab] = useState(0);
     const tabs = ["Identificação da Obra", "Publicação e Edição", "Descrição e Classificação", "Conteúdo e Acesso"];

      // Função para lidar com o clique nas abas
    const handleTabPress = (item: string, index: number) => {
        setActiveTab(index);
    };

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

    const [items, setItems] = useState<{ // Para armazenar os Itens
        typology: string,
        title: string,
        subtitle: string,
        responsible: string,
        translation: string,
        language: string,
        year: string,
        edition: string,
        publisher: string,
        location: string,
        numberPages: string,
        serie: string,
        volume: string,
        format: string,
        isbn: string,
        issn: string,
        cdd: string,
        callNumber: string,
        subject: string,
        keywords: string,
        summary: string,
        notes: string,
        numberCopies: string,
        status: string,
        url: string,
        file: string,
        typeLoan: string,
        createAt: string,
        id: number,
    }[]>([]);

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
        router.push('/librarie-home');
    };

     const [unity, setUnit] = useState("texto") 

    return ( //encapsulamento
        <MyView>
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
                        style={styles.button_capsule1}
                    />
                    <MyButton
                        title="Prévia"
                        onPress={() => router.push('/preview') }
                        button_type="capsule"
                        style={styles.button_capsule1}
                    />
                    <MyButton
                        title="Cancelar"
                        onPress={cancel}
                        button_type="capsule"
                        style={styles.button_capsule1}
                    />
                </ScrollView>
            </View>
            <MyTabsbar
                items={tabs}
                style={styles.tabsContainer}
                itemStyle={styles.tabItem}
                activeItemStyle={styles.activeTabItem}
                textStyle={styles.tabText}
                activeTextStyle={styles.activeTabText}
                onPress={handleTabPress}
                initialActiveIndex={0}
            />
            <View> {/* aqui é typescript dentro do front*/}
                <View style={styles.row}>
                        <View style={styles.form}>
                            {/* Conteúdo condicional baseado na aba ativa */}
                            {activeTab === 0 && (
                                <>
                                    <MySelect label={unity} setLabel={setUnit}  
                                    list={            
                                        [
                                            {key:0, option: 'x metros'},             /* exemplo do código de SELECT para copiar */
                                            {key:1, option: 'x cm'},
                                        ]
                                    } />  
                                    
                                    
                                    
                                    
                                    
                                    
                                    
                                    style={styles.picker}
                                        selectedValue={req.typology}
                                        onValueChange={(itemValue) => setReq({ ...req, typology: itemValue })}
                                    >
                                        <Picker.Item label="Selecionar Tipologia" value="" />
                                        <Picker.Item label="Livro" value="Livro" />
                                        <Picker.Item label="Publicação Seriada" value="Publicação Seriada" />
                                        <Picker.Item label="Artigo" value="Artigo" />
                                        <Picker.Item label="Audiolivro" value="Audiolivro" />
                                        <Picker.Item label="Ebook" value="Ebook" />
                                        <Picker.Item label="Mapa" value="Mapa" />
                                        <Picker.Item label="Outros" value="Outros" />
                                    <Myselect/>
                                    <Myinput
                                        placeholder="Título"
                                        value={req.title}
                                        onChangeText={(text) => setReq({ ...req, title: text })}
                                        label=""  iconName=""
                                    />                    
                                    <Myinput 
                                        placeholder="Subtítulo"
                                        value={req.subtitle}
                                        onChangeText={(text) => setReq({ ...req, subtitle: text })}
                                        label=""  iconName=""
                                    />
                                    <Myinput 
                                        placeholder="Responsáveis"
                                        value={req.responsible}
                                        onChangeText={(text) => setReq({ ...req, responsible: text })}
                                        label=""  iconName=""
                                    />
                                    <Myinput 
                                        placeholder="Tradução"
                                        value={req.translation}
                                        onChangeText={(text) => setReq({ ...req, translation: text })}
                                        label=""  iconName=""
                                    />
                                    <Picker style={styles.picker}
                                        selectedValue={req.language}
                                        onValueChange={(itemValue) => setReq({ ...req, language: itemValue })}
                                    >
                                        <Picker.Item label="Selecionar Idioma" value="" />
                                        <Picker.Item label="Português" value="Português" />
                                        <Picker.Item label="Inglês" value="Inglês" />
                                        <Picker.Item label="Espanhol" value="Espanhol" />
                                        <Picker.Item label="Francês" value="Francês" />
                                    </Picker>
                                    <MyButton
                                        title="Selecionar Imagem"
                                        onPress={pickImage}
                                        button_type="capsule"
                                        style={styles.button_capsule1}
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
                                        label=""  iconName=""
                                    />
                                    <Myinput 
                                        placeholder="Edição"
                                        value={req.edition}
                                        onChangeText={(text) => setReq({ ...req, edition: text })}
                                        label=""  iconName=""
                                    />
                                    <Myinput 
                                        placeholder="Editora"
                                        value={req.publisher}
                                        onChangeText={(text) => setReq({ ...req, publisher: text })}
                                        label=""  iconName=""
                                    />
                                    <Myinput 
                                        placeholder="Local"
                                        value={req.location}
                                        onChangeText={(text) => setReq({ ...req, location: text })}
                                        label=""  iconName=""
                                    />
                                    <Myinput 
                                        placeholder="Série"
                                        value={req.serie}
                                        onChangeText={(text) => setReq({ ...req, serie: text })}
                                        label=""  iconName=""
                                    />
                                    <Myinput 
                                        placeholder="Volume"
                                        value={req.volume}
                                        onChangeText={(text) => setReq({ ...req, volume: text })}
                                        label=""  iconName=""
                                    />
                                </>
                            )}
                                {/* outros campos de identificação */}
                            {activeTab === 2 && (
                                <>
                                    <Picker style={styles.picker}
                                        selectedValue={req.format}
                                        onValueChange={(itemValue) => setReq({ ...req, format: itemValue })}
                                    >
                                        <Picker.Item label="Selecionar Formato" value="" />
                                        <Picker.Item label="Físico" value="Físico" />
                                        <Picker.Item label="Digital" value="Digital" />
                                    </Picker>
                                    <Myinput 
                                        placeholder="Número de Páginas"
                                        value={req.numberPages}
                                        onChangeText={(text) => setReq({ ...req, numberPages: text })}
                                        label=""  iconName=""
                                    />
                                    <Myinput 
                                        placeholder="ISBN"
                                        value={req.isbn}
                                        onChangeText={(text) => setReq({ ...req, isbn: text })}
                                        label=""  iconName=""
                                    />
                                    <Myinput 
                                        placeholder="ISSN"
                                        value={req.issn}
                                        onChangeText={(text) => setReq({ ...req, issn: text })}
                                        label=""  iconName=""
                                    />
                                    <Myinput 
                                        placeholder="CDD"
                                        value={req.cdd}
                                        onChangeText={(text) => setReq({ ...req, cdd: text })}
                                        label=""  iconName=""
                                    />
                                    <Myinput 
                                        placeholder="Número de Chamada"
                                        value={req.callNumber}
                                        onChangeText={(text) => setReq({ ...req, callNumber: text })}
                                        label=""  iconName=""
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
                                        label=""  iconName=""
                                    />
                                    <MyTextArea
                                        placeholder="Palavras-chave"
                                        value={req.keywords}
                                        onChangeText={(text) => setReq({ ...req, keywords: text })}
                                        label=""  iconName=""
                                    />
                                    <MyTextArea
                                        placeholder="Resumo"
                                        value={req.summary}
                                        onChangeText={(text) => setReq({ ...req, summary: text })}
                                        label=""  iconName=""
                                    />
                                    <MyTextArea
                                        placeholder="Notas"
                                        value={req.notes}
                                        onChangeText={(text) => setReq({ ...req, notes: text })}
                                        label=""  iconName=""
                                    />
                                    <Myinput 
                                        placeholder="Número de exemplares"
                                        value={req.numberCopies}
                                        onChangeText={(text) => setReq({ ...req, numberCopies: text })}
                                        label=""  iconName=""
                                    />
                                    <Picker style={styles.picker}
                                        selectedValue={req.status}
                                        onValueChange={(itemValue) => setReq({ ...req, status: itemValue })}
                                    >
                                        <Picker.Item label="Status" value="" />
                                        <Picker.Item label="Disponível" value="Disponível" />
                                        <Picker.Item label="Emprestado" value="Emprestado" />
                                        <Picker.Item label="Reservado" value="Reservado" />
                                        <Picker.Item label="Perdido" value="Perdido" />
                                    </Picker>
                                    <Picker style={styles.picker}
                                        selectedValue={req.typeLoan}
                                        onValueChange={(itemValue) => setReq({ ...req, typeLoan: itemValue })}
                                    >
                                        <Picker.Item label="Tipo de Empréstimo" value="" />
                                        <Picker.Item label="Domiciliar" value="Domiciliar" />
                                        <Picker.Item label="Consulta Local" value="Consulta Local" />
                                        <Picker.Item label="Acesso Digital" value="Acesso Digital" />
                                    </Picker>
                                    <Myinput 
                                        placeholder="Url"
                                        value={req.url}
                                        onChangeText={(text) => setReq({ ...req, url: text })}
                                        label=""  iconName=""
                                    />
                                    <MyButton
                                        title="Upload do Material"
                                        onPress={pickFile}
                                        button_type="capsule"
                                        style={styles.button_capsule1}
                                    />
                                </>
                            )}

                            <MyButton
                                title="INCORPORAR ITEM NO ACERVO"
                                onPress={handleRegister}
                                button_type="capsule"
                                style={styles.button}
                            />    
                        </View>
                      
                </View>
            </View> 
        </MyView>
    );
}

const styles = StyleSheet.create({

    viewContainer: {
        flex: 1,
        backgroundColor: '#ffffff', 
        position: 'relative', 
    },
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
        padding: 18,
        borderRadius: 10,
    },
    form: {
        flex: 1,
        marginRight: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 20,
        backgroundColor: '#AD6CD9',
        borderRadius: 10,
        shadowColor: '#0C1DA0',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
    },
    picker: {
        height: 40,
        backgroundColor: "#FFF",
        borderColor: "#0C1DA0",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    input: {
        height: 40,
    },
    button: {
        backgroundColor: '#0F2259',
        color: '#FFF',
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        fontSize: 20,
        padding: 15,
        marginVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        cursor: 'pointer'
    },
    // estilos para as abas:
    tabsContainer: {
        flex: 1,
        padding: 15,
        backgroundColor: '#F2F2F2',
        height: 50,
        marginBottom: 10,
        borderRadius: 10,
        marginVertical: 20,
        marginHorizontal: 20,
    },
    tabItem: { // Estilo para cada aba
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 20,
        marginHorizontal: 5,
        height: 50,
        width: 300,
        borderRadius: 50,
        backgroundColor: '#F2F2F2',
        borderWidth: 2,
        borderColor: '#0F2259',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeTabItem: { // Estilo quando a aba está ativa
        backgroundColor: '#AD6CD9',
        borderBottomWidth: 5,
        borderBottomColor: '#0F2259',
    },
    tabText: { // Estilo do texto normal
        fontSize: 18,
        color: 'black',
    },
    activeTabText: { // Estilo do texto quando a aba está ativa
        fontWeight: 'bold',
        color: 'white',
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
        width: 400, // Ajuste conforme necessário
        backgroundColor: "transparent", // Evita que o container pareça um botão único
    },
    button_capsule1: {
        borderRadius: 50,
        backgroundColor: "#813AB1",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 20,
        marginHorizontal: 5,
        height: 45,
        paddingVertical: 10, // Melhor ajuste no espaçamento interno
        paddingHorizontal: 20,
        width: 250, // Define um tamanho mínimo para evitar botões colados
    },


});