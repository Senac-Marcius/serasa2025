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

  //Função de Busca MINHA NOSSA SENHORINHA TO PERDIDINHA. NÃO É A FUNÇÃO IDEAL PARA A MINHA BUSCA
  async function searchItems() {
    const resultado = await getItemsComFiltro(search);
    setFilteredItems(resultado);
  }
  
  async function getItemsComFiltro(search: string,) {
    let query = supabase.from('items_librarie').select('*');

    if (search) {
      query = query.ilike('title', `%${search}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Erro ao buscar itens:", error);
    }

    return data || [];
  }
  
  const hasSearch = search.trim() !== ''; //Verifica se há texto digitado na busca.
  const hasResults = filteredItems.length > 0; //Verifica se há resultados após filtrar
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
            onChangeText={setSearch}
            onPress={searchItems}
          />
          <TouchableOpacity onPress={searchItems} style={styles.searchButton}>
            <Ionicons name="search" size={22} color="#fff"  />
          </TouchableOpacity>
        </View>

        {/* Filtros + Lista lado a lado */}
        <View style={styles.contentContainer}>
          {showFilters && (
            <ScrollView style={styles.filterSidebar}>
              <Text style={styles.filterHeader}>Refinar sua busca</Text>
              
              <Text style={styles.selectedFiltersText}>
                {selectedTypologies.length + selectedYears.length + selectedLanguages.length + 
                selectedResponsible.length + selectedSubject.length > 0
                  ? `Filtros selecionados (${
                      selectedTypologies.length + selectedYears.length + selectedLanguages.length + 
                      selectedResponsible.length + selectedSubject.length
                    })`
                  : "Nenhum filtro selecionado ainda"}
              </Text>

              {/* Tipo de Obra */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Tipo de Obra</Text>
                {uniqueTypologies.map((type) => (
                  <View key={type} style={styles.filterItem}>
                    <MyCheck
                      label={type}
                      checked={selectedTypologies.includes(type)}
                      onToggle={() => toggleFilter(type, selectedTypologies, setSelectedTypologies)}
                    />
                  </View>
                ))}
              </View>

              {/* Ano */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Ano</Text>
                {uniqueYears.map((year) => (
                  <View key={year} style={styles.filterItem}>
                    <MyCheck
                      label={year.toString()}
                      checked={selectedYears.includes(year)}
                      onToggle={() => toggleFilter(year, selectedYears, setSelectedYears)}
                    />
                  </View>
                ))}
              </View>

              {/* Autores */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Autores</Text>
                {uniqueResponsible.map((responsible) => (
                  <View key={responsible} style={styles.filterItem}>
                    <MyCheck
                      label={responsible}
                      checked={selectedResponsible.includes(responsible)}
                      onToggle={() => toggleFilter(responsible, selectedResponsible, setSelectedResponsible)}
                    />
                  </View>
                ))}
              </View>

              {/* Idioma */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Idioma</Text>
                {uniqueLanguages.map((lang) => (
                  <View key={lang} style={styles.filterItem}>
                    <MyCheck
                      label={lang}
                      checked={selectedLanguages.includes(lang)}
                      onToggle={() => toggleFilter(lang, selectedLanguages, setSelectedLanguages)}
                    />
                  </View>
                ))}
              </View>

              {/* Assuntos */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Assuntos</Text>
                {uniqueSubject.map((subject) => (
                  <View key={subject} style={styles.filterItem}>
                    <MyCheck
                      label={subject}
                      checked={selectedSubject.includes(subject)}
                      onToggle={() => toggleFilter(subject, selectedSubject, setSelectedSubject)}
                    />
                  </View>
                ))}
              </View>
            </ScrollView>
          )}
          
          {/* Lista */}
          <View style={styles.mainContent}>
            <FlatList
              data={finalFilteredItems}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.grid}
              numColumns={3}
              renderItem={({ item }) => (
                  <View style={styles.card}>
                    <View>
                      <Image source={{ uri: item.image }} style={styles.image} />
                    </View>
                    <View style={styles.cardText}>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.subtitle}>{item.subtitle}</Text>
                      <Text style={styles.detail}>Autor: {item.responsible}</Text>
                      <Text style={styles.detail}>Idioma: {item.language}</Text>
                      <Text style={styles.detail}>Ano: {item.year}</Text>
                      <Text style={styles.detail}>CDD: {item.cdd}</Text>
                      <TouchableOpacity>
                        <Text style={styles.link}>Ver mais...</Text>
                      </TouchableOpacity>
                    </View>  
                  </View>
              )}
            />
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

  filterSidebar: {
    width: 250,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginRight: 15,
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 10,
    fontFamily: 'Poppins_400Regular',
  },
  selectedFiltersText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    fontFamily: 'Poppins_400Regular',
  },
  filterSection: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5A2D82',
    marginBottom: 8,
    fontFamily: 'Poppins_400Regular',
  },
  filterItem: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Se precisar ajustar o MyCheck, adicione:
  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#5A2D82',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#5A2D82',
  },
  checkLabel: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Poppins_400Regular',
  },
  
  
});
