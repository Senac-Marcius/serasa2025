import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import Mydownload from '../src/components/mydownload';
import MyView from '../src/components/MyView';
import MyList from '../src/components/mylist';
import MyButton from '../src/components/Mybuttons';
import { Myinput, MyCheck, MyTextArea } from '../src/components/Myinputs';
import MyTopbar from '../src/components/mytopbar';
import Myiten from '../src/components/myItenlist';
import Mytext from '../src/components/Mytext';



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
    

    
    <MyView>
     


       <Mytext style={{ fontSize: 24, fontWeight: 'bold', color: '#333', textAlign: 'center' }}>
       cadastre as receitas
       </Mytext>
       

      {/* Formulário */}
      
      <View style={styles.row}>
        <View style={styles.form}>
        <View style={styles.form}>
  {/* Campo de Nome */}
  <Myinput
    value={req.name}
    onChangeText={(text) => setReq({ ...req, name: text })}
    iconName=''
    placeholder='Digite o nome'
    label='Nome'
  />
  
  
  
  {/* Campo de Descrição */}
  <MyTextArea 
    value={req.description} 
    onChangeText={(text) => setReq({...req, description: text})}  
    iconName='' 
    placeholder='Digite a descrição'
    label='Descrição'
  />

  

  {/* Campo de URL */}
  <Myinput
  value={req.url}
  onChangeText={(text) => setReq({ ...req, url: text })}
  iconName='link'
  placeholder='Digite a URL'
  label='URL'
 
/>

  {/* Campo de Valor */}
  <Myinput
    value={req.value}
    onChangeText={(text) => setReq({ ...req, value: text })}
    iconName=''
    placeholder='Digite o valor'
    label='Valor'
    
  />

  {/* Campo de Status da Bolsa */}
  <Myinput
    value={req.scholarshipStatus}
    onChangeText={(text) => setReq({ ...req, scholarshipStatus: text })}
    iconName=''
    placeholder='Status da bolsa'
    label='Status Bolsa'
  />

  {/* Campo de Desconto */}
  <Myinput
    value={req.discountPercentage}
    onChangeText={(text) => setReq({ ...req, discountPercentage: text })}
    iconName='percent'
    placeholder='Porcentagem de desconto'
    label='Desconto'
    
  />

  <Button title="Cadastrar" onPress={handleRegister} />
</View>

          
        </View>

        {/* Lista de Receitas */}
        <MyList        /* Lista componente*/
          data={revenues}
          keyItem={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Myiten 
              style={styles.revenueStyle}
              onEdit={()=> {editRevenue(item.id)}}
              onDel={()=> {delRevenue(item.id)}}
            >
               <Mytext style={styles.revenueText}>Descrição: {item.description}</Mytext>
                <Mytext style={styles.revenueText}>Nome: {item.name}</Mytext>
               <Mytext style={styles.revenueText}>ID do Usuário: {item.userId}</Mytext>
               <Mytext style={styles.revenueText}>Valor: {item.value}</Mytext>
               <Mytext style={styles.revenueText}>Status da Bolsa: {item.scholarshipStatus}</Mytext>
               <Mytext style={styles.revenueText}>Desconto: {item.discountPercentage}%</Mytext>
               <Mytext style={styles.revenueText}>Data: {item.createAt}</Mytext>
               <Mydownload style={styles.revenueText} url={item.url}/>

            </Myiten>
          )}
        />
      </View>
    </MyView>
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
    
  },
  deleteButton: {
    backgroundColor: '#f44336', // Cor de fundo vermelho
    padding: 10,
  
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000000', // Texto preto
    fontWeight: 'bold',
  },

  downloadButton:{
    backgroundColor: '#A020F0', 
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  }
});