import React, { useState, useEffect } from 'react'; //função useState só retorna para uma variavel const
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import MyTheme from '../../src/components/MyTheme';
import MyText from '../../src/components/MyText';
import MyMenu from '../../src/components/MyMenu';
import MyNotify from '../../src/components/MyNotify';
import MyTabsbar from '../../src/components/MyTabsBar';
import MyButton from '../../src/components/MyButtons';
import { MyModal } from '../../src/components/MyModal';
import MySelect from '../../src/components/MySelect';
import MyUpload from '../../src/components/MyUpload';
import MyAccessibility from '../../src/components/MyAccessibility';
import { Myinput, MyTextArea, MyCheck } from '../../src/components/MyInputs';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import { supabase } from '../../src/utils/supabase';

export default function itemScreen() { 

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
        year: '',
        edition: '',
        publisher: '',
        location: '',
        number_pages: '',
        serie: '',
        volume: '',
        format: '',
        isbn: '',
        issn: '',
        cdd: '',
        call_number: '',
        subject: '',
        keywords: '',
        summary: '',
        notes: '',
        number_copies: '',
        status: '',
        url: '',
        file: '',
        type_loan: '',
        incorporated: false,
    });

    const [items, setItems] = useState<iItem[]>([]);
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState(0);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false); // Novo estado para controlar o modo
    const { id } = useLocalSearchParams(); // ID da URL (se existir)
    //Selects/Pickers
    const [typology, setTypology] = useState("Tipologia")
    const [language, setLanguage] = useState("Idioma") 
    const [format, setFormat] = useState("Formato") 
    const [status, setStatus] = useState("Status")
    const [type_loan, setType_loan] = useState("Tipo de Empréstimo")

    interface iItem {
        typology: string,
        title: string,
        subtitle: string,
        responsible: string,
        translation: string,
        language: string,
        image: string,
        year: string,
        edition: string,
        publisher: string,
        location: string,
        number_pages: string,
        serie: string,
        volume: string,
        format: string,
        isbn: string,
        issn: string,
        cdd: string,
        call_number: string,
        subject: string,
        keywords: string,
        summary: string,
        notes: string,
        number_copies: string,
        status: string,
        url: string,
        file: string,
        type_loan: string,
        incorporated: boolean,
        created_at: string,
        id: number,
    }
    
    async function setItem(item:iItem){
     
        const { data, error } = await supabase.from('librarie_items')
        .insert([
            item
        ])
        .select()
        
        if(error){
            console.error('Erro',error);
            return null;
        }
        console.log('Item inserido com sucesso!', data);
    
        return data
    }

    // Verifica se é edição ao carregar a tela
    useEffect(() => {
        if (id) {
            setEditMode(true);
            loadItemForEdit(id);
        }
    }, [id]);

    // Puxa os itens do BD cadastrar
    useEffect(() => {
        async function fetchAllItems() {
        const { data, error } = await supabase
            .from('librarie_items')
            .select('*');
    
        if (error) {
            console.error("Erro ao carregar itens:", error);
        } else {
            setItems(data || []);
        }

        setLoading(false);
        }

        fetchAllItems();

    }, []);

    // Carrega dados do item para edição (banco de edição)
    async function loadItemForEdit(id: string | string[]) {
        const { data, error } = await supabase
            .from('items_librarie') // Banco de edição
            .select('*')
            .eq('id', id)
            .single();

        if (data) {
            setReq(data); // Preenche o formulário com os dados existentes
        }
    }

    async function updateItemById(id: number, updatedItem: Partial<iItem>) {
        const { error } = await supabase
            .from('librarie_items')
            .update(updatedItem)
            .eq('id', id);
    
        if (error) {
            console.error("Erro ao atualizar item:", error.message);
            return false;
        }
        return true;
    }

    // Função unificada para salvar (cadastro ou edição)
    async function handleSubmit() {
        try {
            // Validação básica
            if (!req.title || !req.subject || !req.keywords) {
              window.alert("Preencha título, assunto e palavras-chave!");
              return;
            }
        
            if (editMode) {
                // Atualiza no banco de edição
                const success = await updateItemById(req.id, req);
                if (success) {
                    window.alert("Item atualizado com sucesso!");
                    router.push('/librarie/librariePreview');
                } else {
                    window.alert("Erro ao atualizar!");
                }

            } else {
                // Cadastra no banco principal (CADASTRO NOVO)
                const newId = items.length ? items[items.length - 1].id + 1 : 1;
                const newItem = { ...req, id: newId };

                // Insere no banco principal
                const { error } = await supabase
                    .from('librarie_items')
                    .insert([newItem]);

                if (error) throw error;
        
                // Atualiza o estado local
                setItems([...items, newItem]);
                window.alert(`Item cadastrado com ID: ${newId}`);
                
                // Limpa o formulário
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
                    year: '',
                    edition: '',
                    publisher: '',
                    location: '',
                    number_pages: '',
                    serie: '',
                    volume: '',
                    format: '',
                    isbn: '',
                    issn: '',
                    cdd: '',
                    call_number: '',
                    subject: '',
                    keywords: '',
                    summary: '',
                    notes: '',
                    number_copies: '',
                    status: '',
                    url: '',
                    file: '',
                    type_loan: '',
                    incorporated: false,
                });
                router.push('/librarie/librariePreview');
            }
        }   catch (error) {
            console.error("Erro detalhado:", error);
            
            if (error instanceof Error) {
              alert(`Erro: ${error.message}`);
            } else {
              alert("Ocorreu um erro desconhecido");
            }
        }
    }

    const tabs = ["Identificação da Obra", "Publicação e Edição", "Descrição e Classificação", "Conteúdo e Acesso"];
    // Função para lidar com o clique nas abas
    const handleTabPress = (item: string, index: number) => {
        setActiveTab(index);
    };

    const save = async () => {
        const { data, error } = await supabase
            .from('librarie_items')
            .insert([
                {
                    typology: req.typology,
                    title: req.title,
                    subtitle: req.subtitle,
                    responsible: req.responsible,
                    translation: req.translation,
                    language: req.language,
                    image: req.image,
                    year: req.year,
                    edition: req.edition,
                    publisher: req.publisher,
                    location: req.location,
                    number_pages: req.number_pages,
                    serie: req.serie,
                    volume: req.volume,
                    format: req.format,
                    isbn: req.isbn,
                    issn: req.issn,
                    cdd: req.cdd,
                    call_number: req.call_number,
                    subject: req.subject,
                    keywords: req.keywords,
                    summary: req.summary,
                    notes: req.notes,
                    number_copies: req.number_copies,
                    status: req.status,
                    url: req.url,
                    file: req.file,
                    type_loan: req.type_loan,
                    incorporated: req.incorporated || false, // Se não estiver marcado, será "false"
                }
            ]);
    
        if (error) {
            console.error('Erro ao salvar dados:', error);
            window.alert('Erro ao salvar os dados!');
        } else {
            console.log('Dados salvos com sucesso:', data);
            window.alert('Registro salvo com sucesso!');
        }
    };

    const cancel = () => {
        const confirmed = window.confirm("Tem certeza que deseja cancelar este registro? Todos os dados não salvos serão perdidos.");
      
            if (confirmed) {
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
                year: '',
                edition: '',
                publisher: '',
                location: '',
                number_pages: '',
                serie: '',
                volume: '',
                format: '',
                isbn: '',
                issn: '',
                cdd: '',
                call_number: '',
                subject: '',
                keywords: '',
                summary: '',
                notes: '',
                number_copies: '',
                status: '',
                url: '',
                file: '',
                type_loan: '',
                incorporated: false,
            });
            setSelectedImage(null);
            setSelectedFile(null);
            router.push("/librarie/librariePreview");
        }
    };
      
    async function pickImage() {
    // Solicita permissão para acessar a galeria
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            window.alert('Permissão para acessar a galeria é necessária!');
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
            const uri = result.assets[0].uri;
            const imageName = uri.split('/').pop() || 'imagem_sem_nome.jpg';
             // extrai o nome do arquivo
            setSelectedImage(uri);
            setReq({ ...req, image: imageName }); // atualiza o input capa com o nome do arquivo
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
            const uri = result.assets[0].uri; 
            const fileName = uri.split('/').pop() || 'arquivo_sem_nome.pdf';
            
            // extrai o nome do arquivo
           setSelectedFile(uri);
           setReq({ ...req, file: fileName }); // atualiza o input material com o nome do arquivo
        }
    };

    return ( //encapsulamento
        <ScrollView>
            <View style={styles.header}>
                <View style={styles.header2}>
                    <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)} style={styles.iconButton}>
                        <Ionicons name="menu" size={20} color="#4A148C" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                        <Ionicons name="arrow-back" size={20} color="#4A148C" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.headerTitle}>ACERVO - BIBLIOTECA</Text>

                <View style={styles.header2}>
                    <MyNotify style={styles.iconButton}/>

                    <TouchableOpacity onPress={() => router.push('/perfil')}style={styles.avatarButton}>
                        <Image source={{ uri: 'https://i.pravatar.cc/150?img=1' }} style={styles.avatar} />
                    </TouchableOpacity>
                </View>
            </View>
            {menuOpen && <MyMenu closeMenu={() => setMenuOpen(false)} />}
            
            <View>
                {/*<MyAccessibility style={styles.accessibilityButton}>
                    <Text style={{ fontSize: 16, marginBottom: 8 }}>Acessibilidade ativada!</Text>
                    <Button mode="contained" onPress={() => console.log('Ativando recurso')}>
                    Modo Alto Contraste
                    </Button>
                </MyAccessibility>*/}
                <MyTheme chendTheme={()=>{}} fontSize={()=>{}}/>
            </View>

            <MyText style={styles.h1}>{editMode ? "Editar Recurso Informacional" : "Cadastrar Novo Recurso Informacional"}</MyText>
            
            <View style={styles.buttonContainer}>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    style={styles.scrollRow}>
                    <View style={styles.buttonWrapper}>
                        <MyButton
                            title="Salvar"
                            onPress={save}
                            button_type="capsule"
                            icon="content-save"
                            style={styles.button_capsule1}
                        />
                    </View>
                    <View style={styles.buttonWrapper}>
                        <MyModal
                            visible={visible}
                            setVisible={setVisible}
                            style={styles.Modal}
                            title="Prévia" 
                            closeButtonTitle="Fechar"
                            tipe="capsule"
                            buttonStyle={styles.button_capsule1}
                            isButton={true}   
                        >
                            <ScrollView>
                                <View style={styles.modalContainer}>
                                    <View style={styles.modalList}>
                                        {selectedImage && (
                                            <Image source={{ uri: selectedImage }} style={styles.image} />
                                        )}
                                        <MyText style={styles.detail}>Tipologia: {req.typology || 'Não informado'}</MyText>
                                        <MyText style={styles.title}>Título: {req.title || 'Não informado'}</MyText>
                                        <MyText style={styles.subtitle}>Subtítulo: {req.subtitle || 'Não informado'}</MyText>
                                        <MyText style={styles.detail}>Responsáveis: {req.responsible || 'Não informado'}</MyText>
                                        <MyText style={styles.detail}>Tradução: {req.translation || 'Não informado'}</MyText>
                                        <MyText style={styles.detail}>Idioma: {req.language || 'Não informado'}</MyText>
                                        <MyText style={styles.detail}>Ano: {req.year || 'Não informado'}</MyText>
                                        <MyText style={styles.detail}>Edição: {req.edition || 'Não informado'}</MyText>
                                        <MyText style={styles.detail}>Editora: {req.publisher || 'Não informado'}</MyText>
                                        <MyText style={styles.detail}>Local: {req.location || 'Não informado'}</MyText>
                                        <MyText style={styles.detail}>Número de Páginas: {req.number_pages || 'Não informado'}</MyText>
                                        <MyText style={styles.detail}>Série: {req.serie || 'Não informado'}</MyText>
                                        <MyText style={styles.detail}>Volume: {req.volume || 'Não informado'}</MyText>
                                        <MyText style={styles.detail}>Formato: {req.format || 'Não informado'}</MyText>
                                        <MyText style={styles.detail}>ISBN: {req.isbn || 'Não informado'}</MyText>
                                        <MyText style={styles.detail}>ISSN: {req.issn || 'Não informado'}</MyText>
                                        <MyText style={styles.detail}>CDD: {req.cdd || 'Não informado'}</MyText>
                                        <MyText style={styles.detail}>Número de Chamada: {req.call_number || 'Não informado'}</MyText>
                                        <MyText style={styles.detail}>Assunto: {req.subject || 'Não informado'}</MyText>
                                        <MyText style={styles.detail}>Palavras-chave: {req.keywords || 'Não informado'}</MyText>
                                        <MyText style={styles.detail}>Resumo: {req.summary || 'Não informado'}</MyText>
                                        <MyText style={styles.detail}>Notas: {req.notes || 'Não informado'}</MyText>
                                        <MyText style={styles.detail}>Número de Exemplares: {req.number_copies || 'Não informado'}</MyText>
                                        <MyText style={styles.detail}>Status: {req.status || 'Não informado'}</MyText>
                                        <MyText style={styles.detail}>URL: {req.url || 'Não informado'}</MyText>
                                        <MyText style={styles.detail}>Arquivo: {req.file || 'Não informado'}</MyText>
                                        <MyText style={styles.detail}>Tipo de Empréstimo: {req.type_loan || 'Não informado'}</MyText>
                                        <MyText style={styles.detail}>Incorporado?: {req.incorporated || 'Não informado'}</MyText>
                                    </View>
                                </View>
                            </ScrollView>
                        </MyModal>
                    </View>
                    <View style={styles.buttonWrapper}>
                        <MyButton
                            title="Cancelar"
                            onPress={cancel}
                            button_type="capsule"
                            icon="close-circle"
                            style={styles.button_capsule1}
                        /> 
                    </View> 
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
                underline={false}
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
                                list={[
                                    {key:0, option: 'Livro' },
                                    {key:1, option: "Artigo" },
                                    {key:2, option: "Audiolivro"},
                                    {key:3, option: "Ebook" },
                                    {key:4, option: "Mangá" },
                                    {key:5, option: 'Periódico'},
                                    {key:6, option: 'Relatório'},
                                    {key:7, option: "Mapa" },
                                    {key:8, option: "Outros" },
                                ]}
                                />                   
                                <Myinput
                                    placeholder="Título*"
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
                                <View style={styles.capaContainer}>
                                    <Myinput
                                        placeholder="Capa"
                                        value={req.image}
                                        onChangeText={(text) => setReq({ ...req, image: text })}
                                        label='' iconName=''
                                    /> 
                                    <MyButton
                                    title="Selecionar Imagem"
                                    onPress={pickImage}
                                    button_type="capsule"
                                    icon=""
                                    style={styles.button_capsule2}
                                    />
                                   {/* <MyUpload />*/}
                                </View>
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
                                    value={req.number_pages}
                                    onChangeText={(text) => setReq({ ...req, number_pages: text })}
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
                                    placeholder="Assunto*"
                                    value={req.subject}
                                    onChangeText={(text) => setReq({ ...req, subject: text })}
                                    label='' iconName=''
                                />
                                <MyTextArea 
                                    placeholder="Palavras-chave*"
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
                                    value={req.number_copies}
                                    onChangeText={(text) => setReq({ ...req, number_copies: text })}
                                    label='' iconName=''
                                />
                                <MySelect
                                    label={status} setLabel={setStatus} 
                                    list={            
                                        [ 
                                            {key:1, option: 'Disponível'},            
                                            {key:2, option: 'Indisponível'},
                                        ]
                                    }
                                />
                                <MySelect
                                    label={type_loan} setLabel={setType_loan} 
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
                                <View style={styles.capaContainer}>
                                    <Myinput 
                                        placeholder="Upload do Material"
                                        value={req.file}
                                        onChangeText={(text) => setReq({ ...req, file: text })}
                                        label='' iconName=''
                                    /> 
                                    <MyButton
                                    title="Selecionar Arquivo"
                                    onPress={pickFile}
                                    button_type="capsule"
                                    icon=""
                                    style={styles.button_capsule2}
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', gap: 20, marginTop: 10, }}>
                                    <Text style={styles.text}>Incorporar no acervo?</Text>
                                    <MyCheck
                                        label="Sim"
                                        checked={req.incorporated === true}
                                        onToggle={() => setReq({ ...req, incorporated: true })}
                                    />
                                    <MyCheck
                                        label="Não"
                                        checked={req.incorporated === false}
                                        onToggle={() => setReq({ ...req, incorporated: false })}
                                    />     
                                </View>   
                            </>
                        )}
                        <MyButton
                            title={editMode ? "ATUALIZAR" : "CADASTRAR"}
                            onPress={ handleSubmit }
                            button_type="capsule"
                            icon=""
                            style={editMode ? styles.buttonEdit : styles.buttonRegister} 
                            color={editMode ? '#4A148C' : '#0F2259'}
                            height={50}
                        />    
                    </View>
                </View>
            </View> 
        </ScrollView>
    )
}   

