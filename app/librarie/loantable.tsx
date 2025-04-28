import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Usuario } from './type';
import { iLoans } from '../../src/controllers/loans';

interface Props{
    usuarios:Usuario[];
}


const TabelaUsuarios: React.FC<Props> = ({ data, onEdit, onDelete }) => {
    return (
      <ScrollView horizontal>
      <View style={styles.table}>
        {/* Cabeçalho */}
        <View style={[styles.row, styles.header]}>
          <Text style={styles.headerText}>Titulo</Text>
          <Text style={styles.headerText}>Autor</Text>
          <Text style={styles.headerText}>Leitor</Text>
          <Text style={styles.headerText}>Data de Emprestimo</Text>
          <Text style={styles.headerText}>Data de Devolução</Text>
          <Text style={styles.headerText}>Status</Text>
          <Text style={styles.headerText}>Ação</Text>
        </View>
       {/* Dados */}
       {usuarios.map((usuario) => (
          <View key={usuario.id} style={styles.row}>
            <Text style={styles.cell}>{usuario.id}</Text>
            <Text style={styles.cell}>{usuario.Titulo}</Text>
            <Text style={styles.cell}>{usuario.Autor}</Text>
            <Text style={styles.cell}>{usuario.Leitor}</Text>
            <Text style={styles.cell}>{usuario.DataEmprestimo}</Text>
            <Text style={styles.cell}>{usuario.DataDevolucao}</Text>
            <Text style={styles.cell}>{usuario.Status}</Text>
            <Text style={styles.cell}>{usuario.Ação}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
    );
  };


const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: '#d8b4fe',
    borderRadius: 6,
    overflow: 'hidden',
    marginVertical: 10,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#f3e8ff', // roxo claro
    borderBottomWidth: 1,
    borderColor: '#e9d5ff',
  },
  header: {
    backgroundColor: '#7c3aed', // roxo escuro
  },
  headerText: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
  },
  cell: {
    flex: 1,
    padding: 10,
    color: '#4c1d95', // roxo médio
  },
});

export default TabelaUsuarios;
