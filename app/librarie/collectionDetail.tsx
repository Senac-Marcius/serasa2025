import { useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { MyModal } from '../../src/components/MyModal';
import MyView from '../../src/components/MyView';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import {getItems, iItem, setItem} from '../../src/controllers/librarie';
import { setCollection, iCollection, deleteCollectionById, updateCollectionById, getCollections } from '../../src/controllers/collections';

export default function CollectionDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
  
    const [items, setItems] = useState<iItem[]>([]);
    const [visible, setVisible] = useState(false);
  
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
      <MyView style={styles.View}>
        <ScrollView>
          <View style={styles.item2}>
            {item ? (
              <View style={styles.itemContainer}>
                <Text style={styles.itemText}>Nome: {item.title}</Text>
                <Text style={styles.itemText}>Quantidade: {item.subtitle}</Text>
                <Text style={styles.itemText}>Estrelas: {item.summary}</Text>
  
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
        </ScrollView>
      </MyView>
    );
  }
    
const styles = StyleSheet.create({
    View: {
        backgroundColor: "#fff7f7",
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
        margin:30,
    },
  
    itemContainer: {
        padding: 15,
        marginBottom: 5,
        backgroundColor: 'white',
        borderColor: 'purple',
        borderStyle:'solid',
        borderWidth:5,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 50,
        width:"80%",
        height:400,
        alignItems: "center",
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

})