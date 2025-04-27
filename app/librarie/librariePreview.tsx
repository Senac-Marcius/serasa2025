import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { getItems, iItem, setItem, deleteItemById, updateItemById, } from '../../src/controllers/librarie';
import MyMenu from '../../src/components/MyMenu';
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
  const [filteredItems, setFilteredItems] = useState<ItemType[]>([]); // resultados da busca
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Últimas adições", "Itens não incorporados", "Acervo completo"];

  const handleTabPress = (item: string, index: number) => {
    setActiveTab(index);
  };
  
  interface ItemType {
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

  const [selectedTypologies, setSelectedTypologies] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedResponsible, setSelectedResponsible] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string[]>([]);

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

  if (loading) {
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

  const filterItems = (items: iItem[]) => {
  // Filtro de acordo com a aba selecionada
    switch (activeTab) {
      case 0: // "Últimas adições"
        return items.filter(item => {
          const currentDate = new Date();
          const itemDate = new Date(item.created_at);
          const daysDifference = (currentDate.getTime() - itemDate.getTime()) / (1000 * 3600 * 24);
          return daysDifference <= 2; // Exibe itens adicionados nos últimos 2 dias
        });

      case 1: // "Itens não incorporados"
        return items.filter(item => item.incorporated === 'Não'); // Filtra os não incorporados

      case 2: // "Acervo completo"
        return items; // Exibe todos os itens

      default:
        return items;
    }
  };

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
  
  const hasSearch = search.trim() !== '';
  const hasResults = filteredItems.length > 0;
  const showFilters = hasSearch && hasResults;

  const dataToShow = hasSearch ? filteredItems : items;

  function toggleFilter<T>(value: T, selected: T[], setSelected: (newValues: T[]) => void) {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  }

  const uniqueTypologies = Array.from(new Set(filteredItems.map(item => item.typology)));
  const uniqueYears = Array.from(new Set(filteredItems.map(item => item.year)));
  const uniqueLanguages = Array.from(new Set(filteredItems.map(item => item.language)));
  const uniqueResponsible = Array.from(new Set(filteredItems.map(item => item.responsible)));
  const uniqueSubject = Array.from(new Set(filteredItems.map(item => item.subject)));

  const filteredAndTabFilteredItems = filterItems(
    (items || []).filter(item => {
      const matchSearch = item.title?.toLowerCase().includes(search.toLowerCase())?? false;
      const matchTypology = selectedTypologies.length === 0 || selectedTypologies.includes(item.typology);
      const matchYear = selectedYears.length === 0 || selectedYears.includes(item.year);
      const matchLanguage = selectedLanguages.length === 0 || selectedLanguages.includes(item.language);
      const matchResponsible = selectedResponsible.length === 0 || selectedResponsible.includes(item.responsible);
      const matchSubject = selectedSubject.length === 0 || selectedSubject.includes(item.subject);
      return matchSearch && matchTypology && matchYear && matchLanguage && matchResponsible && matchSubject;
    })
  );

  return (
    <ScrollView>
      <View style={styles.page}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)} style={styles.iconButton}>
              <Ionicons name="menu" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>ACERVO - BIBLIOTECA</Text>
          
          <TouchableOpacity onPress={() => router.push('/librarie/librarie')} style={styles.addButton}>
            <Ionicons name="add" size={24} color="#0C1D40"  /> <Text style={styles.addButtonText}>Adicionar novo item</Text>
          </TouchableOpacity>
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
        </View>
        {/* Barra de busca */}
        <View style={styles.searchView}>
          <MySearch
            style = {styles.searchContainer}
            styleInput={styles.search}
            busca={search}
            placeholder="Digite aqui a sua busca..."
            onChangeText={setSearch}
            onPress={searchItems}
          />
        </View>
        {/* Filtros + Lista lado a lado */}
        <View style={styles.contentContainer}>
          {showFilters && (
            <ScrollView style={styles.filterSidebar}>
              <Text style={styles.filterSectionTitle}>Tipo de Obra</Text>
              {[...new Set(filteredAndTabFilteredItems.map(item => item.typology))].map((type) => (
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
              {[...new Set(filteredAndTabFilteredItems.map(item => item.year))].map((year) => (
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
              {[...new Set(filteredAndTabFilteredItems.map(item => item.responsible))].map((responsible) => (
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
              {[...new Set(filteredAndTabFilteredItems.map(item => item.language))].map((lang) => (
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
              {[...new Set(filteredAndTabFilteredItems.map(item => item.subject))].map((subject) => (
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
              data={dataToShow}
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
    backgroundColor: '#7139BF',
    padding: 10,
    borderRadius: 30,
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#7139BF',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff', 
    fontSize: 20, 
    fontWeight: 'bold',
    fontFamily: 'Poppins_400Regular',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
  },
  addButtonText: { 
    color: '#0C1D40',
    fontSize: 16, 
    fontWeight: 'bold',
    fontFamily: 'Poppins_400Regular',
  },
  tabsbar: {
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
  tabItem: { // Estilo para cada aba
      paddingVertical: 10,
      marginRight: 25,
      justifyContent: 'center',
      alignItems: 'center',
  },
  activeTabItem: { // Estilo quando a aba está ativa
  },
  underline: {
    marginTop: 4,
    height: 2,
    width: '100%',
    backgroundColor: '#5A2D82',
  },
  tabText: { // Estilo do texto normal
      color: '#0C1D40',
      fontSize: 20,
      fontFamily: 'Poppins_400Regular',
      justifyContent: 'center',
  },
  activeTabText: { // Estilo do texto quando a aba está ativa
      fontWeight: 'bold',
      color: '#5A2D82',
  },
  searchView: {
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center',
  marginTop: 20,
  },
  searchContainer: {
    width:'95%',
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor:'transparent',
  },
  search: {
    paddingHorizontal: 10,
    borderColor:"#0C1D40",
    borderWidth: 2,
    width: '100%',
    height: 500,
    paddingLeft: 40, // para dar espaço pro ícone
    paddingRight: 10,
    fontSize: 18,
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
  
  
  
});
