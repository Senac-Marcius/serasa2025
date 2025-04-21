import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import {insertDocument, iDoc, updateDocument, deleteDocument, getListDocuments} from '../../src/controllers/documents'
import MyButton from '../../src/components/MyButtons';
import MyView from '../../src/components/MyView';
import  Mytext  from '../../src/components/MyText';
import { Myinput } from '../../src/components/MyInputs';
import { StyleSheet } from 'react-native';
import MyDocument from '../../src/components/MyDocument';
//import MyUpload from '../src/components/MyUpload';


export default function DocumentsScreen() {

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


  
  
  
  return (
      
    <MyView >

      <MyDocument type='teste' user_id={5}></MyDocument>
      
      {/*<View style={styles.viewStyle}>
        
        <View style={styles.viewCabeçalho}>
          <Mytext style={styles.titulo}>Solicitação de Documentos</Mytext>
          <MyButton style={styles.botaoListar} title="Listar Documentos" color={'#813AB1'} onPress={()=> router.push('secretaria/documentsFilter')} button_type="rect" />
        </View>
        
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
        
      </View>*/}
      
            

      
      
    </MyView>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 6,
  },
  viewCabeçalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // distribui título e botão nos extremos
  },
  botaoListar: {
    marginLeft: 'auto', // empurra o botão para a direita
  },
  titulo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#813AB1',
    padding: 20,
  },
});

