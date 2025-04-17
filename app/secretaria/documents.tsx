import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import {insertDocument, iDoc, updateDocument, deleteDocument} from '../../src/controllers/documents'
import { supabase } from '../../src/utils/supabase';
import MyButton from '../../src/components/MyButtons';
import MyView from '../../src/components/MyView';
import  Mytext  from '../../src/components/MyText';
import { Myinput } from '../../src/components/MyInputs';
import MyList from '../../src/components/MyList';
import { MyItem } from '../../src/components/MyItem';
//import MyUpload from '../src/components/MyUpload';


export default function RecordScreen() {

  // Estados individuais para os s
   const [req,setReq] = useState({
      name: '',
      url: '',
      type: '',
      user_id: 1,
      id: -1,
      created_at: new Date().toISOString(),
  
  });

  //documents, setdocuments
  const [documents, setDocuments] = useState<iDoc[]>([]);

  const router = useRouter();

  //buscar documentos no banco e atualizar de acordo com a ação
  useEffect(() =>{
    async function getAll() {
      const{ data:all, error } = await supabase.from('documents').select()
      if(all){
        setDocuments(all)
      }
      if (error){
        console.error('Erro ao buscar documentos: ', error.message);
      }   
    }

    getAll()
  },[]);


  // Função para adicionar um novo registro
  async function handleRegister() {
  
    //se for um item editado, ele deve chamar o registro existente
    if (req.id == -1) {
      const newid = documents.length? documents[documents.length - 1].id + 1 : 0;
      const newDoc = {...req, id: newid}

      setDocuments([...documents, newDoc]);
      await insertDocument(newDoc)

    } else{ //senão, ele deve criar um novo registro
      await updateDocument(req)//aqui vc vai chamada sua função de editar do controlador
      setDocuments(documents.map((d) => (d.id == req.id)? req: d));

    }  

    // Resetando os campos após editar, cadastrar, etc..
    setReq({
      name: '',
      url: '',
      type: '',
      user_id: 1,
      id: -1,
      created_at: new Date().toISOString(),
    })
  };


  // Função para excluir um registro
  async function deleteRecord (id: number){
    const del = await deleteDocument(id)//aqui voce vai chamda sua função de deletar do controlador

    if(del){
      setDocuments(documents.filter((d) => d.id != id));
    }      
  };

  const editRecord = (id: number) => {
      const doc = documents.find( (d) => d.id == id);
      if (doc){//vai colocar as informações salvas no vetor de volta no  para editar
          setReq(doc)
      }
  };
  
  
  return (
      
    <MyView >
      
      <View>
        <Mytext >Solicitação de Documentos</Mytext>
        
        <Myinput
            iconName="person" 
            label='Nome'
            value={req.name} 
            onChangeText={(text) => {setReq({...req, name: text})}}
        />

        <Myinput 
            iconName="link" 
            label='Url'
            value={req.url} 
            onChangeText={(text) => {setReq({...req, url: text})}}
        />

        <Myinput 
            iconName="description" 
            label='Tipo do Documento'
            value={req.type} 
            onChangeText={(text) => {setReq({...req, type: text})}}
        />
        
        <MyButton title={req.id != -1 ? "Atualizar":"Cadastrar"} color={'#813AB1'} onPress={handleRegister} button_type="rect" />
      </View>
      
            

      <View>
        <Mytext >Registros Cadastrados</Mytext>
        <MyList
          data={documents}
          keyItem={(item) => item.id.toString()}//tratamento
          renderItem={({ item }) => (
            <MyItem
              onDel={()=> deleteRecord(item.id)}
              onEdit={()=> editRecord(item.id)}
            >                                 


              <Mytext>Nome: {item.name}</Mytext>
              <Mytext >Url: {item.url}</Mytext>
              <Mytext >Tipo Documento: {item.type}</Mytext>     

            </MyItem>
          )}
        />
      </View>
      
    </MyView>
  );
}
