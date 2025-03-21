import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import Mydownload from '../src/components/mydownload'

export default function RevenueScreen() {
  // Estado para o formulário
  const [req, setReq] = useState({
    id: -1,
    description: '',
    name: '',
    url: '',
    createAt: new Date().toISOString(),
    userId: 0,
    value: '',
    scholarshipStatus: '',
    discountPercentage: '',
  });

  // Estado para a lista de receitas
  const [revenues, setRevenues] = useState<{
    id: number;
    description: string;
    name: string;
    url: string;
    createAt: string;
    userId: number;
    value: string;
    scholarshipStatus: string;
    discountPercentage: string;
  }[]>([]);

  // Função para cadastrar ou editar uma receita
  function handleRegister() {
    if (req.id == -1) {
      // Cadastra uma nova receita
      const newId = revenues.length ? revenues[revenues.length - 1].id + 1 : 0;
      const newRevenue = { ...req, id: newId };
      setRevenues([...revenues, newRevenue]);
    } else {
      // Edita uma receita existente
      setRevenues(revenues.map(r => (r.id == req.id ? req : r)));
    }

    // Reseta o formulário
    setReq({
      id: -1,
      description: '',
      name: '',
      url: '',
      createAt: new Date().toISOString(),
      userId: 0,
      value: '',
      scholarshipStatus: '',
      discountPercentage: '',
    });
  }

  // Função para editar uma receita
  function editRevenue(id: number) {
    const revenue = revenues.find(r => r.id == id);
    if (revenue) setReq(revenue); // Carrega os dados da receita no formulário
  }

  // Função para excluir uma receita
  function delRevenue(id: number) {
    const list = revenues.filter(r => r.id != id);
    setRevenues(list); // Remove a receita da lista
  }

  return (
    
    <View style={styles.container}>
      <Mydownload style={styles.row}>
          <text>hh</text>
      </Mydownload>


       <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333', textAlign: 'center' }}>
       cadastre as receitas
  </Text>
      

      {/* Formulário */}
      <View style={styles.row}>
        <View style={styles.form}>
          <TextInput
            placeholder="Digite aqui a Descrição"
            value={req.description}
            onChangeText={(text) => setReq({ ...req, description: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Digite aqui o Name"
            value={req.name}
            onChangeText={(text) => setReq({ ...req, name: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Digite aqui a URL"
            value={req.url}
            onChangeText={(text) => setReq({ ...req, url: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Digite aqui o Valor"
            value={req.value}
            onChangeText={(text) => setReq({ ...req, value: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Digite aqui o status da Bolsa"
            value={req.scholarshipStatus}
            onChangeText={(text) => setReq({ ...req, scholarshipStatus: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Digite aqui o desconto"
            value={req.discountPercentage}
            onChangeText={(text) => setReq({ ...req, discountPercentage: text })}
            style={styles.input}
          />

          <Button title="Cadastrar" onPress={handleRegister} />

          
        </View>

        {/* Lista de Receitas */}
        <FlatList
          data={revenues}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.revenueStyle}>
              <Text style={styles.revenueText}>Descrição: {item.description}</Text>
              <Text style={styles.revenueText}>Nome: {item.name}</Text>
              <Text style={styles.revenueText}>URL: {item.url}</Text>
              <Text style={styles.revenueText}>Data: {item.createAt}</Text>
              <Text style={styles.revenueText}>ID do Usuário: {item.userId}</Text>
              <Text style={styles.revenueText}>Valor: {item.value}</Text>
              <Text style={styles.revenueText}>Status da Bolsa: {item.scholarshipStatus}</Text>
              <Text style={styles.revenueText}>Desconto: {item.discountPercentage}%</Text>

              {/* Botões de Editar e Excluir */}
              <View style={styles.buttonsContanier}>

                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => editRevenue(item.id)}
                ><Text style={styles.buttonText}>EDIT</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => delRevenue(item.id)}
                ><Text style={styles.buttonText}>DELETE</Text>
                </TouchableOpacity>

              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5', // Fundo da tela
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  form: {
    flex: 1,
    marginRight: 10,
    padding: 20,
    backgroundColor: '#fff', // Fundo branco
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 3, // Sombra no Android
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9', // Fundo do input
  },
  revenueStyle: {
    flex: 1,
    marginRight: 10,
    padding: 15,
    backgroundColor: '#fff', // Fundo branco
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 3, // Sombra no Android
    marginBottom: 10, // Espaçamento entre os itens
  },
  revenueText: {
    fontSize: 14,
    color: '#000000', // Texto preto
    marginBottom: 5, // Espaçamento entre os textos
  },
  buttonsContanier: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    justifyContent: 'space-around',
  },
  editButton: {
    backgroundColor: '#FFFF00', // Cor de fundo AMARELO
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: '#f44336', // Cor de fundo vermelho
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000000', // Texto preto
    fontWeight: 'bold',
  },
});