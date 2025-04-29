import { useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { useRouter, Link } from 'expo-router';
import { MyModal } from '../../src/components/MyModal';
import MyView from '../../src/components/MyView';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Image, ScrollView, } from 'react-native';
import { getItems, iItem, setItem } from '../../src/controllers/librarie';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import TabelaUsuarios from './loantable';
import { supabase } from '../../src/utils/supabase';
import MyMenu from '../../src/components/MyMenu';
import { StarCalculation } from './starsCalculation';
import { setCollection, iCollection, deleteCollectionById, updateCollectionById, getCollections } from '../../src/controllers/collections';

export default function CollectionDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [items, setItems] = useState<iItem[]>([]);
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [relatedItems, setRelatedItems] = useState<iItem[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [recentBooks, setRecentBooks] = useState<any[]>([]);

  useEffect(() => {
    async function getTodos() {
      const retorno = await getItems({});

      if (retorno.status && retorno.data && retorno.data.length > 0) {
        setItems(retorno.data);
      }
    }

    getTodos();
  }, []);

  const item = items.find((item) => item.id.toString() === id);

  function getCommonTags(books: any[]) {
    const tagCount: Record<string, number> = {};

    books.forEach(book => {
      if (book.keywords) {
        const tags = book.keywords.split(',').map((tag: string) => tag.trim().toLowerCase())
        tags.forEach((tag: string) => {
          tagCount[tag] = (tagCount[tag] || 0) + 1;
        });
      }
    });

    // Vamos pegar as tags que aparecem em mais de 1 livro
    const commonTags = Object.entries(tagCount)
      .filter(([tag, count]) => count > 1)
      .map(([tag]) => tag);

    return commonTags;
  }

  async function filterBooksByRecentTags() {
    const commonTags = getCommonTags(recentBooks);

    if (commonTags.length === 0) return;

    const { data, error } = await supabase
      .from('items_librarie')
      .select('*')
      .or(
        commonTags.map(tag => `keywords.ilike.%${tag}%`).join(',')
      );

    if (error) {
      console.error("Erro ao filtrar livros:", error);
      return;
    }

    if (data) {
      setItems(data);
    }
  }
  async function fetchRelatedItems(item: iItem) {
    if (!item.keywords) return;

    const tagsArray = item.keywords.split(',').map(tag => tag.trim().toLowerCase());

    const query = tagsArray.map(tag => `keywords.ilike.%${tag}%`).join(',');

    const { data, error } = await supabase
      .from('items_librarie')
      .select('*')
      .or(query);

    if (error) {
      console.error("Erro ao buscar livros relacionados:", error);
      return;
    }

    if (data) {
      setRelatedItems(data.filter(book => book.id !== item.id)); // não mostra o próprio livro
    }
  }

  useEffect(() => {
    if (item) {
      fetchRelatedItems(item);
    }
  }, [item]);


  return (
    <ScrollView>
      <View style={styles.View}>
        <View style={styles.container}>
          {menuOpen && <MyMenu closeMenu={() => setMenuOpen(false)} />}
          <View style={styles.topbar}>
            <View style={styles.leftGroup}>
              <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)} style={styles.iconButton}>
                <Ionicons name="menu" size={20} color="#750097" />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>router.back()} style={styles.iconButton}>
                <Ionicons name="arrow-back-outline" size={20} color="#750097" />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.textTitle}>
                BIBLIOTECA
              </Text>
            </View>
            <View style={styles.rightIcons}>
              <TouchableOpacity style={styles.button_capsule} onPress={() => router.push({ pathname: '../app/perfil' })}>
                <MaterialCommunityIcons name="account" size={20} color="#750097" />
                <Text style={styles.buttonText}>Perfil</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button_round} onPress={() => router.push({ pathname: 'librarie/collectionsPreview' })}>
                <MaterialCommunityIcons name="book-open-page-variant" size={20} color="#750097" />
                <Text style={styles.buttonText}>Catálogo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.avatarButton}>
                <Image source={{ uri: 'https://i.pravatar.cc/150?img=1' }} style={styles.avatar} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.item2}>
          {item ? (
            <View style={styles.itemContainer}>
              <View style={styles.styleimg}><Image source={{ uri: item.image }} style={styles.image}></Image></View>
              <View style={styles.containerText}>
                <Text style={styles.itemTitlename}>{item.title}</Text>
                <Text style={styles.itemText}>{item.summary}</Text>
                <Text style={styles.itemText}>{item.subject}</Text>
                <Text style={styles.itemText}>{item.responsible}</Text>
                <Text style={styles.itemText}>{item.year}</Text>
                <Text style={styles.itemText}>{item.edition}</Text>
                {item.keywords && (
                  <View style={styles.tagsContainer}>
                    {item.keywords.split(',').map((tag, index) => (
                      <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{tag.trim()}</Text>
                      </View>
                    ))}
                  </View>
                )}
                <View style={styles.containerModal}>
                  <MyModal
                    visible={visible}
                    setVisible={setVisible}
                    style={styles.modal}
                    title="Empréstimo"
                    closeButtonTitle="Fechar"
                  >
                   <StarCalculation/>
                  </MyModal>
                </View>
              </View>
            </View>
          ) : (
            <Text style={styles.itemText}>Carregando item...</Text>
          )}
        </View>
        {relatedItems.length > 0 && (
          <View style={styles.viewFlatList}>
            <Text style={styles.textTitleFlatList}>Itens com tags relacionadas:</Text>
            <FlatList
              data={relatedItems}
              numColumns={4}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item: relatedItem }) => (
                <TouchableOpacity
                  style={styles.itemContainer2}
                  onPress={() => router.push({ pathname: 'librarie/collectionDetail', params: { id: relatedItem.id.toString() } })}
                >
                  <View style={styles.styleimg}>
                    <Image source={{ uri: relatedItem.image }} style={styles.image} />
                  </View>
                  <Text style={styles.itemTitlename}>{relatedItem.title}</Text>
                  <Text style={styles.itemText}>{relatedItem.responsible}</Text>
                  <View style={styles.tagsContainer}>
                    {relatedItem.keywords?.split(',').map((tag, index) => (
                      <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{tag.trim()}</Text>
                      </View>
                    ))}
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  View: {
    backgroundColor: "white",
    margin: 0,
    padding: 0,
    zIndex: 2,
    height: "100%"
  },
  textTitle: {
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 600,
    color: '#750097',
    fontSize: 30,
    marginBottom: 5,
    justifyContent: "center",

},
  viewFlatList: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  textTitleFlatList: {
    color: '#750097',
    fontWeight: 600,
    fontSize: 30,
    marginBottom: 5,
    justifyContent: "center",
  },
  item2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 30,
  },

  itemContainer: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: '#ecdef0',
    marginLeft: 50,
    marginRight: 50,
    marginTop: 50,
    width: "80%",
    height: 400,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "left",
    justifyContent: "flex-start",
    gap: 40,
    overflow: "hidden",
    borderRadius:20,

  },
  itemText: {
    color: 'black',
    fontSize: 16,
    marginBottom: 5,
  },
  containerText:{
    backgroundColor:""
  },
  button_capsule: {
    backgroundColor: "#EDE7F6",
    width: 100,
    padding: 10,
    borderRadius: 20,
    flexDirection: "row"
  },
  iconButton: {
    backgroundColor: '#EDE7F6',
    padding: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerModal: {
    display:"flex",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20

  },
  modal: {
    width: 700,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 50,
    justifyContent: "space-around"

  },
  buttonText: {
    color: '#750097',
    fontSize: 16,
    fontWeight: 'bold',
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
  container: {
    backgroundColor: "white",
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
    gap: 20,
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
  button_round: {
    backgroundColor: "#EDE7F6",
    width: 120,
    padding: 10,
    borderRadius: 20,
    flexDirection: "row"
  },
  ViewLibrariePreview: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: '#ecdef0',
    width: 450,
    height: 400,
    borderRadius: 20,

  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 5,
  },

  tag: {
    backgroundColor: '#E0BBE4', 
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  tagText: {
    fontSize: 12,
    color: '#4A148C', 
    fontWeight: 'bold',
  },
  itemTitlename: {
    color: 'grey',
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    justifyContent: "center",
  },
  itemContainer2: {
    padding: 25,
    margin: 5,
    backgroundColor: '#ecdef0',
    marginLeft: 50,
    marginRight: 50,
    marginTop: 50,
    width: 300,
    height: 480,
    alignItems: "center",
    justifyContent: "flex-start",

  },

})