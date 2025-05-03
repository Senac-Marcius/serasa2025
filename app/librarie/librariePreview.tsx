import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { getItems, iItem, setItem, deleteItemById, updateItemById, } from '../../src/controllers/librarie';
import MyMenu from '../../src/components/MyMenu';
import MyNotify from '../../src/components/MyNotify';
import MyTabsbar from '../../src/components/MyTabsBar';
import { MyCheck } from '../../src/components/MyInputs';
import MySearch from '../../src/components/MySearch';
import { MyModal } from '../../src/components/MyModal';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CollectionViewScreen() {

  const router = useRouter();
  const [items, setItems] = useState<iItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  //const [filteredItems, setFilteredItems] = useState<iItem[]>([]); 
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTypologies, setSelectedTypologies] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedResponsible, setSelectedResponsible] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<iItem | null>(null); 
  
  type ItemType = iItem;

  // Puxa os itens do BD
  useEffect(() =>{
    (async () => {
        const retorno =await getItems({});
        
        if (retorno.status && retorno.data && retorno.data.length>0){
            console.log(retorno.data);
            const t:any[] = []
            retorno.data.map(p => t.push(p))
            setItems(t)
            console.log(items)
        } else {
            console.log('Erro ao carregar itens:', retorno.error);
        }

        setLoading(false);
    })();
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

  const handleItemPress = (item : ItemType) => {
    setSelectedItem(item); // Armazena o item selecionado
    setVisible(true); // Abre o modal
  };

  const renderItem = ({ item }: { item: ItemType }) => (
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
          <Text style={styles.link}>Ver mais...</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const editItem = (item: ItemType) => {
    setVisible(false);
    router.push({ pathname: '/librarie/librarie', params: { id: item.id.toString() } });
  };

  const deleteItem = async (id: number) => {
    const confirmed = window.confirm("Tem certeza que deseja excluir este item permanentemente?");
      
    if (confirmed) {
      try {
        // 1. Deleta o item
        await deleteItemById(id);
        
        // 2. Fecha o modal
        setVisible(false);
        
        // 3. Atualiza a lista (3 opções):
        
        // Opção 1: Recarrega todos os itens do banco
        const retorno = await getItems({});
        if (retorno.data) setItems(retorno.data);
      } catch (error) {
        console.error("Erro ao deletar item:", error);
        window.alert("Erro ao excluir o item");
      }
    }
  };

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
        
        {/* Abas Selecionavéis | Botão add*/}
        <View style={styles.tabsbar}>
          <MyTabsbar
            items={tabs}
            style={styles.tabsContainer}
            itemStyle={styles.tabItem}
            activeItemStyle={styles.activeTabItem}
            textStyle={styles.tabText}
            activeTextStyle={styles.activeTabText}
            onPress={handleTabPress}
            underline={true}
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

              <View style={styles.filterSection}>
                {/* Tipo de Obra */}
                <Text style={styles.filterSectionTitle}>Tipo de Obra</Text>
                  {[...new Set(finalFilteredItems.map(item => item.typology))].map((type) => (
                    <View key={type} style={styles.filterItem}>
                        <MyCheck
                          label={type}
                          checked={selectedTypologies.includes(type)}
                          onToggle={() => toggleFilter(type, selectedTypologies, setSelectedTypologies)}
                        />
                      </View>
                  ))}
                {/* Ano */}
                <Text style={styles.filterSectionTitle}>Ano</Text>
                  {[...new Set(finalFilteredItems.map(item => item.year))].map((year) => (
                    <View key={year} style={styles.filterItem}>
                      <MyCheck
                        label={year.toString()}
                        checked={selectedYears.includes(year)}
                        onToggle={() => toggleFilter(year, selectedYears, setSelectedYears)}
                      />
                    </View>
                  ))}
                {/* Autores */}
                <Text style={styles.filterSectionTitle}>Autores</Text>
                  {[...new Set(finalFilteredItems.map(item => item.responsible))].map((responsible) => (
                    <View key={responsible} style={styles.filterItem}>
                      <MyCheck
                        label={responsible}
                        checked={selectedResponsible.includes(responsible)}
                        onToggle={() => toggleFilter(responsible, selectedResponsible, setSelectedResponsible)}
                      />
                    </View>
                  ))}
                {/* Idioma */}
                <Text style={styles.filterSectionTitle}>Idioma</Text>
                  {[...new Set(finalFilteredItems.map(item => item.language))].map((lang) => (
                    <View key={lang} style={styles.filterItem}>
                      <MyCheck
                        label={lang}
                        checked={selectedLanguages.includes(lang)}
                        onToggle={() => toggleFilter(lang, selectedLanguages, setSelectedLanguages)}
                      />
                    </View>
                  ))}
                {/* Assuntos */}
                <Text style={styles.filterSectionTitle}>Assuntos</Text>
                  {[...new Set(finalFilteredItems.map(item => item.subject))].map((subject) => (
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
              keyExtractor={(item: iItem) => item.id.toString()}
              contentContainerStyle={styles.grid}
              numColumns={3}
              renderItem={renderItem}
            />       
                <MyModal
                  visible={visible}
                  setVisible={setVisible}
                  style={styles.Modal}
                  title=""
                  closeButtonTitle="Fechar"
                  isButton={false}
                >
                  <ScrollView>
                    <View style={styles.modalContainer}>
                      {selectedItem && (
                        <>
                          <View style={styles.buttonModalContainer}>
                            <TouchableOpacity style={styles.edit} onPress={() => editItem (selectedItem) }><Text style={styles.buttonModalText}>EDITAR</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.dell} onPress={() => { deleteItem(selectedItem.id) }}><Text style={styles.buttonModalText}>DELETAR</Text></TouchableOpacity>
                          </View>
                          <View style={styles.modalList}>
                            <Image source={{ uri: selectedItem.image }} style={styles.image} />
                            <Text style={styles.detail}>Tipologia: {selectedItem.typology}</Text>
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
                            <Text style={styles.detail}>Disponível em: {selectedItem.file || selectedItem.url }</Text>
                            <Text style={styles.detail}>Tipo de Empréstimo: {selectedItem.type_loan}</Text>
                          </View>
                        </>
                      )}
                    </View>    
                  </ScrollView>
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
    maxWidth: 180,
    padding: 10,
    margin: 22,
    backgroundColor: '#af87ca',
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
  filterHeader: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 10,
    fontFamily: 'Poppins_400Regular',
  },
  selectedFiltersText: {
    fontSize: 14,
    color: '#0C1D40',
    marginBottom: 15,
    fontFamily: 'Poppins_400Regular',
  },
  filterSection: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#0C1D40',
    paddingBottom: 10,
  },
  filterItem: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainContent: {
    flex: 1,
    padding: 10,
    margin: 5,
    backgroundColor:"transparent",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
    maxWidth: 340,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 16,
    textAlignVertical:'top',
  },
  subtitle: {
    fontStyle: 'italic',
    fontSize: 14,
  },
  detail: {
    fontSize: 14,
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
    width: 530,
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
    width: 465,
    height: 530,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 5, 
  },  
  modalList: {
    backgroundColor: '#f2f2f2',
    width: '50%',
    height: '100%',
    gap: 5,
    alignItems: 'flex-start',
    
  },
  buttonModalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    paddingHorizontal: 10,
    marginBottom: 15
  },
  edit: {
    backgroundColor: '#d0f1e1',
    borderColor: '#00bf63',
    borderWidth: 2,
    padding: 8,
    borderRadius: 25,
  },
  dell: {
      backgroundColor: '#ffc1bd',
      borderColor: '#eb4f45',
      borderWidth: 2,
      padding: 8,
      borderRadius: 25,
  },
  buttonModalText: { 
    color: '#0C1D40',
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',  
  },
});
