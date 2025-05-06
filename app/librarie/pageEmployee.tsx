import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { supabase } from '../../src/utils/supabase';
import { getUsers } from '../../src/controllers/users';
import MyView from '../../src/components/MyView';
import MyMenu from '../../src/components/MyMenu';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, Link } from 'expo-router';


export default function pageEmployee() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);



  return (
    <View style={styles.View}>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          {menuOpen && <MyMenu closeMenu={() => setMenuOpen(false)} />}
          <View style={styles.topbar}>
            <View style={styles.leftGroup}>
              <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)} style={styles.iconButton}>
                <Ionicons name="menu" size={20} color="#4A148C" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                <Ionicons name="arrow-back-outline" size={20} color="#750097" />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.textTitle}>
                Funcionários - Últimos itens cadastrados / Últimos empréstimos
              </Text>
            </View>
            <View style={styles.rightIcons}>
              <TouchableOpacity style={styles.button_round} onPress={() => router.push({ pathname: 'librarie' })}>
                <MaterialCommunityIcons name="book-open-page-variant" size={20} color="#750097" />
                <Text style={styles.buttonText}>Catálogo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.avatarButton}>
                <Image source={{ uri: 'https://i.pravatar.cc/150?img=1' }} style={styles.avatar} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.ViewIcons}>
          <View style={styles.ViewIcon}>
            <View style={styles.ViewLibrariePreview}>
              <TouchableOpacity onPress={() => router.push({ pathname: 'librarie/librariePreview' })}>
                <MaterialCommunityIcons name="book-plus-multiple-outline" size={150} color="#750097" />
                <Text style={styles.Text}>
                  Últimos itens cadastrados
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.ViewIcon}>
            <View style={styles.ViewLibrariePreview}>
              <TouchableOpacity onPress={() => router.push({ pathname: 'librarie/loansTableEmployees' })}>
                <MaterialCommunityIcons name="book-open-page-variant-outline" size={150} color="#750097" />
                <Text style={styles.Text}>
                  Últimos empréstimos
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  View: {
    backgroundColor: "white",
    margin: 0,
    padding: 0,
    height: "100%",
    flex: 1
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
  iconButton: {
    backgroundColor: '#EDE7F6',
    padding: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: "#EDE7F6",
    width: 100,
    padding: 10,
    borderRadius: 20,
    flexDirection: "row"
  },
  button_capsule: {
    backgroundColor: "#EDE7F6",
    width: 100,
    padding: 10,
    borderRadius: 20,
    flexDirection: "row"
  },
  buttonText: {
    color: '#750097',
    fontSize: 13,
    fontWeight: 'bold',
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
  ViewIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ViewIcons: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "row",
    marginTop:60,
    gap: 40,
    height:"100%"
  },
  Text: {
    fontFamily: 'Poppins_400Regular',
    color: '#750097',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textTitle: {
    fontFamily: 'Poppins_400Regular',
    fontWeight: 700,
    color: '#750097',
    fontSize: 30,
    marginBottom: 5,
    justifyContent: "center",

  },
})
