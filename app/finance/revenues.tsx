import React, { useEffect, useState } from 'react';
import { View, StyleSheet, } from 'react-native';
import Mydownload from '../../src/components/MyDownload';
import MyView from '../../src/components/MyView';
import MyList from '../../src/components/MyList';
import MyButton from '../../src/components/MyButtons';
import {Myinput, MyTextArea } from '../../src/components/MyInputs';
import {MyTb} from '../../src/components/MyItem';
import Mytext from '../../src/components/MyText';
import {MyModal_mobilefullscreen} from '../../src/components/MyModal';
import {iRevenue,setRevenue, deleteRevenue, updateRevenue, getRevenues} from '../../src/controllers/revenues'

import MySelect from '../../src/components/MySelect';
import MySearch from '../../src/components/MySearch';

export default function RevenueScreen() {
  
  
  // Estado para o formulário
  const [req, setReq] = useState({
    id: -1,
    description: '',
    name: '',
    url: '',
    created_at: new Date().toISOString(),
    user_id: 1,
    value: '',
    scholarship_status: '02- Inativo',
    discount_percentage: '',
    

  });
const [searchTerm, setSearchTerm] = useState('');
const [visible, setVisible] = useState(false);
const [revenues, setRevenues] = useState<iRevenue[]>([]);

useEffect(()=>{
  async function getTodos(){
    const retorno = await getRevenues({})

    if(retorno.status && retorno.data && retorno.data?.length > 0){
      setRevenues(retorno.data);
    }
  }
  getTodos();
},[])
 

  
  

  // Função para cadastrar ou editar uma receita
  async function handleRegister() {

    if (req.id == -1) {
      // Cadastra uma nova receita
      const newId = revenues.length ? revenues[revenues.length - 1].id + 1 : 0;
      const newRevenue = { ...req, id: newId };
      setRevenues([...revenues, newRevenue]);
      await setRevenue(newRevenue)
      
      
      
      } else {
        // Edita uma receita existente
        setRevenues(revenues.map(r => (r.id == req.id)? req : r) );
        const result = await updateRevenue(req);

        if (result.error) {
          console.error("Erro ao atualizar:", result.error.message);
          alert(`Erro ao atualizar: ${result.error.message}`);
          return;
      }
      // Atualiza o estado local com os dados retornados do Supabase
      setRevenues(revenues.map(r => r.id === req.id ? result.data : r));
    
      }
      

    // Reseta o formulário
    setReq({
      id: -1,
      description: '',
      name: '',
      url: '',
      created_at: new Date().toISOString(),
      user_id: 1,
      value: '',
      scholarship_status: '02- Inativo',
      discount_percentage: '',
    });
    setVisible(false);
  }

  // Função para editar uma receita
  function editRevenue(id: number) {
    const revenue = revenues.find(r => r.id == id);
    if (revenue) 
      setReq(revenue); // Carrega os dados da receita no formulário
      setVisible(true);
  }

  // Função para excluir uma receita
  async function delRevenue(id: number) {
    try {
        
        // Chama a função do controller
        const result = await deleteRevenue(id);
        
        
        // Atualiza o estado local se a exclusão no Supabase foi bem-sucedida
        setRevenues(revenues.filter(r => r.id !== id));
        
    } catch (error) {
        console.error("Erro inesperado:", error);
      
    }
}
// logica do compo
const getFilteredRevenues = () => {
  if (!searchTerm) return revenues; // Retorna tudo se não houver busca
  
  const term = searchTerm.toLowerCase();
  
  return revenues.filter(item => {
    // Converte o desconto para string e trata o símbolo %
    const discountStr = item.discount_percentage?.toString() || '';
    const discountPercent = discountStr ? `${discountStr}%` : '';
    
    return (
      item.name?.toLowerCase().includes(term) ||
      item.description?.toLowerCase().includes(term) ||
      item.value?.toString().includes(searchTerm) || // Mantém sem lowercase para números
      item.id?.toString().includes(searchTerm) ||
      item.url?.toLowerCase().includes(term) ||
      item.scholarship_status?.toLowerCase().includes(term) ||
      discountStr.includes(searchTerm) || // Busca o número cru (25)
      discountPercent.includes(searchTerm) // Busca o formato com % (25%)
    );
  });
};
   
  
  return (

    <MyView style={{ flex: 1, backgroundColor: '#f0f2f5' }} >
      <Mytext style={styles.title}>
         Receitas Escolares
      </Mytext>

      <MySearch
       style={styles.searchInput}
       onChangeText={setSearchTerm}
        onPress={()=> {setSearchTerm(searchTerm)}}
        busca={searchTerm}
    />

  <MyModal_mobilefullscreen
    visible={visible} 
    setVisible={setVisible}>
  
        <View style={styles.form}>
            {/* Campo de Nome */}
            <Myinput
              value={req.name}
              onChangeText={(text) => setReq({ ...req, name: text })}
              iconName='badge'
              placeholder='Digite o nome'
              label='Nome'
            />

            {/* Campo de Status da Bolsa */}
            <MySelect 
              label={ req.scholarship_status } 
              caption= "Status da Bolsa"
              setLabel={(text) => setReq({ ...req, scholarship_status: text })}
              list={[
                {key: 0, option: 'Ativo'},
                {key: 1, option: 'Inativo'},
              ]}
            />

            {/* Campo de Descrição */}
            <MyTextArea
              value={req.description}
              onChangeText={(text) => setReq({ ...req, description: text })}
              iconName='description'
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
            
            {/* Campo de Desconto */}
            <Myinput
              value={req.discount_percentage}
              onChangeText={(text) => setReq({ ...req, discount_percentage: text })}
              iconName='percent'
              placeholder='Porcentagem de desconto'
              label='Desconto'
            />

            {/* Campo de Valor */}
            <Myinput
              value={req.value}
              onChangeText={(text) => setReq({ ...req, value: text })}
              iconName='payments'
              placeholder='Digite o valor'
              label='Valor'
            />

            <MyButton style={{justifyContent:'center'}} onPress={() => handleRegister ()} title="cadastrar"  />
        </View>
        </MyModal_mobilefullscreen>

        {/* Lista de Receitas */}
        <MyList
          style={styles.table}
          data={getFilteredRevenues()}  // Dados já filtrados
          keyItem={(item) => item.id.toString()}
          renderItem={({ item }) => (
            
           /* Componente de listagem */
            <MyTb
           
              onEdit={() => { editRevenue(item.id) }} 
              onDel= {() => { delRevenue(item.id) }}
              
              button={(
                <Mydownload  url={item.url} />
              )}

            >
              <Mytext style={styles.td}>{item.name}</Mytext>
              <Mytext style={styles.td}>{item.scholarship_status}</Mytext>
              <Mytext style={styles.td}>{item.created_at}</Mytext>
              <Mytext style={styles.td}>{item.description}</Mytext>    
              <Mytext style={styles.td}>{item.user_id}</Mytext>
              <Mytext style={styles.td}>{item.discount_percentage}%</Mytext>
              <Mytext style={styles.td}>R${item.value}</Mytext> 
              
            </MyTb>
          )}
          header={(
            <View style={styles.tableRowHeader}>
              <Mytext style={styles.th}>Nome</Mytext>
              <Mytext style={styles.th}>Status da Bolsa</Mytext>
              <Mytext style={styles.th}>Data do documento</Mytext>
              <Mytext style={styles.th}>Descrição</Mytext>
              <Mytext style={styles.th}>Id de usuario</Mytext>
              <Mytext style={styles.th}>Valor de desconto</Mytext>
              <Mytext style={styles.th}>Valor</Mytext>
              <Mytext style={styles.th}>Ações</Mytext>
              
            </View>

          )}
        />

    </MyView>
  );
};

const styles = StyleSheet.create({
  row:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  title:{               
    marginBottom: 8,
    fontSize: 40,
    fontWeight: "bold", 
    textAlign: "center",
    backgroundColor: "#666666 ",
    borderRadius: 5,
    color:'#1A1A1A',
    letterSpacing: 1.5,
    textTransform: "uppercase",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    fontStyle: "italic",
  },

  searchInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    paddingRight: 5,
    borderWidth: 5,
    borderColor: '#F5F5F5',
    fontSize: 14,
  },

  table: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 8,
  },
  
  form: {
    flex: 1,
    marginRight: 10,
    padding: 20,
    backgroundColor: '#0000',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 3,
  },

  tableRowHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },

  th: {
    flex: 1,
    fontWeight: '900',
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
  },

  td: {
    flex: 1,
    fontSize: 13,
    color: '#444',
    textAlign: 'center',
  },


  
});