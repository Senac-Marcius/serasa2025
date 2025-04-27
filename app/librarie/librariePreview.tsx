import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { getItems, iItem, setItem, deleteItemById, updateItemById, } from '../../src/controllers/librarie';
import MyMenu from '../../src/components/MyMenu';
import MyNotify from '../../src/components/MyNotify';
import MyPerfil from '../../src/components/MyPerfil';
import MyTabsbar from '../../src/components/MyTabsBar';
import { Myinput, MyTextArea, MyCheck } from '../../src/components/MyInputs';
import MySearch from '../../src/components/MySearch';
import MyButton from '../../src/components/MyButtons';
import MyList from '../../src/components/MyList';
import { MyModal } from '../../src/components/MyModal';
import { Ionicons } from '@expo/vector-icons';
import { Icon , MD3Colors} from "react-native-paper";
import { useRouter } from 'expo-router';
import { supabase } from '../../src/utils/supabase';


export default function CollectionViewScreen() {

  const router = useRouter();
  const [items, setItems] = useState<iItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState<ItemType[]>([]); 
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTypologies, setSelectedTypologies] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedResponsible, setSelectedResponsible] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); 

  interface ItemType { //Atributos que vão aparecer no card dos itens
    id: number;
    image: string;
    title: string;
    subtitle: string;
    typology: string;
    year: number;
    language: string;
    responsible: string;
    subject: string;
    cdd: string;
  }
  // Puxa os itens do BD
  useEffect(() => {
    async function fetchAllItems() {
      const { data, error } = await supabase
        .from('items_librarie')
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

  // Filtro de itens de acordo com a pesquisa e filtros selecionados
  const filteredItemsMemo = useMemo(() => {
    return items.filter(item => {
      const matchSearch = item.title?.toLowerCase().includes(search.toLowerCase()) ?? false;
      const matchTypology = selectedTypologies.length === 0 || selectedTypologies.includes(item.typology);
      const matchYear = selectedYears.length === 0 || selectedYears.includes(item.year);
      const matchLanguage = selectedLanguages.length === 0 || selectedLanguages.includes(item.language);
      const matchResponsible = selectedResponsible.length === 0 || selectedResponsible.includes(item.responsible);
      const matchSubject = selectedSubject.length === 0 || selectedSubject.includes(item.subject);
      return matchSearch && matchTypology && matchYear && matchLanguage && matchResponsible && matchSubject;
    });
  }, [items, search, selectedTypologies, selectedYears, selectedLanguages, selectedResponsible, selectedSubject]);

  //TabsBar c/ filtragem
  const filteredItemsByTab = useMemo(() => {
    // Filtro de acordo com a aba selecionada
      let filtered = items;
      switch (activeTab) {
        case 0: // "Últimas adições"
          return items.filter(item => {
            const currentDate = new Date();
            const itemDate = new Date(item.created_at);
            const daysDifference = (currentDate.getTime() - itemDate.getTime()) / (1000 * 3600 * 24);
            return daysDifference <= 2; // Exibe itens adicionados nos últimos 2 dias
          });
          break;
  
        case 1: // "Itens não incorporados"
          filtered = items.filter(item => item.incorporated === false); // Filtra os não incorporados
          break;
  
        case 2: // "Acervo completo"
          break;
  
        case 3: // "catalogo online"
          router.push('/librarie/collectionsPreview');
          return [];
  
        default:
          break;
      }
      return filtered;
    }, [activeTab, items]);
         
  // Aplica os filtros da aba ativa e da pesquisa
  const finalFilteredItems = useMemo(() => {
    return filteredItemsByTab.filter(item => filteredItemsMemo.includes(item));
  }, [filteredItemsByTab, filteredItemsMemo]);

  if (loading) { //Renderização de resultado do BD
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6200ea" />
      </View>
    );
  }
  if (items.length === 0) {
    return (
      <View style={styles.container}>
          <Text>Nenhum item encontrado.</Text>
      </View>
    );
  }
  
  const tabs = ["Últimas adições", "Itens não incorporados", "Acervo completo", "Catálogo Online"]; //Nomes p/ as abas da tabsBar
  const handleTabPress = (item: string, index: number) => { // lida com o click na tabsBar
    setActiveTab(index);
  };
  
  const hasSearch = search.trim() !== ''; //Verifica se há texto digitado na busca.
  const hasResults = finalFilteredItems.length > 0; //Verifica se há resultados após filtrar
  const showFilters = hasSearch && hasResults; //Só mostra os filtros laterais se houver busca e resultados p/ essa busca.

  //Liga/Desliga Filtros
  function toggleFilter<T>(value: T, selected: T[], setSelected: (newValues: T[]) => void) {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value)); // remove
    } else {
      setSelected([...selected, value]); //adiciona
    }
  }
  //Listas Únicas para Filtros
  const uniqueTypologies = Array.from(new Set(filteredItems.map(item => item.typology)));
  const uniqueYears = Array.from(new Set(filteredItems.map(item => item.year)));
  const uniqueLanguages = Array.from(new Set(filteredItems.map(item => item.language)));
  const uniqueResponsible = Array.from(new Set(filteredItems.map(item => item.responsible)));
  const uniqueSubject = Array.from(new Set(filteredItems.map(item => item.subject)));

  const FilteredItems = [
    { id: 1, title: 'Item 1', subtitle: 'Subtítulo 1', responsible: 'Autor 1', language: 'Português', year: '2020', cdd: '123', image: 'image_url', typology: 'Typo 1', translation: 'Tradutor 1', edition: '1ª Edição', publisher: 'Editora A' },
    { id: 2, title: 'Item 2', subtitle: 'Subtítulo 2', responsible: 'Autor 2', language: 'Inglês', year: '2021', cdd: '456', image: 'image_url', typology: 'Typo 2', translation: 'Tradutor 2', edition: '2ª Edição', publisher: 'Editora B' },
    // outros itens
  ];

  const handleItemPress = (item) => {
    setSelectedItem(item); // Armazena o item selecionado
    setVisible(true); // Abre o modal
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
      <View style={styles.cardText}>
        <TouchableOpacity onPress={() => handleItemPress(item)}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
          <Text style={styles.detail}>Autor: {item.responsible}</Text>
          <Text style={styles.detail}>Idioma: {item.language}</Text>
          <Text style={styles.detail}>Ano: {item.year}</Text>
          <Text style={styles.detail}>CDD: {item.cdd}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.page}>
        {/* Cabeçalho */}
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
        
        {/* Abas Selecionavéis */}
        <View style={styles.tabsbar}>
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
          <TouchableOpacity onPress={() => router.push('/librarie/librarie')} style={styles.addButton}>
            <Ionicons name="add" size={24} color="#fff"  /> <Text style={styles.addButtonText}>Adicionar novo item</Text>
          </TouchableOpacity>
        </View>
        
        {/* Barra de busca */}
        <View style={styles.searchView}>
          <MySearch
            style = {styles.searchContainer}
            styleInput={styles.searchInput}
            busca={search}
            placeholder="Digite aqui a sua busca..."
            onChangeText={(text) => setSearch(text)}
            onPress={() => {}}
          />
          <TouchableOpacity onPress={() => {}} style={styles.searchButton}>
            <Ionicons name="search" size={22} color="#fff"  />
          </TouchableOpacity>
        </View>

        {/* Filtros + Lista lado a lado */}
        <View style={styles.contentContainer}>
          {showFilters && (
            <ScrollView style={styles.filterSidebar}>
              <Text style={styles.filterSectionTitle}>Tipo de Obra</Text>
              {[...new Set(finalFilteredItems.map(item => item.typology))].map((type) => (
                <TouchableOpacity //AQUI TEM QUE VIR UM MYCHECK
                  key={type}
                  onPress={() => toggleFilter(type, selectedTypologies, setSelectedTypologies)}
                  >
                  <Text style={[
                    styles.filterOption,
                    selectedTypologies.includes(type) && styles.filterOptionSelected
                  ]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}

              <Text style={styles.filterSectionTitle}>Ano</Text>
              {[...new Set(finalFilteredItems.map(item => item.year))].map((year) => (
                <TouchableOpacity
                  key={year}
                  onPress={() => toggleFilter(year, selectedYears, setSelectedYears)}
                  >
                  <Text style={[
                    styles.filterOption,
                    selectedYears.includes(year) && styles.filterOptionSelected
                  ]}>
                    {year}
                  </Text>
                </TouchableOpacity>
              ))}

              <Text style={styles.filterSectionTitle}>Autores</Text>
              {[...new Set(finalFilteredItems.map(item => item.responsible))].map((responsible) => (
                <TouchableOpacity
                  key={responsible}
                  onPress={() => toggleFilter(responsible, selectedResponsible, setSelectedResponsible)}
                  >
                  <Text style={[
                    styles.filterOption,
                    selectedResponsible.includes(responsible) && styles.filterOptionSelected
                  ]}>
                    {responsible}
                  </Text>
                </TouchableOpacity>
              ))}

              <Text style={styles.filterSectionTitle}>Idioma</Text>
              {[...new Set(finalFilteredItems.map(item => item.language))].map((lang) => (
                <TouchableOpacity
                  key={lang}
                  onPress={() => toggleFilter(lang, selectedLanguages, setSelectedLanguages)}
                  >
                  <Text style={[
                    styles.filterOption,
                    selectedLanguages.includes(lang) && styles.filterOptionSelected
                  ]}>
                    {lang}
                  </Text>
                </TouchableOpacity>
              ))}

              <Text style={styles.filterSectionTitle}>Assuntos</Text>
              {[...new Set(finalFilteredItems.map(item => item.subject))].map((subject) => (
                <TouchableOpacity
                  key={subject}
                  onPress={() => toggleFilter(subject, selectedSubject, setSelectedSubject)}
                  >
                  <Text style={[
                    styles.filterOption,
                    selectedSubject.includes(subject) && styles.filterOptionSelected
                  ]}>
                    {subject}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}  
          
          {/* Lista */}
          <View style={styles.mainContent}>
            <FlatList
              data={finalFilteredItems}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.grid}
              numColumns={3}
              renderItem={ renderItem }
            />  
                  
            <MyModal
              visible={visible}
              setVisible={setVisible}
              style={styles.Modal}
              title="Ver mais"
              closeButtonTitle="Fechar"
            >
              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                  {/* Dentro do modal, mostra os dados do item selecionado */}
                  {selectedItem && (
                    <>
                      <Image source={{ uri: selectedItem.image }} style={styles.image} />
                      <Text style={styles.title}>Título: {selectedItem.title}</Text>
                      <Text style={styles.subtitle}>Subtítulo: {selectedItem.subtitle}</Text>
                      <Text style={styles.detail}>Autor: {selectedItem.responsible}</Text>
                      <Text style={styles.detail}>Tradutor: {selectedItem.translation}</Text>
                      <Text style={styles.detail}>Idioma: {selectedItem.language}</Text>
                      <Text style={styles.detail}>Ano: {selectedItem.year}</Text>
                      <Text style={styles.detail}>Edição: {selectedItem.edition}</Text>
                      <Text style={styles.detail}>Editora: {selectedItem.publisher}</Text>
                      <Text style={styles.detail}>Local: {selectedItem.location}</Text>
                      <Text style={styles.detail}>Nº de Páginas: {selectedItem.number_pages}</Text>
                      <Text style={styles.detail}>Série: {selectedItem.serie}</Text>
                      <Text style={styles.detail}>Volume: {selectedItem.volume}</Text>
                      <Text style={styles.detail}>Formato: {selectedItem.format}</Text>
                      <Text style={styles.detail}>ISBN: {selectedItem.isbn}</Text>
                      <Text style={styles.detail}>ISSN: {selectedItem.issn}</Text>
                      <Text style={styles.detail}>CDD: {selectedItem.cdd}</Text>
                      <Text style={styles.detail}>Nº de Chamada: {selectedItem.call_number}</Text>
                      <Text style={styles.detail}>Assuntos: {selectedItem.subject}</Text>
                      <Text style={styles.detail}>Palavras-Chave: {selectedItem.keywords}</Text>
                      <Text style={styles.detail}>Resumo: {selectedItem.keywords}</Text>
                      <Text style={styles.detail}>Notas: {selectedItem.notes}</Text>
                      <Text style={styles.detail}>Nº de Exemplares: {selectedItem.number_copies}</Text>
                      <Text style={styles.detail}>Status: {selectedItem.status}</Text>
                      <Text style={styles.detail}>Arquivo: {selectedItem.file}</Text>
                      <Text style={styles.detail}>Tipo de Empréstimo: {selectedItem.type_loan}</Text> 
                      <TouchableOpacity onPress={() => setVisible(false)} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Fechar</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>  
            </MyModal>
          </View> 
        </View>
      </View> 
    </ScrollView>    
  );
}

const styles = StyleSheet.create({
  page: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  center: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
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
    borderBottomWidth: 1,
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5A2D82',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 50,
  },
  addButtonText: { 
    color: '#fff',
    fontSize: 16, 
    fontWeight: 'bold',
    fontFamily: 'Poppins_400Regular',
  },
  tabsbar: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 30,
    height: 80,
    width: '100%',
    backgroundColor: '#transparent',
    paddingVertical: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    height: 70,
    backgroundColor:'transparent',
    width: '100%',
  },
  tabItem: { 
      paddingVertical: 10,
      marginRight: 25,
      justifyContent: 'center',
      alignItems: 'center',
  },
  activeTabItem: { 
  },
  tabText: { 
      color: '#0C1D40',
      fontSize: 20,
      fontFamily: 'Poppins_400Regular',
      justifyContent: 'center',
  },
  activeTabText: {
      fontWeight: 'bold',
      color: '#5A2D82',
  },
  searchView: {  
  alignItems: 'center',
  marginTop: 20,
  marginBottom: 20,
  flexDirection: 'row',
  justifyContent: 'center',
  width:'90%',
  marginVertical: 20,
  backgroundColor:"transparent",
  marginLeft: 30,
  alignSelf: 'center',
  
  },
  searchContainer: {
    flex: 1,
    backgroundColor:'transparent',
    alignItems:'center',
    flexDirection: 'row',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 4,
    maxWidth: '100%',
    borderColor:"#0C1D40",
    borderWidth: 2,
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    
  },
  searchButton:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5A2D82',
    width: 50,
    height: 45,
    borderRadius: 25, 
  },
  


  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  filterSidebar: {
    maxWidth: 200,
    padding: 10,
    margin: 23,
    backgroundColor: '#ad6cd9',
    borderRadius: 10,
  },
  filterSectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
    marginBottom: 1,
    color: '#fff',
    fontFamily: 'Poppins_400Regular',
  },
  filterOption: {
    backgroundColor: '#ad6cd9',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    width: 180,
  },
  filterOptionSelected: {
    color: '#6200ea',
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    padding: 10,
    margin: 5,
    backgroundColor:"transparent",
    borderRadius: 10,
  },
  grid: {
    padding: 0,
    
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#ecdef0',
    padding: 8,
    borderRadius: 8,
    elevation: 2,
    width: 170,
    height: 200,
  },
  image: {
    width: 120,
    height: 180,
    borderRadius: 6,
    margin: 3,
  },
  cardText:{
    flex: 1,
    justifyContent: 'center',
    padding: 12,
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


  
  sidebar: {
    width: 130,
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  
  filterSubtitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
  },
  
  
  
  filterOptionText: {
    fontSize: 12,
    color: '#333',
  },
  
  
  filterBar: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  filterLabel: { color: '#666' },
  
  containerModal:{
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  Modal: {
    display: 'flex',
    width: 327,
    height: 327,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 4,
    borderColor: 'purple',
    alignItems: 'center',
    justifyContent: 'flex-end',
},
  buttonModal: {
    backgroundColor: "transparent",
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
  },
  
});
