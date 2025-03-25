import React, { useState } from 'react'; //função useState só retorna para uma variavel const
import { View, Text, StyleSheet, Button, TextInput, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import MyTabsbar from '../src/components/MyTabsBar';

export default function ItemScreen() { // aqui é TS
    const router = useRouter();

     // Estados para as abas
     const [activeTab, setActiveTab] = useState(0);
     const tabs = ["Identificação da Obra", "Publicação e Edição", "Descrição e Classificação", "Conteúdo e Acesso"];

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

    // Função para lidar com o clique nas abas
    const handleTabPress = (item: string, index: number) => {
        setActiveTab(index);
    };

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
    }

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
    }

    function editItem(id: number) {
        const item = items.find(i => i.id == id)
        if (item)
            setReq(item)
    }

    function dellItem(id: number) {
        const list = items.filter(i => i.id != id)
        setItems(list)
    }

    return ( //encapsulamento
        <ScrollView style={styles.container}>
           <Text style={styles.h1}>Cadastro de Itens no Acervo</Text>
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
                                <Picker style={styles.picker}
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
                                </Picker>
                                <TextInput style={styles.input}
                                    placeholder="Título"
                                    value={req.title}
                                    onChangeText={(text) => setReq({ ...req, title: text })}
                                />
                                {req.title}
                                <TextInput style={styles.input}
                                    placeholder="Subtítulo"
                                    value={req.subtitle}
                                    onChangeText={(text) => setReq({ ...req, subtitle: text })}
                                />
                                {req.subtitle}
                                <TextInput style={styles.input}
                                    placeholder="Responsáveis"
                                    value={req.responsible}
                                    onChangeText={(text) => setReq({ ...req, responsible: text })}
                                />
                                {req.responsible}
                                <TextInput style={styles.input}
                                    placeholder="Tradução"
                                    value={req.translation}
                                    onChangeText={(text) => setReq({ ...req, translation: text })}
                                />
                                {req.translation}
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
                                <Text>Selecione uma Imagem de Capa:</Text>
                                <TouchableOpacity style={styles.button} onPress={pickImage}>
                                    <Text style={{ color: '#FFF' }}>Selecionar Imagem</Text>
                                </TouchableOpacity>

                                {selectedImage && (
                                <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200, marginTop: 10 }} />
                                )}
                            </>
                        )}
                            {/* outros campos de identificação */}
                        {activeTab === 1 && (
                            <>
                                <TextInput style={styles.input}
                                    placeholder="Ano"
                                    value={req.year}
                                    onChangeText={(text) => setReq({ ...req, year: text })}
                                />
                                {req.year}
                                <TextInput style={styles.input}
                                    placeholder="Edição"
                                    value={req.edition}
                                    onChangeText={(text) => setReq({ ...req, edition: text })}
                                />
                                {req.edition}
                                <TextInput style={styles.input}
                                    placeholder="Editora"
                                    value={req.publisher}
                                    onChangeText={(text) => setReq({ ...req, publisher: text })}
                                />
                                {req.publisher}
                                <TextInput style={styles.input}
                                    placeholder="Local"
                                    value={req.location}
                                    onChangeText={(text) => setReq({ ...req, location: text })}
                                />
                                {req.location}
                                <TextInput style={styles.input}
                                    placeholder="Série"
                                    value={req.serie}
                                    onChangeText={(text) => setReq({ ...req, serie: text })}
                                />
                                {req.serie}
                                <TextInput style={styles.input}
                                    placeholder="Volume"
                                    value={req.volume}
                                    onChangeText={(text) => setReq({ ...req, volume: text })}
                                />
                                {req.volume}
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
                                <TextInput style={styles.input}
                                    placeholder="Número de Páginas"
                                    value={req.numberPages}
                                    onChangeText={(text) => setReq({ ...req, numberPages: text })}
                                />
                                {req.numberPages}
                                <TextInput style={styles.input}
                                    placeholder="ISBN"
                                    value={req.isbn}
                                    onChangeText={(text) => setReq({ ...req, isbn: text })}
                                />
                                {req.isbn}
                                <TextInput style={styles.input}
                                    placeholder="ISSN"
                                    value={req.issn}
                                    onChangeText={(text) => setReq({ ...req, issn: text })}
                                />
                                {req.issn}
                                <TextInput style={styles.input}
                                    placeholder="CDD"
                                    value={req.cdd}
                                    onChangeText={(text) => setReq({ ...req, cdd: text })}
                                />
                                {req.cdd}
                                <TextInput style={styles.input}
                                    placeholder="Número de Chamada"
                                    value={req.callNumber}
                                    onChangeText={(text) => setReq({ ...req, callNumber: text })}
                                />
                                {req.callNumber}
                            </>
                        )}
                            {/* outros campos de identificação */}
                        {activeTab === 3 && (
                            <>
                                <TextInput style={styles.input}
                                    multiline={true}
                                    numberOfLines={2}
                                    placeholder="Assunto"
                                    value={req.subject}
                                    onChangeText={(text) => setReq({ ...req, subject: text })}
                                />
                                {req.subject}
                                <TextInput style={styles.input}
                                    multiline={true}
                                    numberOfLines={2}
                                    placeholder="Palavras-chave"
                                    value={req.keywords}
                                    onChangeText={(text) => setReq({ ...req, keywords: text })}
                                />
                                {req.keywords}
                                <TextInput style={styles.input}
                                    multiline={true}
                                    numberOfLines={10}
                                    placeholder="Resumo"
                                    value={req.summary}
                                    onChangeText={(text) => setReq({ ...req, summary: text })}
                                />
                                {req.summary}
                                <TextInput style={styles.input}
                                    multiline={true}
                                    numberOfLines={10}
                                    placeholder="Notas"
                                    value={req.notes}
                                    onChangeText={(text) => setReq({ ...req, notes: text })}
                                />
                                {req.notes}
                                <TextInput style={styles.input}
                                    placeholder="Número de exemplares"
                                    value={req.numberCopies}
                                    onChangeText={(text) => setReq({ ...req, numberCopies: text })}
                                />
                                {req.numberCopies}
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
                                <TextInput style={styles.input}
                                    placeholder="url"
                                    value={req.url}
                                    onChangeText={(text) => setReq({ ...req, url: text })}
                                />
                                {req.url}
                                <Text>Upload do Material:</Text>
                                <TouchableOpacity style={styles.button} onPress={pickFile}>
                                    <Text style={{ color: '#FFF' }}>Selecionar Arquivo</Text>
                                </TouchableOpacity>
                                {selectedFile && (
                                    <Text style={{ marginTop: 10, color: 'purple' }}>Arquivo: {selectedFile}</Text>
                                )}
                            </>
                        )}
                    <TouchableOpacity style={styles.button} onPress={handleRegister}>INCORPORAR ITEM NO ACERVO</TouchableOpacity>
                    </View>

                    <FlatList
                        data={items}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <Text style={styles.cardText}>Tipologia: {item.typology}</Text>
                                <Text style={styles.cardText}>Título: {item.title}</Text>
                                <Text style={styles.cardText}>Subtítulo: {item.subtitle}</Text>
                                <Text style={styles.cardText}>Responsáveis: {item.responsible}</Text>
                                <Text style={styles.cardText}>Tradução: {item.translation}</Text>
                                <Text style={styles.cardText}>Idioma: {item.language}</Text>
                                <Text style={styles.cardText}>Ano: {item.year}</Text>
                                <Text style={styles.cardText}>Edição: {item.edition}</Text>
                                <Text style={styles.cardText}>Editora: {item.publisher}</Text>
                                <Text style={styles.cardText}>Local: {item.location}</Text>
                                <Text style={styles.cardText}>Número de Páginas: {item.numberPages}</Text>
                                <Text style={styles.cardText}>Série: {item.serie}</Text>
                                <Text style={styles.cardText}>Volume: {item.volume}</Text>
                                <Text style={styles.cardText}>Formato: {item.format}</Text>
                                <Text style={styles.cardText}>ISBN: {item.isbn}</Text>
                                <Text style={styles.cardText}>ISSN: {item.issn}</Text>
                                <Text style={styles.cardText}>CDD: {item.cdd}</Text>
                                <Text style={styles.cardText}>Número de Chamada: {item.callNumber}</Text>
                                <Text style={styles.cardText}>Assunto: {item.subject}</Text>
                                <Text style={styles.cardText}>Palavras-chave: {item.keywords}</Text>
                                <Text style={styles.cardText}>Resumo: {item.summary}</Text>
                                <Text style={styles.cardText}>Notas: {item.notes}</Text>
                                <Text style={styles.cardText}>Número de Exemplares: {item.numberCopies}</Text>
                                <Text style={styles.cardText}>Status: {item.status}</Text>
                                <Text style={styles.cardText}>URL: {item.url}</Text>
                                <Text style={styles.cardText}>Arquivo: {item.file}</Text>
                                <Text style={styles.cardText}>Tipo de Empréstimo: {item.typeLoan}</Text>

                                <View style={styles.buttonContanier}>
                                    <TouchableOpacity style={styles.edit} onPress={() => { editItem(item.id) }}>EDITAR</TouchableOpacity>
                                    <TouchableOpacity style={styles.dell} onPress={() => { dellItem(item.id) }}>DELETAR</TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>
        </ScrollView>
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
    h1: {
        textAlign: 'center',
        fontFamily: 'sans-serif',
        fontSize: 30,
        fontWeight: 'bold',
        color: '#0F2259',
        backgroundColor: '#F2F2F2',
        margin: 0,
        padding: 20,
        borderRadius: 10,
    },
    form: {
        flex: 1,
        marginRight: 10,
        marginVertical: 10,
        padding: 20,
        backgroundColor: '#AD6CD9',
        borderRadius: 10,
        shadowColor: '#0C1DA0',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
    },
    picker: {
        height: 50,
        backgroundColor: "#FFF",
        borderColor: "#0C1DA0",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    input: {
        height: 35,
        backgroundColor: '#FFF',
        borderColor: '#0C1DA0',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#2A17A6',
        color: '#FFF',
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        fontSize: 15,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        cursor: 'pointer'
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
    buttonContanier: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 10,
        color: '#FFF',
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        fontSize: 14,
        margin: 20,
    },
    edit: {
        backgroundColor: '#2A17A6',
        padding: 8,
        borderRadius: 15,
    },
    dell: {
        backgroundColor: '#e30707',
        padding: 8,
        borderRadius: 15,
    },
    // estilos para as abas:
    tabsContainer: {
        backgroundColor: '#F2F2F2',
        height: 50,
        marginBottom: 10,
    },
    tabItem: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    activeTabItem: {
        borderBottomWidth: 3,
        borderBottomColor: '#2A17A6',
    },
    tabText: {
        color: '#666',
        fontSize: 14,
    },
    activeTabText: {
        color: '#2A17A6',
        fontWeight: 'bold',
    },
});