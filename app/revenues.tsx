import React, { useEffect, useState } from 'react';
import { View, StyleSheet, } from 'react-native';
import Mydownload from '../src/components/MyDownload';
import MyView from '../src/components/MyView';
import MyList from '../src/components/MyList';
import MyButton from '../src/components/MyButtons';
import { Myinput, MyTextArea } from '../src/components/MyInputs';
import {MyItem} from '../src/components/MyItem';
import Mytext from '../src/components/MyText';

import {iRevenue,setRevenue, deleteRevenue, updateRevenue, getRevenues} from '../src/controllers/revenues'

import MySelect from '../src/components/MySelect';

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
    scholarship_status: '',
    discount_percentage: '',
    

  });

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
 
  // aqui estamos carregando os alunos
  
  

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
      scholarship_status: '',
      discount_percentage: '',
    });
  }

  // Função para editar uma receita
  function editRevenue(id: number) {
    const revenue = revenues.find(r => r.id == id);
    if (revenue) setReq(revenue); // Carrega os dados da receita no formulário
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

   const [unity, setUnit] = useState()  
  
  return (

    <MyView >
      <Mytext style={styles.title}>
         cadastre as receitas
      </Mytext>

      {/* Formulário */}
      <View style={styles.row}>

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
              label={ 'Status da Bolsa'} 
            
              setLabel={(text) => setReq({ ...req, scholarship_status: text })}
              list={[
                {key: 0, option: 'ativo'},
                {key: 1, option: 'inativo'},
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

           

            

            
             

            
            

            
            <View style={styles.row}>
              <MyButton button_type='rect' title="cadastrar" onPress={handleRegister}  />
             
            </View>
        </View>

        {/* Lista de Receitas */}
        <MyList

          data={revenues}
          keyItem={(item) => item.id.toString()}
          renderItem={({ item }) => (
            
           
            <MyItem
           
              onEdit={() => { editRevenue(item.id) }} 
              onDel= {() => { delRevenue(item.id) }}

            >
              <Mytext style={styles.revenueText}>Nome: {item.name}</Mytext>
              <Mytext style={styles.revenueText}>Status da Bolsa: {item.scholarship_status}</Mytext>
              <Mytext style={styles.revenueText}>Data: {item.created_at}</Mytext>
              <Mytext style={styles.revenueText}>Descrição: {item.description}</Mytext>    
                     
              <Mytext style={styles.revenueText}>ID do Usuário: {item.user_id}</Mytext>
              
              
              
              <Mytext style={styles.revenueText}>Desconto: {item.discount_percentage}%</Mytext>
             
              <Mytext style={styles.revenueText}>Valor R$: {item.value}</Mytext> 
              
              <Mydownload style={styles.revenueTexts} url={item.url} />

            
      
              
            </MyItem>
          )}
        />

      </View>
    </MyView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  buttons: {
     alignItems:"center",
     justifyContent:"center",
     flexDirection: 'row',
     gap: 10,
     marginTop: 10,
     width: '100%',
     
  }
  ,
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
  revenueStyle: {
    flex: 1,
    marginRight: 10,
    padding: 15,
    backgroundColor: '#D3D3D3',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 10,
    
  },
  revenueText: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 5,
    
  },
  title:{               
    marginBottom: 8,
    fontSize: 40,
    fontWeight: "bold", 
    textAlign: "center",
    backgroundColor: "#ab66f9",
    borderRadius: 5,
    color:'#ffffff',
    letterSpacing: 1.5,
    textTransform: "uppercase",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    fontStyle: "italic",
 },
 revenueTexts: {
  fontSize: 14,
  color: '#000000',
  marginBottom: 8,
  marginLeft:541,
}
 
});