import { useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { useRouter, Link } from 'expo-router';
import { MyModal } from '../../src/components/MyModal';
import MyView from '../../src/components/MyView';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView, } from 'react-native';
import { getItems, iItem, setItem } from '../../src/controllers/librarie';
import { Ionicons } from '@expo/vector-icons';
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
        {menuOpen && <MyMenu closeMenu={() => setMenuOpen(false)} />}
        <View style={styles.topbarPill}>
          <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)} style={styles.iconButton}>
            <Ionicons name="menu" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.textTitle}>
            BIBLIOTECA
          </Text>
          <View style={styles.rightIcons}>
            <Link href="/perfil" asChild>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="person" size={25} color="#fff" />
                <Text style={styles.buttonText}>
                  Úsuario
                </Text>
              </TouchableOpacity>
            </Link>
            <Link href="librarie/pageEmployee" asChild>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="person" size={25} color="#fff" />
                <Text style={styles.buttonText}>
                  Funcionário
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
        <View style={styles.item2}>
          {item ? (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>Nome: {item.title}</Text>
              <Text style={styles.itemText}>Descrição: {item.publisher}</Text>
              <Text style={styles.itemText}>Assunto: {item.subject}</Text>
              <Text style={styles.itemText}>Autor: {item.responsible}</Text>
              <Text style={styles.itemText}>Ano: {item.year}</Text>
              <Text style={styles.itemText}>Edição: {item.edition}</Text>

              <MyModal
                visible={visible}
                setVisible={setVisible}
                style={styles.button_capsule}
                title="Empréstimo"
                closeButtonTitle="Fechar"
              >
                fdfgdfgdfgdf
              </MyModal>
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
    width: "80%",
    height: 400,
    alignItems:"center",
    textAlign:"left",
    justifyContent: "flex-end",

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
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topbarPill: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#f1f1f1',
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#9C27B0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center',
    margin: 15,
    zIndex: 5,
  },

})