const styles = StyleSheet.create({

    iconButton: {
        backgroundColor: '#ecdef0',
        padding: 8,
        borderRadius: 30,
        marginHorizontal: 4,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    header: {
        backgroundColor: '#fff',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
        height: 70,
        width: '100%',
        borderBottomColor:"#d9d9d9",
    },
    headerTitle: {
    color: '#4A148C', 
    fontSize: 20, 
    fontWeight: 'bold',
    fontFamily: 'Poppins_400Regular',
    },
    header2:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    },
    avatarButton: {
    width: 36,
    height: 36,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 18,
    },
    h1: {
        textAlign: 'center',
        fontFamily: 'Poppins_400Regular',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: '#0F2259',
        marginVertical: 5,
        padding: 5,
        alignItems: 'center',
        marginTop: 4,
    },
    accessibilityButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 5,
        zIndex: 10,
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
        paddingHorizontal: 5,
        flexWrap: 'wrap',
    },
    form: {
        flex: 1,
        marginRight: 50,
        marginLeft: 50,
        marginHorizontal: 20,
        padding: 30,
        backgroundColor: '#ecdef0',
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
        marginVertical: 50,
        borderRadius: 50,
        display:"flex",
        alignItems: 'center',
        cursor: 'pointer',
    },
    buttonEdit: {
        backgroundColor: '#4A148C',
        color: '#FFF',
        fontWeight: 'bold',
        fontFamily: 'Poppins_400Regular',
        fontSize: 20,
        padding: 15,
        marginVertical: 50,
        borderRadius: 50,
        display:"flex",
        alignItems: 'center',
        cursor: 'pointer',
    },
    buttonContainer: {
        flexDirection: 'row', // Alinha os botões horizontalmente
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingHorizontal: 50, 
        marginVertical: 30,
        marginLeft: 30,
        alignSelf: 'center',
    },
    buttonWrapper: {
        width: '33%',  // Faz com que cada botão ocupe um terço da largura do container
        minWidth: 100, // Garante que os botões não fiquem menores que esse tamanho
        paddingHorizontal: 5,
        flexWrap: 'wrap',         // Permite quebra de linha em telas pequenas
        justifyContent: 'center', // Centraliza os botões
        alignItems: 'center',
    },
    button_capsule1: {
        borderRadius: 50,
        backgroundColor: "#813AB1",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        marginRight: 15,
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        marginHorizontal: 15,
        marginVertical: 5, 
    },
    button_capsule2: {
        borderRadius: 50,
        backgroundColor: "#813AB1",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        marginVertical: 30,
        marginHorizontal: 15,
    },
    text: {
        fontSize: 16,
        color: '#6A1B9A',
        fontWeight: 'bold',
    
      
    },
    tabsContainer: {
        flex: 1,
        padding: 20,
        marginRight: 50,
        marginLeft: 50,
        marginVertical: 0,
        marginHorizontal: 20,
        borderRadius: 10,
        minHeight: 90,
    },
    tabItem: { // Estilo para cada aba
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginRight: 15,
        marginHorizontal: 40,
        height: 50,
        width: 250,
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
        color: 'black',
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        justifyContent: 'center',
    },
    activeTabText: { // Estilo do texto quando a aba está ativa
        fontWeight: 'bold',
        color: 'white',
    },
    image: {
        width: 120,
        height: 180,
        borderRadius: 6,
        margin: 3,
    },
    title: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlignVertical:'top',
    },
    subtitle: {
    fontStyle: 'italic',
    fontSize: 16,
    },
    detail: {
    fontSize: 16,
    color: '#444',
    },
    link: {
    color: '#6200ea',
    marginTop: 10,
    fontWeight: 'bold',
    textAlign:"right",
    },
    Modal: {
    display: 'flex',
    width: 400,
    height: 530,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    borderWidth: 4,
    borderColor: 'purple',
    alignItems: 'center',
},
modalContainer: {
    flex: 1,
    display: 'flex',
    maxWidth: 600,
    height: 550,
    alignItems: 'flex-start',
    padding: 5,
    width: '280%', 
},  
modalList: {
backgroundColor: '#f2f2f2',
width: 300,
gap: 5,
alignItems: 'flex-start',
display: 'flex',
//height: '100%',


},
capaContainer: {
flexDirection: 'row',
alignItems: 'center',
},    
});