import { useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { useRouter, Link } from 'expo-router';
import { MyModal } from '../../src/components/MyModal';
import MyView from '../../src/components/MyView';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Image, ScrollView, } from 'react-native';
import { getItems, iItem, setItem } from '../../src/controllers/librarie';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import TabelaUsuarios from './loantable'
import MyMenu from '../../src/components/MyMenu';
import { setCollection, iCollection, deleteCollectionById, updateCollectionById, getCollections } from '../../src/controllers/collections';

export default function CollectionDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [items, setItems] = useState<iItem[]>([]);
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <ScrollView>
      <View style={styles.View}>
        <View style={styles.container}>
          <View style={styles.topbar}>
            <View style={styles.leftGroup}>
              <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)} style={styles.iconButton}>
                <Ionicons name="menu" size={20} color="#4A148C" />
              </TouchableOpacity>
              <View style={styles.searchWrapper}>
                <Ionicons name="search" size={16} color="#888" style={styles.searchIcon} />
                <TextInput
                  placeholder="Pesquisar..."
                  placeholderTextColor="#888"
                  style={styles.searchInput}
                />
              </View>
            </View>

            <View style={styles.rightIcons2}>
              <TouchableOpacity style={styles.iconButton}>
                <MaterialCommunityIcons name="lightning-bolt-outline" size={20} color="#4A148C" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconButton}>
                <MaterialCommunityIcons name="cog-outline" size={20} color="#4A148C" />
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
              <View style={styles.containerText} >
                <Text style={styles.itemText}>Nome: {item.title}</Text>
                <Text style={styles.itemText}>Descrição: {item.summary}</Text>
                <Text style={styles.itemText}>Assunto: {item.subject}</Text>
                <Text style={styles.itemText}>Autor: {item.responsible}</Text>
                <Text style={styles.itemText}>Ano: {item.year}</Text>
                <Text style={styles.itemText}>Edição: {item.edition}</Text>
              </View>
              <View style={styles.containerModal}>
                <MyModal
                  visible={visible}
                  setVisible={setVisible}
                  style={styles.modal}
                  title="Empréstimo"
                  closeButtonTitle="Fechar"
                >
                  <TabelaUsuarios
                 data={[]} 
                 onEdit={(id) => console.log("Editar", id)}
                 onDelete={(id) => console.log("Deletar", id)}
                  />
                </MyModal>
              </View>
            </View>
          ) : (
            <Text style={styles.itemText}>Carregando item...</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  View: {
    backgroundColor: "#fff7f7",
    margin: 0,
    padding: 0,
    zIndex: 2,
    height: "100%"
  },
  textTitle: {
    color: 'white',
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
    backgroundColor: 'white',
    borderColor: 'purple',
    borderStyle: 'solid',
    borderWidth: 5,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 50,
    width: "60%",
    height: 400,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "left",
    justifyContent: "flex-start",
    gap: 40,

  },
  containerText: {
    maxWidth: "60%"
  },
  itemText: {
    color: 'black',
    fontSize: 16,
    marginBottom: 5,
  },
  button_capsule: {
    borderRadius: 50,
    height: 45,
    width: 250,
    margin: 30,
    backgroundColor: "#813AB1",
    alignItems: "center",
    justifyContent: "center",
  },
  iconButton: {
    backgroundColor: '#6A1B9A',
    padding: 10,
    borderRadius: 30,
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerModal: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  modal:{
    width:700,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 50,
    justifyContent: "space-around"

  },
  buttonText: {
    color: '#fff',
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
    backgroundColor: '#fff',
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
  rightIcons2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  searchInput: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    minWidth: 160,
  },
  searchIcon: {
    marginTop: 1,
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
    backgroundColor: "#813AB1",
    width: 100,
    padding: 10,
    borderRadius: 20,
  },

})