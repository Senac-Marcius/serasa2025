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
import LoansTabledetail from './loanstabledetail';
import StarComponent from './starComponent';
import { getLoggedUserId, iUser } from '../../src/controllers/users';

export default function CollectionDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [items, setItems] = useState<iItem[]>([]);
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [relatedItems, setRelatedItems] = useState<iItem[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<any[]>([]);
  const [userDetails, setUserDetails] = useState<iUser | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [showAvaliacoes, setShowAvaliacoes] = useState(false);

  useEffect(() => {
    if (userId) {
      async function getUserData() {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .single();

        if (error) {
          console.error("Erro ao buscar os detalhes do usuário:", error);
          return;
        }

        setUserDetails(data);
      }

      getUserData();
    }
  }, [userId]);

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
      if (book.subject) {
        const tags = book.subject.split(',').map((tag: string) => tag.trim().toLowerCase())
        tags.forEach((tag: string) => {
          tagCount[tag] = (tagCount[tag] || 0) + 1;
        });
      }
    });


    const commonTags = Object.entries(tagCount)
      .filter(([tag, count]) => count > 1)
      .map(([tag]) => tag);

    return commonTags;
  }

  async function fetchRelatedItems(item: iItem) {
    if (!item.subject) return;

    const tagsArray = item.subject.split(',').map(tag => tag.trim().toLowerCase());

    const query = tagsArray.map(tag => `subject.ilike.%${tag}%`).join(',');

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
      fetchAvaliacoes(item.id);
    }
  }, [item]);
  async function fetchAvaliacoes(bookId: number) {
    const { data, error } = await supabase
      .from('collections') // Tabela correta
      .select('star, commentary, userId') // Apenas as colunas necessárias
      .eq('bookId', bookId); // Filtro para pegar avaliações específicas para esse BookId

    if (error) {
      console.error("Erro ao buscar avaliações:", error);
      return;
    }

    if (data) {
      setAvaliacoes(data); // Atualiza o estado com as avaliações recebidas
    }
  }
  const [userNames, setUserNames] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users').select('id, name');
      if (error) {
        console.error('Erro ao buscar usuários:', error);
      } else {
        const nameMap: { [key: string]: string } = {};
        data.forEach(user => {
          nameMap[user.id] = user.name;
        });
        setUserNames(nameMap);
      }
    };

    fetchUsers();
  }, []);

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
              <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                <Ionicons name="arrow-back-outline" size={20} color="#750097" />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.textTitle}>
                BIBLIOTECA
              </Text>
            </View>
            <View style={styles.rightIcons}>
              <TouchableOpacity style={styles.button_capsule} onPress={() => router.push({ pathname: 'librarie/loansTableUsers' })}>
                <MaterialCommunityIcons name="book-open-variant" size={20} color="#750097" />
                <Text style={styles.buttonText}>Meus empréstimos</Text>
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
                {item.subject && (
                  <View style={styles.tagsContainer}>
                    {item.subject.split(',').map((tag, index) => (
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
                    closeButtonTitle="X"
                  >
                    <LoansTabledetail BookId={item.id} />
                  </MyModal>
                  <TouchableOpacity onPress={() => setShowAvaliacoes(!showAvaliacoes)} style={{ marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: "flex-end", gap:20 }}>
                      <StarComponent rating={item.star} />
                      <Text style={{ marginLeft: 10, color: 'blue', }}>
                        {showAvaliacoes ? 'Ocultar avaliações' : 'Ver avaliações'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  {showAvaliacoes && (
                    avaliacoes.length > 0 ? (
                      <View style={{ marginTop: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 25, marginLeft: 10 }}>Avaliações:</Text>
                        {avaliacoes.map((avaliacoes, index) => (
                          <View key={index} style={styles.commentaryArea}>
                            <Text style={{ fontSize: 17, color: 'gray', fontWeight: 'bold' }}>
                              {userNames[avaliacoes.userId] || 'Anônimo'}
                            </Text>
                            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                              <StarComponent rating={avaliacoes.star} />
                            </View>
                            <Text>Comentário: {avaliacoes.commentary}</Text>
                          </View>
                        ))}
                      </View>
                    ) : (
                      <Text style={{ fontStyle: 'italic', color: 'gray' }}>Nenhuma avaliação ainda.</Text>
                    )
                  )}

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
             scrollEnabled={false}
             data={relatedItems.slice(0, 4)}
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
                    {relatedItem.subject?.split(',').map((tag, index) => (
                      <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{tag.trim()}</Text>
                      </View>
                    ))}
                    <StarComponent
                      rating={relatedItem.star} />
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
    marginTop: 20,
    paddingTop:50,
    width: "80%",
    height: "auto",
    flexDirection: "row",
    alignItems: "flex-start",
    textAlign: "left",
    justifyContent: "flex-start",
    gap: 40,
    overflow: "hidden",
    borderRadius: 20,

  },
  commentaryArea: {
    width: 800,
    borderRadius: 20,
    padding: 20,
    backgroundColor: "white",
    gap: 5,

  },
  commentaryText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins_400Regular',
  },
  itemText: {
    color: 'black',
    fontSize: 16,
    marginBottom: 5,
  },
  containerText: {
    width: "70%"
  },
  button_capsule: {
    backgroundColor: "#EDE7F6",
    width: 180,
    padding: 10,
    borderRadius: 20,
    justifyContent:"center",
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
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20

  },
  modal: {
    width: 700,
    height: 450,
  },

  buttonsContainer: {
    flexDirection: 'row',
    gap: 50,
    justifyContent: "space-around"

  },
  buttonText: {
    color: '#750097',
    fontSize: 13,
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
    width: 110,
    padding: 10,
    borderRadius: 20,
    justifyContent:"center",
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
    width: 280,
    height: 550,
    alignItems: "center",
    justifyContent: "flex-start",

  },

})